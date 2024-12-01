"use client";

import React, { useEffect, useState } from "react";
import { fetchCryptoNewsRanking } from "@/services/crypto";
import NewsCardLayout from "../CardLayout/NewsCardLayout";
import Text from "../Text/Text";

const CryptoNewsRanking = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCryptoNewsRanking()
      .then((data) => {
        setNews(data.data);
      })
      .catch((error) => {
        console.error("🚀 ~ useEffect ~ error", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  return (
    <div className="mt-16 relative isolate">
      {!loading && (
        <>
          <Text
            variant={"h3"}
            colorType={"text-title"}
            customClasses={"px-3 mb-8"}
          >
            Noticias de Criptomonedas con mejor ranking
          </Text>
          <NewsCardLayout data={news} />
        </>
      )}
    </div>
  );
};

export default CryptoNewsRanking;
