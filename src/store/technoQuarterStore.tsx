"use client";

import { createContext, useContext, useEffect, useMemo, useReducer } from "react";
import type React from "react";
import { emptyScores, technoQuarterEndings, technoQuarterFrames } from "@/data/technoQuarterScenario";
import type { ArchetypeSummary, DecisionRecord, GameScores, GameState, GameView, NovelChoice, NovelFrame, ScoreKey } from "@/types/techno-quarter-game";

const STORAGE_KEY = "neopolis-techno-quarter-attack-code-v2";

type GameAction =
  | { type: "ADVANCE" }
  | { type: "CHOOSE"; choice: NovelChoice }
  | { type: "OPEN_HISTORY" }
  | { type: "OPEN_RESULT" }
  | { type: "BACK_TO_NOVEL" }
  | { type: "RESET" }
  | { type: "RESTORE"; state: GameState };

export const initialGameState: GameState = {
  view: "novel",
  currentFrameId: "prologue-01",
  lineIndex: 0,
  selectedBranch: null,
  scores: emptyScores,
  decisions: [],
  isComplete: false,
  endingId: null
};

function addScores(current: GameScores, delta: Partial<GameScores>) {
  const next = { ...current };
  (Object.keys(delta) as ScoreKey[]).forEach((key) => {
    next[key] = Math.max(0, next[key] + (delta[key] ?? 0));
  });
  return next;
}

function findFrame(frameId: string): NovelFrame {
  return technoQuarterFrames.find((frame) => frame.id === frameId) ?? technoQuarterFrames[0];
}

function nextSequentialFrame(frame: NovelFrame) {
  const index = technoQuarterFrames.findIndex((item) => item.id === frame.id);
  return technoQuarterFrames[index + 1]?.id;
}

function lineContext(frame: NovelFrame) {
  return frame.lines.map((line) => `${line.speaker ? `${line.speaker}: ` : ""}${line.text}`).join("\n");
}

function speakerContext(frame: NovelFrame) {
  return Array.from(new Set(frame.lines.map((line) => line.speaker).filter(Boolean))).join(", ") || "Нарратор";
}

function reducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case "RESTORE":
      return action.state;
    case "OPEN_HISTORY":
      return { ...state, view: "history" };
    case "OPEN_RESULT":
      return { ...state, view: "result" };
    case "BACK_TO_NOVEL":
      return { ...state, view: "novel" };
    case "RESET":
      if (typeof window !== "undefined") window.localStorage.removeItem(STORAGE_KEY);
      return initialGameState;
    case "ADVANCE": {
      const frame = findFrame(state.currentFrameId);
      const isLastLine = state.lineIndex >= frame.lines.length - 1;
      const hasVisibleChoices = Boolean(frame.choices?.length && isLastLine);

      if (!isLastLine) {
        return { ...state, lineIndex: state.lineIndex + 1 };
      }

      if (hasVisibleChoices) return state;

      if (frame.chapter === "ending") {
        return { ...state, view: "result", isComplete: true };
      }

      const nextFrameId = frame.nextFrameId ?? nextSequentialFrame(frame);
      if (!nextFrameId) return state;
      return { ...state, currentFrameId: nextFrameId, lineIndex: 0, view: "novel" };
    }
    case "CHOOSE": {
      const frame = findFrame(state.currentFrameId);
      const choice = action.choice;
      const selectedBranch = choice.branch ?? state.selectedBranch;
      const record: DecisionRecord = {
        sceneId: frame.id,
        frameId: frame.id,
        choiceId: choice.id,
        choiceText: choice.text,
        narrativeContext: choice.aiContext || lineContext(frame),
        speakerContext: speakerContext(frame),
        branch: frame.chapter,
        scores: choice.scores,
        qualities: choice.qualities,
        professions: choice.professions,
        aiSignal: choice.aiSignal,
        timestamp: new Date().toISOString()
      };

      const nextState: GameState = {
        ...state,
        view: "novel",
        selectedBranch,
        scores: addScores(state.scores, choice.scores),
        decisions: [...state.decisions, record],
        endingId: choice.endingId ?? state.endingId,
        lineIndex: 0
      };

      if (choice.nextFrameId) {
        return { ...nextState, currentFrameId: choice.nextFrameId };
      }

      if (choice.endingId) {
        return { ...nextState, view: "result", isComplete: true };
      }

      return nextState;
    }
    default:
      return state;
  }
}

