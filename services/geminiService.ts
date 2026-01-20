
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { Message, Role } from "../types.ts";

const MODEL_NAME = 'gemini-3-flash-preview';

export const streamGeminiResponse = async (
  history: Message[],
  onChunk: (text: string) => void
) => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key not found");
  }

  const ai = new GoogleGenAI({ apiKey });
  
  // Format history for Gemini chat
  // Note: Gemini expects 'user' and 'model' roles
  const contents = history.map(msg => ({
    role: msg.role === Role.USER ? 'user' : 'model',
    parts: [{ text: msg.text }]
  }));

  const lastMessage = contents.pop();

  const responseStream = await ai.models.generateContentStream({
    model: MODEL_NAME,
    contents: contents.length > 0 ? [...contents, lastMessage!] : lastMessage!,
    config: {
      systemInstruction: "You are a helpful, concise mobile-first AI assistant. Your responses should be formatted with markdown, using short paragraphs suitable for small screens.",
      temperature: 0.7,
      topK: 40,
      topP: 0.95,
    },
  });

  let fullText = "";
  for await (const chunk of responseStream) {
    const chunkText = chunk.text || "";
    fullText += chunkText;
    onChunk(fullText);
  }

  return fullText;
};
