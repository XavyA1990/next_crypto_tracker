"use client";

import React, { useEffect, useState } from "react";
import { fetchCryptoNewsRanking } from "@/services/crypto";
import NewsCardLayout from "../CardLayout/NewsCardLayout";
import Text from "../Text/Text";

const CryptoNewsRanking = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    fetchCryptoNewsRanking().then((data) => {
      setNews(data.data);
    });
  }, []);
  return (
    <div className="mt-16 relative isolate">
      <Text variant={"h3"} customClasses={"px-3 mb-8"}>
        Noticias de Criptomonedas con mejor ranking
      </Text>
      <NewsCardLayout data={news} />
    </div>
  );
};

export default CryptoNewsRanking;
