import { translateText } from "@/services/translate";
import { cmcFetcher } from "@/utils/fetchers/fetcher";
import { sendAiRequest } from "@/utils/openAi/openAi";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const url = "/v3/fear-and-greed/latest";
    const response = await cmcFetcher(url, true);

    const data = await response.json();

    const { value_classification, value } = await data.data;

    const translatedValueClassification = await translateText(
      value_classification
    );

    const prompt = `El índice de miedo y codicia de hoy es ${value}, clasificado como '${translatedValueClassification}'. Da un consejo breve.`;

    const advice = await sendAiRequest(prompt);

    const parsedData = {
      value: value,
      value_classification: translatedValueClassification,
      advice: advice,
    };

    return NextResponse.json({ data: parsedData }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
