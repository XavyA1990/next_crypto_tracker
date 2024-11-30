"use client";

import { fetchFearGreedStats } from "@/services/crypto";
import { useEffect, useState } from "react";
import Container from "../Container/Container";
import Spinner from "../Spinner/Spinner";
import Text from "../Text/Text";
import dynamic from "next/dynamic";

const GaugeChart = dynamic(() => import("../GaugeChart/GaugeChart"), {
  ssr: false,
});

const FearGreedIndicator = () => {
  const [loading, setLoading] = useState(true);
  const [fearGreedStats, setFearGreedStats] = useState(null);

  useEffect(() => {
    fetchFearGreedStats()
      .then((data) => {
        console.log("🚀 ~ .then ~ data:", data);
        setFearGreedStats(data.data);
      })
      .catch((error) => {
        console.error("🚀 ~ useEffect ~ error", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center h-full justify-center absolute left-1/2">
        <Spinner />
      </div>
    );
  }
  return (
    <Container
      colorVariant={"none"}
      customClasses={"flex-col flex mt-4 items-center relative isolate"}
    >
      <div className="flex gap-16 justify-center items-center flex-col md:flex-row">
        <Text variant={"h3"} colorType={"text-title"}>
          Indice de Miedo y Codicia
        </Text>
        <div className="md:w-1/3 flex-col items-center flex justify-center">
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
            sizeVariant={"text-5xl"}
          >
            {fearGreedStats?.value_classification}
          </Text>
        </div>
      </div>
      <Text
        colorType={"normal-text"}
        customClasses={"mt-4 px-4 md:px-0"}
        sizeVariant={"text-xl"}
      >
        "{fearGreedStats?.advice}" <br/> -- Generado con IA
      </Text>
    </Container>
  );
};

export default FearGreedIndicator;
