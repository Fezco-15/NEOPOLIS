import { NextResponse } from "next/server";
import { aiCareerSystemPrompt } from "@/data/career-ai-knowledge";
import {
  buildGigachatUserPrompt,
  buildLocalCareerReport,
  normalizeAiReport,
  type CareerAiPayload,
  type CareerAiReport
} from "@/lib/ai/career-analysis";

export const runtime = "nodejs";

const GIGACHAT_OAUTH_URL = "https://ngw.devices.sberbank.ru:9443/api/v2/oauth";
const GIGACHAT_COMPLETIONS_URL = "https://gigachat.devices.sberbank.ru/api/v1/chat/completions";
const GEMINI_BASE_URL = "https://generativelanguage.googleapis.com/v1beta/models";
const GROQ_COMPLETIONS_URL = "https://api.groq.com/openai/v1/chat/completions";

async function getGigachatToken() {
  const authKey = process.env.GIGACHAT_AUTH_KEY;
  if (!authKey) return null;

  const response = await fetch(GIGACHAT_OAUTH_URL, {
    method: "POST",
    headers: {
      Authorization: `Basic ${authKey}`,
      RqUID: crypto.randomUUID(),
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: new URLSearchParams({ scope: process.env.GIGACHAT_SCOPE ?? "GIGACHAT_API_PERS" }),
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error(`GigaChat OAuth failed: ${response.status}`);
  }

  const data = (await response.json()) as { access_token?: string };
  return data.access_token ?? null;
}

async function askGigachat(payload: CareerAiPayload): Promise<CareerAiReport | null> {
  const token = await getGigachatToken();
  if (!token) return null;

  const response = await fetch(GIGACHAT_COMPLETIONS_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: process.env.GIGACHAT_MODEL ?? "GigaChat",
      temperature: 0.25,
      messages: [
        { role: "system", content: aiCareerSystemPrompt },
        { role: "user", content: buildGigachatUserPrompt(payload) }
      ]
    }),
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error(`GigaChat completion failed: ${response.status}`);
  }

  const data = (await response.json()) as {
    choices?: { message?: { content?: string } }[];
  };
  const content = data.choices?.[0]?.message?.content;
  if (!content) return null;

  const json = content.match(/\{[\s\S]*\}/)?.[0] ?? content;
  const parsed = JSON.parse(json) as Omit<CareerAiReport, "provider">;
  return normalizeAiReport({ provider: "gigachat", ...parsed }, payload);
}

async function askGemini(payload: CareerAiPayload): Promise<CareerAiReport | null> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;

  const model = process.env.GEMINI_MODEL ?? "gemini-2.5-flash";
  const response = await fetch(`${GEMINI_BASE_URL}/${model}:generateContent`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": apiKey
    },
    body: JSON.stringify({
      generationConfig: {
        temperature: 0.25,
        responseMimeType: "application/json"
      },
      systemInstruction: {
        parts: [{ text: aiCareerSystemPrompt }]
      },
      contents: [
        {
          role: "user",
          parts: [{ text: buildGigachatUserPrompt(payload) }]
        }
      ]
    }),
    cache: "no-store"
  });

  if (!response.ok) {
    const details = await response.text().catch(() => "");
    throw new Error(`Gemini completion failed: ${response.status} ${details.slice(0, 240)}`);
  }

  const data = (await response.json()) as {
    candidates?: { content?: { parts?: { text?: string }[] } }[];
  };
  const content = data.candidates?.[0]?.content?.parts?.map((part) => part.text ?? "").join("\n");
  if (!content) return null;

  const json = content.match(/\{[\s\S]*\}/)?.[0] ?? content;
  const parsed = JSON.parse(json) as Omit<CareerAiReport, "provider">;
  return normalizeAiReport({ provider: "gemini", ...parsed }, payload);
}

async function askGroq(payload: CareerAiPayload): Promise<CareerAiReport | null> {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) return null;

  const response = await fetch(GROQ_COMPLETIONS_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: process.env.GROQ_MODEL ?? "llama-3.3-70b-versatile",
      temperature: 0.25,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: aiCareerSystemPrompt },
        { role: "user", content: buildGigachatUserPrompt(payload) }
      ]
    }),
    cache: "no-store"
  });

  if (!response.ok) {
    const details = await response.text().catch(() => "");
    throw new Error(`Groq completion failed: ${response.status} ${details.slice(0, 240)}`);
  }

  const data = (await response.json()) as {
    choices?: { message?: { content?: string } }[];
  };
  const content = data.choices?.[0]?.message?.content;
  if (!content) return null;

  const json = content.match(/\{[\s\S]*\}/)?.[0] ?? content;
  const parsed = JSON.parse(json) as Omit<CareerAiReport, "provider">;
  return normalizeAiReport({ provider: "groq", ...parsed }, payload);
}

async function tryProvider(provider: string, payload: CareerAiPayload): Promise<CareerAiReport | null> {
  try {
    if (provider === "gemini") return await askGemini(payload);
    if (provider === "groq") return await askGroq(payload);
    if (provider === "gigachat") return await askGigachat(payload);
    return null;
  } catch (error) {
    console.error(`[AI:${provider}] provider failed`, error);
    return null;
  }
}

function providerChain() {
  const preferred = process.env.AI_PROVIDER ?? "gemini";
  const fallback = (process.env.AI_FALLBACK_PROVIDER ?? "groq")
    .split(",")
    .map((provider) => provider.trim())
    .filter(Boolean);
  return Array.from(new Set([preferred, ...fallback, "local"]));
}

export async function POST(request: Request) {
  const payload = (await request.json()) as CareerAiPayload;

  for (const provider of providerChain()) {
    if (provider === "local") break;
    const report = await tryProvider(provider, payload);
    if (report) return NextResponse.json(report);
  }

  console.error("[AI] external providers unavailable, using local fallback");
  return NextResponse.json(buildLocalCareerReport(payload));
}
