/* eslint-disable react-hooks/exhaustive-deps */
import { createChart } from "lightweight-charts";
import React, { useEffect, useRef, useState } from "react";
import { fetchHistoricalData } from "@/services/crypto";
import useTheme from "@/hooks/useTheme";

const CandleStickChart = ({ symbol, width = "w-full" }) => {
  const chartContainerRef = useRef(null);
  const chartRef = useRef(null);
  const seriesRef = useRef(null);
  const [candles, setCandles] = useState([]);
  const { theme } = useTheme();

useEffect(() => {
  if (chartRef.current) {
    try {
      chartRef.current.remove();
    } catch (error) {
      console.warn("El gráfico ya fue eliminado:", error);
    }
  }

  chartRef.current = createChart(chartContainerRef.current, {
    width: chartContainerRef.current.clientWidth,
    height: 600,
    layout: {
      background: {
        color: theme === 'dark' ? "rgba(17, 24, 39, 1)" : "rgba(229, 231, 235, 1)",
        type: "solid",
      },
      textColor: theme === 'dark' ? "#d1d5db" : "#6b7280",
    },
    grid: {
      vertLines: {
        color: "rgba(197, 203, 206, 0.5)",
      },
      horzLines: {
        color: "rgba(197, 203, 206, 0.5)",
      },
    },
    crosshair: {
      mode: 1,
    },
    priceScale: {
      borderColor: "rgba(197, 203, 206, 0.8)",
    },
    timeScale: {
      borderColor: "rgba(197, 203, 206, 0.8)",
    },
  });

  seriesRef.current = chartRef.current.addCandlestickSeries({
    upColor: "#22c55e",
    borderUpColor: "#22c55e",
    wickUpColor: "#22c55e",
    downColor: "#ef4444",
    borderDownColor: "#ef4444",
    wickDownColor: "#ef4444",
  });

  if (candles.length > 0) {
    seriesRef.current.setData(candles);
  }

  return () => {
    chartRef.current.remove();
  };
}, [theme]);

useEffect(() => {
  const fetchCandles = async () => {
    const data = await fetchHistoricalData(symbol);
    setCandles(data);
    seriesRef.current.setData(data);
  };

  fetchCandles();

  const url = `wss://stream.binance.com:9443/ws/${
    symbol !== "USDT" ? symbol.toLowerCase() : "btc"
  }usdt@kline_1m`;

  const socket = new WebSocket(url);

  socket.onmessage = (e) => {
    const message = JSON.parse(e.data);
    if (message.e === "kline") {
      const kline = message.k;

      const candle = {
        time: kline.t / 1000,
        open: parseFloat(kline.o),
        high: parseFloat(kline.h),
        low: parseFloat(kline.l),
        close: parseFloat(kline.c),
      };

      setCandles((prev) => {
        const lastCandle = prev[prev.length - 1];
        if (lastCandle && lastCandle.time === candle.time) {
          const updatedCandles = [...prev];
          updatedCandles[updatedCandles.length - 1] = candle;
          return updatedCandles;
        } else {
          return [...prev, candle];
        }
      });

      seriesRef.current.update(candle);
    }
  };

  return () => {
    socket.close();
  };
}, [symbol]);

  useEffect(() => {
    if (seriesRef.current && candles.length > 0) {
      seriesRef.current.setData(candles);
    }
  }, [candles]);

  useEffect(() => {
    const handleResize = () => {
      if (chartRef.current) {
        chartRef.current.applyOptions({
          width: chartContainerRef.current.clientWidth,
          height: chartContainerRef.current.clientHeight || 600,
        });
      }
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <div ref={chartContainerRef} className="w-full mt-6"></div>;
};

export default CandleStickChart;
