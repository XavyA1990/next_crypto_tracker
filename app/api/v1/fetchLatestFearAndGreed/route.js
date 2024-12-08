import { translateText } from "@/services/translate";
import { cmcFetcher } from "@/utils/fetchers/fetcher";
import { sendAiRequest } from "@/utils/openAi/openAi";
import { NextResponse } from "next/server";
import labels from "@/lib/labels/labels.json";

export async function GET(request) {
  const lang = request.nextUrl.searchParams.get("lang");
  const { fearAndGreedIndexPrompt } = labels[lang]["ai"];
  try {
    const url = "/v3/fear-and-greed/latest";
    const response = await cmcFetcher(url, true);

    const data = await response.json();

    const { value_classification, value } = await data.data;

    const translatedValueClassification = await translateText(
      value_classification
    );

    const replacements = {
      "[value]": value,
      "[translatedValueClassification]": lang === "es" ? translatedValueClassification : value_classification,
    };

    const prompt = fearAndGreedIndexPrompt.replace(
      /\[value\]|\[translatedValueClassification\]/g,
      (match) => replacements[match]
    );

    const advice = await sendAiRequest(prompt, lang);

    const parsedData = {
      value: value,
      value_classification: lang === "es" ? translatedValueClassification : value_classification,
      advice: advice,
    };

    return NextResponse.json({ data: parsedData }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
