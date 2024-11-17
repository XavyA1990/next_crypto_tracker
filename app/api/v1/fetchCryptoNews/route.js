import { translateText } from "@/services/translate";
import axios from "axios";
import { NextResponse } from "next/server";

const CRYPTO_NEWS_API_KEY = process.env.CRYPTO_NEWS_API_KEY;

// Definir y exportar la función que maneja el método GET
export async function GET(request) {
  const page = request.nextUrl.searchParams.get("page") || 1;
  try {
    const response = await axios.get(
      `https://cryptonews-api.com/api/v1/category?section=general&items=10&page=${page}&token=${CRYPTO_NEWS_API_KEY}`
    );
    let { data } = response.data;
    
    if (data && Array.isArray(data)) {
      const translatedData = await Promise.all(
        data.map(async (item) => {
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

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };
  return date.toLocaleDateString("es-ES", options);
};