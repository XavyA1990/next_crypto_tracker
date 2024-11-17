import axios from "axios";

const LIBRE_TRANSLATE_URL = "http://127.0.0.1:5000/translate";

export const translateText = async (text) => {
    try {
      const response = await axios.post(
        LIBRE_TRANSLATE_URL,
        {
          q: text,
          source: "en",
          target: "es",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      return response.data.translatedText;
    } catch (error) {
      console.error("🚀 ~ translateText ~ error", error);
      return text;
    }
  };