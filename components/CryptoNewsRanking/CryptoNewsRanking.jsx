"use client";

import { useEffect, useState } from "react";
import { fetchCryptoNewsRanking } from "@/services/crypto";
import NewsCardLayout from "../CardLayout/NewsCardLayout";
import Text from "../Text/Text";
import Labels from "../Labels/Labels";
import { useLabelsStore } from "@/store/globalStore";

const CryptoNewsRanking = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const {currentLanguage} = useLabelsStore();

  useEffect(() => {
    fetchCryptoNewsRanking(currentLanguage)
      .then((data) => {
        setNews(data.data);
      })
      .catch((error) => {
        console.error("🚀 ~ useEffect ~ error", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [currentLanguage]);
  return (
    <div className="mt-16 relative isolate">
      <Text variant={"h3"} colorType={"text-title"} customClasses={"px-3 mb-8"}>
        <Labels labelFamily={"cryptoNewsRanking"} label={"title"} />
      </Text>
      <NewsCardLayout data={news} />
    </div>
  );
};

export default CryptoNewsRanking;
