"use client";

import useTheme from "@/hooks/useTheme";
import React from "react";
import Gauge from "react-gauge-chart";

const GaugeChart = ({
  id,
  levels,
  percent,
  cornerRadius,
  arcPadding,
}) => {
    const { theme } = useTheme();

  return (
    <Gauge
      id={id}
      nrOfLevels={levels}
      percent={percent}
      colors={["#ef4444", "#eab308", "#22c55e"]}
      arcPadding={arcPadding}
      cornerRadius={cornerRadius}
      textColor={theme === "dark" ? "#fff" : "#222"}
      needleColor={theme === "dark" ? "#fff" : "#222"}
    />
  );
};

export default GaugeChart;