const scoreLabels: Record<ScoreKey, string> = {
  engineering: "инженерия",
  analytics: "аналитика",
  leadership: "лидерство",
  research: "исследование",
  risk: "смелость",
  safety: "безопасность",
  empathy: "эмпатия",
  systemThinking: "системность",
  communication: "коммуникация",
  innovation: "инновации",
  control: "контроль",
  teamwork: "командность"
};

const scoreColors = ["#FF6B6B", "#FF9F43", "#FFD166", "#A78BFA", "#00D1C6", "#7DD3FC"];

function getTopScores(scores: GameScores) {
  return (Object.entries(scores) as [ScoreKey, number][]).sort((a, b) => b[1] - a[1]);
}

function fallbackEnding(state: GameState) {
  if (state.selectedBranch === "engineer") return technoQuarterEndings[3];
  if (state.selectedBranch === "analyst") return technoQuarterEndings.find((ending) => ending.id === "ai-advisor") ?? technoQuarterEndings[0];
  if (state.selectedBranch === "leader") return technoQuarterEndings.find((ending) => ending.id === "council") ?? technoQuarterEndings[0];
  if (state.selectedBranch === "researcher") return technoQuarterEndings.find((ending) => ending.id === "creator") ?? technoQuarterEndings[0];
  return technoQuarterEndings[0];
}

function buildSummary(state: GameState): ArchetypeSummary {
  const ending = technoQuarterEndings.find((item) => item.id === state.endingId) ?? fallbackEnding(state);
  const topScores = getTopScores(state.scores);
  const total = Math.max(1, topScores.reduce((sum, [, value]) => sum + value, 0));
  const secondaryScore = topScores[1] ?? ["systemThinking", 1];
  const decisionProfessions = Array.from(new Set(state.decisions.flatMap((decision) => decision.professions))).slice(0, 8);
  const strengths = Array.from(new Set(state.decisions.flatMap((decision) => decision.qualities))).slice(0, 9);

  return {
    primary: ending.title,
    secondary: scoreLabels[secondaryScore[0]],
    distribution: topScores.slice(0, 6).map(([key, value], index) => ({
      label: scoreLabels[key],
      value: Math.round((value / total) * 100),
      color: scoreColors[index % scoreColors.length]
    })),
    strengths: strengths.length ? strengths : ["системное мышление", "ответственность", "решение задач"],
    professions: Array.from(new Set([...ending.professions, ...decisionProfessions])).slice(0, 10),
    explanation: `По твоему игровому пути система видит гипотезу профиля «${ending.role}». ${ending.description} Это не тестовый вердикт: будущий AI будет читать всю цепочку решений, контекст сцен, риски, способ работы с людьми и отношение к неопределенности.`
  };
}

type StoreValue = {
  state: GameState;
  currentFrame: NovelFrame;
  summary: ArchetypeSummary;
  dispatch: React.Dispatch<GameAction>;
};

const GameContext = createContext<StoreValue | null>(null);

export function TechnoQuarterProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialGameState);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) dispatch({ type: "RESTORE", state: JSON.parse(saved) as GameState });
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const value = useMemo<StoreValue>(
    () => ({
      state,
      currentFrame: findFrame(state.currentFrameId),
      summary: buildSummary(state),
      dispatch
    }),
    [state]
  );

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useTechnoQuarterGame() {
  const value = useContext(GameContext);
  if (!value) throw new Error("useTechnoQuarterGame must be used within TechnoQuarterProvider");
  return value;
}
