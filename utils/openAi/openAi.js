"use server";

import OpenAI from "openai";

const openai = new OpenAI(process.env.OPENAI_API_KEY);

export const sendAiRequest = async (prompt) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content:
            "Eres un asistente de inversiones que ayuda a los usuarios a invertir en el mercado de las criptomonedas.",
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
