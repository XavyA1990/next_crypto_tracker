/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";
import PageTitle from "../PageTitle/PageTitle";
import Text from "../Text/Text";
import CandleStickChart from "../CandleStickChart/CandleStickChart";
import CryptoCard from "../Card/CryptoCard";
import Button from "../Button/Button";
import { useAuthStore, useFavoritesStore } from "@/store/globalStore";
import { fetchAllFavorites } from "@/services/crypto";
import Icons from "../Icons/Icons";
import Labels from "../Labels/Labels";

const Profile = () => {
  const { user } = useAuthStore();
  const { setFavoritesLength, favoritesLength } = useFavoritesStore();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCharts, setSelectedCharts] = useState([]);

  useEffect(() => {
    if (user && user.id) {
      fetchAllFavorites(user.id)
        .then((res) => {
          const { data } = res;
          setFavorites(data);
          setFavoritesLength(data.length);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [user, favoritesLength]);

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

  return (
    <>
      <PageTitle
        title={
          <>
            <Labels labelFamily={"profile"} label={"welcome"} />{" "}
            {user?.fullName}
          </>
        }
      />
      <div className="flex w-full mb-5">
        <Text variant={"h2"} colorType={"normal-text"}>
          <Labels labelFamily={"profile"} label={"favoritesTitle"} />
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
        {loading &&
          [...Array(favoritesLength)].map((_, index) => (
            <CryptoCard
              key={index}
              loading
              fullWidth={index === 0 || index === favoritesLength - 1}
            />
          ))}
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
              fullWidth={index === favoritesLength - 1 || index === 0}
              customButtons={[
                <Button
                  key={favorite.id}
                  variant={"primary"}
                  onClick={() => handleShowChart(favorite.symbol)}
                >
                  <Icons
                    type={isSelected ? "chartBarSquareSolid" : "chartBarSquare"}
                    className={"h-5 w-5"}
                  />
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
