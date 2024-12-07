"use client";

import { useEffect, useState } from "react";
import { fetchCryptoNewsRanking } from "@/services/crypto";
import NewsCardLayout from "../CardLayout/NewsCardLayout";
import labels from "@/lib/labels/labels.json";
import Text from "../Text/Text";

const { title } = labels.cryptoNewsRanking;

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
            {title}
          </Text>
          <NewsCardLayout data={news} />
        </>
      )}
    </div>
  );
};

export default CryptoNewsRanking;
