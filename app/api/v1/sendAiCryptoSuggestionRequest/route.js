import { binanceFetcher } from "@/utils/fetchers/fetcher";
import { processedDataForAi } from "@/utils/processData/crypto";
import { NextResponse } from "next/server";
import labels from "@/lib/labels/labels";
import { sendAiRequest } from "@/utils/openAi/openAi";

const replaceTemplatePlaceholders = (template, replacements) => {
  return template
    .replace(/\[name\]/g, replacements.name)
    .replace(/\[symbol\]/g, replacements.symbol)
    .replace(/\[formatData\]/g, replacements.formatData);
}


export async function POST(req) {
  try {
    const body = await req.json();
    
    const { name, symbol, info, web, lang } = body.data;
    const { cryptoAdvicePrompt } = labels[lang].ai;
    
    const url = `/v3/uiKlines?symbol=${symbol}USDT&interval=1d&limit=14`;

    const response = await binanceFetcher(url);

    const dailyData = await response.json();

    const formatData = processedDataForAi(dailyData);

    const prompt = replaceTemplatePlaceholders(cryptoAdvicePrompt, {
      name,
      symbol,
      formatData: JSON.stringify(formatData, null, 2),
    });

    const aiResponse = await sendAiRequest(prompt, lang);

    return NextResponse.json({ data: aiResponse }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
