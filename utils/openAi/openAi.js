"use server";

import OpenAI from "openai";
import labels from "@/lib/labels/labels.json";


const openai = new OpenAI(process.env.OPENAI_API_KEY);

export const sendAiRequest = async (prompt, lang = "es") => {
  const { system } = labels[lang].ai;
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
