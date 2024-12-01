import { translateText } from "@/services/translate";
import { cmcFetcher } from "@/utils/fetchers/fetcher";
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

    let advice = "";

    switch (true) {
      case value < 20:
        advice =
          "El mercado está en un estado de pánico. Los inversores están asustados y venden sus activos a precios bajos. Es un buen momento para comprar.";
        break;
      case value >= 20 && value < 40:
        advice =
          "El mercado está en un estado de miedo. Los inversores están nerviosos y venden sus activos a precios bajos. Es un buen momento para comprar.";
        break;
      case value >= 40 && value < 60:
        advice =
          "El mercado está en un estado neutral. Los inversores están indecisos y no saben si comprar o vender.";
        break;
      case value >= 60 && value < 80:
        advice =
          "El mercado está en un estado de codicia. Los inversores están eufóricos y compran activos a precios altos. Es un buen momento para vender.";
        break;
      case value <= 100:
        advice =
          "El mercado está en un estado de euforia. Los inversores están emocionados y compran activos a precios altos. Es un buen momento para vender.";
        break;
      default:
        advice = "No se pudo obtener un consejo para este estado del mercado.";
    }

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
