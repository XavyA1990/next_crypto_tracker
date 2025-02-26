"use client";

import { fetchFearGreedStats } from "@/services/crypto";
import { useEffect, useState } from "react";
import Container from "../Container/Container";
import Text from "../Text/Text";
import GaugeChart from "../GaugeChart/GaugeChart";
import Labels from "../Labels/Labels";
import { useLabelsStore } from "@/store/globalStore";

const FearGreedIndicator = () => {
  const [loading, setLoading] = useState(true);
  const [fearGreedStats, setFearGreedStats] = useState(null);
  const {currentLanguage} = useLabelsStore();

  useEffect(() => {
    fetchFearGreedStats(currentLanguage)
      .then((data) => {
        setFearGreedStats(data.data);
      })
      .catch((error) => {
        console.error("🚀 ~ useEffect ~ error", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [currentLanguage]);

  return (
    <Container
      colorVariant={"none"}
      customClasses={"flex-col flex mt-4 items-center relative isolate"}
    >
      {!loading && (
        <>
          <div className="flex gap-16 justify-center items-center flex-col px-3">
            <Text
              variant={"h3"}
              colorType={"text-title"}
              sizeVariant={"text-4xl md:text-5xl"}
              customClasses={"px-4 md:px-0"}
            >
              <Labels labelFamily={"fearAndGreedIndex"} label={"title"} />
            </Text>
            <div className=" flex-col items-center flex justify-center">
              <GaugeChart
                id="fear-greed-chart"
                levels={4}
                percent={fearGreedStats ? fearGreedStats.value / 100 : 0}
                arcPadding={0.05}
                cornerRadius={4}
              />
              <Text
                variant={"p"}
                colorType={"text-title"}
                weight="font-bold"
                customClasses={"mt-4 text-center"}
                sizeVariant={"text-4xl md:text-5xl"}
              >
                {fearGreedStats?.value_classification}
              </Text>
            </div>
          </div>
          <Text
            colorType={"text-title"}
            customClasses={"mt-4 px-4 md:px-0"}
            sizeVariant={"text-xl"}
          >
            &quot;{fearGreedStats?.advice}&quot; <br />
            <Text variant={"span"} colorType={"normal-text"}>
              <Labels labelFamily={"commons"} label={"aiGenerated"} />
            </Text>
          </Text>
        </>
      )}
    </Container>
  );
};

export default FearGreedIndicator;
