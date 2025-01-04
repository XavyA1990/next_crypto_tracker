const LIBRE_TRANSLATE_URL = "http://127.0.0.1:5000/translate";

export const translateText = async (text) => {
  try {
    const response = await fetch(LIBRE_TRANSLATE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        q: text,
        source: "auto",
        target: "es",
        format: "text",
        api_key: "",
      }),
    });

    const data = await response.json();
    return data.translatedText;
  } catch (error) {
    console.error("🚀 ~ translateText ~ error", error);
    return text;
  }
};
