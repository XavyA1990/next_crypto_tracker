import { translateText } from "@/services/translate";
import { cryptoNewsFetcher } from "@/utils/fetchers/fetcher";
import { formatDate } from "@/utils/processData/date";
import { NextResponse } from "next/server";

export async function GET(request) {
  const lang = request.nextUrl.searchParams.get("lang");
  const page = request.nextUrl.searchParams.get("page") || 1;
  try {
    const url = `/category?section=general&items=10&page=${page}`;
    const response = await cryptoNewsFetcher(url);
    const result = await response.json();
    let { data } = result;

    if (data && Array.isArray(data)) {
      const translatedData = await Promise.all(
        data.map(async (item) => {
          if (lang === "en" || (lang === "es" && process.env.NODE_ENV === "production")) {
            const formattedDate = formatDate(item.date, "en-US");
            return {
              ...item,
              date: formattedDate,
            };
          }
          const translatedTitle = await translateText(item.title);
          const translatedText = await translateText(item.text);
          const formattedDate = formatDate(item.date);

          return {
            ...item,
            title: translatedTitle,
            text: translatedText,
            date: formattedDate,
          };
        })
      );

      data = translatedData;
    }

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    console.error("🚀 ~ GET ~ error", error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
