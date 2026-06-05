export type BranchId = "engineer" | "analyst" | "leader" | "researcher";

export type ScoreKey =
  | "engineering"
  | "analytics"
  | "leadership"
  | "research"
  | "risk"
  | "safety"
  | "empathy"
  | "systemThinking"
  | "communication"
  | "innovation"
  | "control"
  | "teamwork";

export type GameScores = Record<ScoreKey, number>;

export type TextSide = "left" | "center" | "right";

export type NovelLine = {
  speaker?: string;
  text: string;
  side?: TextSide;
};

export type NovelChoice = {
  id: string;
  text: string;
  nextFrameId?: string;
  branch?: BranchId;
  endingId?: string;
  scores: Partial<GameScores>;
  qualities: string[];
  professions: string[];
  aiSignal: string;
  aiContext: string;
};

export type NovelFrame = {
  id: string;
  chapter: "prologue" | BranchId | "ending";
  stage: number;
  title?: string;
  location?: string;
  backgroundImage: string;
  nextFrameId?: string;
  overlay?: "normal" | "danger" | "calm" | "final";
  glitch?: boolean;
  showVi?: boolean;
  lines: NovelLine[];
  choices?: NovelChoice[];
};

export type Ending = {
  id: string;
  title: string;
  role: string;
  profile: string;
  description: string;
  professions: string[];
  backgroundImage: string;
};

export type DecisionRecord = {
  sceneId: string;
  frameId: string;
  choiceId: string;
  choiceText: string;
  narrativeContext: string;
  speakerContext: string;
  branch: "prologue" | BranchId | "ending";
  scores: Partial<GameScores>;
  qualities: string[];
  professions: string[];
  aiSignal: string;
  timestamp: string;
};

export type GameView = "novel" | "result" | "history";

export type GameState = {
  view: GameView;
  currentFrameId: string;
  lineIndex: number;
  selectedBranch: BranchId | null;
  scores: GameScores;
  decisions: DecisionRecord[];
  isComplete: boolean;
  endingId: string | null;
};

export type ArchetypeSummary = {
  primary: string;
  secondary: string;
  distribution: { label: string; value: number; color: string }[];
  strengths: string[];
  professions: string[];
  explanation: string;
};
