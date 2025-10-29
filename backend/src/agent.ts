import OpenAI from "openai";
import fs from "fs";
import {
  buildDocsSystemPrompt,
  buildSystemPrompt,
  buildUserPrompt,
} from "./prompt";
import type { DietaPlanRequest } from "./types";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY as string,
  timeout: 2 * 60 * 1000,
  logLevel: "debug",
});

export async function* generateDietPlan(input: DietaPlanRequest) {
  const diretrizes = fs.readFileSync("knowledge/diretrizes.md", "utf-8");

  const stream = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: buildSystemPrompt() },
      { role: "system", content: buildDocsSystemPrompt(diretrizes) },
      { role: "user", content: buildUserPrompt(input) },
    ],
    temperature: 0.6,
    stream: true,
  });

  for await (const chunk of stream) {
    const delta = chunk.choices[0]?.delta?.content;
    if (delta) yield delta;
  }
}
