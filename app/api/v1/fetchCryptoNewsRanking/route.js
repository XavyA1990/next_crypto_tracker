import { translateText } from "@/services/translate";
import { cmcFetcher, cryptoNewsFetcher } from "@/utils/fetchers/fetcher";
import { formatDate } from "@/utils/processData/date";
import { NextResponse } from "next/server";

export async function GET(request) {
  const lang = request.nextUrl.searchParams.get("lang");
  try {
    const url = "/v1/cryptocurrency/map?sort=cmc_rank&limit=5";

    const response = await cmcFetcher(url);

    const resData = await response.json();

    const { data: cryptoData } = resData;

    const cryptoRankMap = cryptoData.reduce((acc, crypto) => {
      acc[crypto.symbol] = crypto.rank;
      return acc;
    }, {});

    const symbols = cryptoData.map((crypto) => crypto.symbol);

    const newsUrl = `?tickers=${symbols.join(
      ","
    )}&items=5&page=1&sentiment=positive`;

    const newsResponse = await cryptoNewsFetcher(newsUrl);

    const newsData = await newsResponse.json();

    let { data: news } = newsData;

    if (news && Array.isArray(news)) {
      const translatedData = await Promise.all(
        news.map(async (item) => {
          const bestRank = item.tickers
            .map((ticker) => cryptoRankMap[ticker] || Infinity)
            .reduce((min, rank) => Math.min(min, rank), Infinity);

          if (lang === "en") {
            const formattedDate = formatDate(item.date, "en-US");
            return {
              ...item,
              date: formattedDate,
              bestRank,
            };
          }

          const translatedTitle = await translateText(item.title);
          console.log("🚀 ~ news.map ~ translatedTitle:", translatedTitle)
          const translatedText = await translateText(item.text);
          console.log("🚀 ~ news.map ~ translatedText:", translatedText)
          const formattedDate = formatDate(item.date);


          return {
            ...item,
            title: translatedTitle,
            text: translatedText,
            date: formattedDate,
            bestRank,
          };
        })
      );

      news = translatedData.sort((a, b) => a.bestRank - b.bestRank);
    }
    return NextResponse.json({ data: news }, { status: 200 });
  } catch (error) {
    console.log("🚀 ~ GET ~ error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
