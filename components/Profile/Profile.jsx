"use client";

import React, { useEffect, useState } from "react";
import PageTitle from "../PageTitle/PageTitle";
import Text from "../Text/Text";
import CandleStickChart from "../CandleStickChart/CandleStickChart";
import CryptoCard from "../Card/CryptoCard";
import Button from "../Button/Button";
import { ChartBarSquareIcon } from "@heroicons/react/24/outline";
import { ChartBarSquareIcon as ChartBarSquareIconSolid } from "@heroicons/react/20/solid";
import { useAuthStore } from "@/store/globalStore";
import Spinner from "../Spinner/Spinner";
import { fetchAllFavorites } from "@/services/crypto";
import labels from "@/lib/labels/labels.json";

const { favoritesTitle } = labels.profile;

const Profile = () => {
  const user = useAuthStore((state) => state.user);
  const [favorites, setFavorites] = useState([]);
  const [lastCrypto, setLastCrypto] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedCharts, setSelectedCharts] = useState([]);

  useEffect(() => {
    if (user && user.id) {
      fetchAllFavorites(user.id)
        .then((res) => {
          const { data } = res;
          setFavorites(data);
          setLastCrypto(data.length);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [user]);

  const handleShowChart = (symbol) => {
    const alreadySelected = selectedCharts.find(
      (chart) => chart.symbol === symbol
    );
    if (alreadySelected) {
      setSelectedCharts((prev) =>
        prev.filter((chart) => chart.symbol !== symbol)
      );
    } else {
      const displayCharts = favorites.find(
        (favorite) => favorite.symbol === symbol
      );
      if (displayCharts) {
        setSelectedCharts((prev) => [...prev, displayCharts]);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center h-full justify-center absolute left-1/2 bottom-1/4">
        <Spinner />
      </div>
    );
  }
  return (
    <>
      <PageTitle title={`Bienvenido ${user?.fullName}`} />
      <div className="flex w-full mb-5">
        <Text variant={"h2"} colorType={"normal-text"}>
          {favoritesTitle}
        </Text>
      </div>
      <div className="flex w-full px-3">
        <Text variant={"h3"} colorType={"normal-text"}>
          {user?.email}
        </Text>
      </div>
      {selectedCharts.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
          {selectedCharts.map((chartData, index) => (
            <div
              key={chartData.symbol}
              className={`${
                index === selectedCharts.length - 1 &&
                selectedCharts.length % 2 !== 0
                  ? "col-span-2"
                  : "col-span-1"
              }`}
            >
              <Text variant={"h2"} colorType={"text-title"}>
                {chartData.name} ({chartData.symbol})
              </Text>
              <CandleStickChart symbol={chartData.symbol} />
            </div>
          ))}
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-3 w-full gap-4 mt-8 mb-8 px-3">
        {favorites.map((favorite, index) => {
          const isSelected = selectedCharts.some(
            (chart) => chart.symbol === favorite.symbol
          );
          return (
            <CryptoCard
              key={favorite.id}
              name={favorite.name}
              symbol={favorite.symbol}
              slug={favorite.slug}
              price={favorite.quote.USD.price}
              volume24h={favorite.quote.USD.volume_24h}
              percentChange24h={favorite.quote.USD.percent_change_24h}
              marketCap={favorite.quote.USD.market_cap}
              lastUpdated={favorite.quote.USD.last_updated}
              imageSrc={favorite.image}
              fullWidth={index === lastCrypto - 1 || index === 0}
              customButtons={[
                <Button
                  key={favorite.id}
                  variant={"primary"}
                  onClick={() => handleShowChart(favorite.symbol)}
                >
                  {!isSelected ? (
                    <ChartBarSquareIcon className="h-5 w-5" />
                  ) : (
                    <ChartBarSquareIconSolid className="h-5 w-5" />
                  )}
                </Button>,
              ]}
            />
          );
        })}
      </div>
    </>
  );
};

export default Profile;
