/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import Button from "@/components/Button/Button";
import CandleStickChart from "@/components/CandleStickChart/CandleStickChart";
import Page from "@/components/Page/Page";
import PageTitle from "@/components/PageTitle/PageTitle";
import Spinner from "@/components/Spinner/Spinner";
import Text from "@/components/Text/Text";
import useTheme from "@/hooks/useTheme";
import { fetchCryptocurrencyInfo } from "@/services/crypto";
import { fetchUserCryptoPreference, postFavorites } from "@/services/user";
import { useAuthStore } from "@/store/globalStore";
import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/20/solid";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const Criptomoneda = () => {
  const [cryptoInfo, setCryptoInfo] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const user = useAuthStore((state) => state.user);
  const [isFavorite, setIsFavorite] = useState(false);
  const path = usePathname();
  const { theme, mounted } = useTheme();
  const slug = path.split("/")[2];

  useEffect(() => {
    fetchCryptocurrencyInfo(slug)
      .then((data) => {
        setCryptoInfo(data);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (user && user.id) {
      fetchUserCryptoPreference(user.id, slug).then((res) => {
        const { data } = res;
        if (data) {
          setIsFavorite(data?.is_favorite);
        }
      });
    }
  }, [user, slug]);

  const handleFavorite = async () => {
    const body = {
      userId: user.id,
      symbol: cryptoInfo.symbol,
      name: cryptoInfo.name,
      slug: cryptoInfo.slug,
      isFavorite: !isFavorite,
    };

    setIsFavorite(!isFavorite);

    postFavorites(body).then((res) => {
      const { data } = res;
      if (data) {
        setIsFavorite(data.is_favorite);
      }
    });
  };

  if (!mounted) return null;

  return (
    <Page>
      {loading && (
        <div className="flex items-center h-full justify-center absolute left-1/2 bottom-1/4">
          <Spinner />
        </div>
      )}
      {!loading && (
        <>
          <PageTitle title={`${cryptoInfo.name}`} imgSrc={cryptoInfo.logo} />
          <div className="flex flex-col gap-4">
            <Text variant={"h2"} colorType={"normal-text"}>
              {cryptoInfo.symbol}
            </Text>
            <Text variant={"p"} colorType={"normal-text"}>
              {cryptoInfo.description}
            </Text>
            {cryptoInfo.website && (
              <div className="flex justify-between">
                {user && user?.id && (
                  <Button variant={"primary"} onClick={handleFavorite}>
                    {!isFavorite ? (
                      <HeartIcon className="h-5 w-5 " />
                    ) : (
                      <HeartIconSolid className="h-5 w-5" />
                    )}
                  </Button>
                )}
                <Link
                  target="_blank"
                  href={cryptoInfo.website}
                  className={`btn-primary ${theme} inline-flex items-center px-3 py-2 rounded-md font-bold`}
                >
                  Más información
                </Link>
              </div>
            )}
          </div>
          <CandleStickChart symbol={cryptoInfo.symbol} />
        </>
      )}
    </Page>
  );
};

export default Criptomoneda;
