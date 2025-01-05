const LIBRE_TRANSLATE_URL = "https://libretranslate.com/translate";

export const translateText = async (text) => {
  try {
    const response = await fetch(LIBRE_TRANSLATE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        q: text,
        source: "en",
        target: "es",
        api_key: process.env.LIBRE_TRANSLATE_API_KEY,
      }),
    });

    const data = await response.json();
    return data.translatedText;
  } catch (error) {
    console.error("🚀 ~ translateText ~ error", error);
    return text;
  }
};
