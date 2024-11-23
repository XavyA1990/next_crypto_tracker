/* eslint-disable @next/next/no-img-element */
"use client";

import Button from "@/components/Button/Button";
import CandleStickChart from "@/components/CandleStickChart/CandleStickChart";
import CryptoCard from "@/components/Card/CryptoCard";
import Page from "@/components/Page/Page";
import PageTitle from "@/components/PageTitle/PageTitle";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
import Spinner from "@/components/Spinner/Spinner";
import Text from "@/components/Text/Text";
import { fetchAllFavorites } from "@/services/user";
import { useAuthStore } from "@/store/globalStore";
import { ChartBarSquareIcon } from "@heroicons/react/24/outline";
import { ChartBarSquareIcon as ChartBarSquareIconSolid } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";

const PerfilDeUsuario = () => {
  const user = useAuthStore((state) => state.user);
  const [favorites, setFavorites] = useState([]);
  const [lastCrypto, setLastCrypto] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedChart, setSelectedChart] = useState(null);

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
    if (selectedChart?.symbol === symbol) {
      setSelectedChart(null);
      return;
    }
    setSelectedChart(favorites.find((favorite) => favorite.symbol === symbol));
  };

  return (
    <ProtectedRoute>
      <Page>
        {loading ? (
          <div className="flex items-center h-full justify-center absolute left-1/2 bottom-1/4">
            <Spinner />
          </div>
        ) : (
          <>
            <PageTitle title={`Bienvenido ${user?.fullName}`} />
            <div className="flex w-full mb-5">
              <Text variant={"h2"} colorType={"normal-text"}>
                Tus favoritos
              </Text>
            </div>
            <div className="flex w-full">
              <Text variant={"h3"} colorType={"normal-text"}>
                {user?.email}
              </Text>
            </div>
            {selectedChart && selectedChart?.symbol && (
              <>
                <div className="flex w-full mt-5">
                  <Text variant={"h2"} colorType={"text-title"}>
                    {selectedChart.name} ({selectedChart.symbol})
                  </Text>
                </div>
                <div className="flex w-full">
                  <CandleStickChart symbol={selectedChart.symbol} />
                </div>
              </>
            )}

            <div className="grid grid-cols-2 md:grid-cols-3 w-full gap-4 mt-8 mb-8">
              {favorites.map((favorite, index) => (
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
                      {selectedChart?.symbol !== favorite.symbol ? (
                        <ChartBarSquareIcon className="h-5 w-5" />
                      ) : (
                        <ChartBarSquareIconSolid className="h-5 w-5" />
                      )}
                    </Button>,
                  ]}
                />
              ))}
            </div>
          </>
        )}
      </Page>
    </ProtectedRoute>
  );
};

export default PerfilDeUsuario;
