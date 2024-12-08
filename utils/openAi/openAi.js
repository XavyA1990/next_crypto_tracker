"use server";

import OpenAI from "openai";
import labels from "@/lib/labels/labels.json";

const { system } = labels.es.ai;

const openai = new OpenAI(process.env.OPENAI_API_KEY);

export const sendAiRequest = async (prompt) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: system,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error(error.message);
    return error;
  }
};
