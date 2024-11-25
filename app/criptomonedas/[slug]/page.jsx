/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import Button from "@/components/Button/Button";
import CandleStickChart from "@/components/CandleStickChart/CandleStickChart";
import Page from "@/components/Page/Page";
import PageTitle from "@/components/PageTitle/PageTitle";
import Spinner from "@/components/Spinner/Spinner";
import Text from "@/components/Text/Text";
import useTheme from "@/hooks/useTheme";
import {
  fetchCryptocurrencyInfo,
  fetchUserCryptoPreference,
  postFavorites,
  postVotes,
} from "@/services/crypto";
import { useAuthStore } from "@/store/globalStore";
import {
  ArrowTrendingDownIcon,
  ArrowTrendingUpIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import {
  BarsArrowDownIcon,
  BarsArrowUpIcon,
  HeartIcon as HeartIconSolid,
} from "@heroicons/react/20/solid";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const Criptomoneda = () => {
  const [cryptoInfo, setCryptoInfo] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const user = useAuthStore((state) => state.user);
  const [isFavorite, setIsFavorite] = useState(false);
  const [userVote, setUserVote] = useState("");
  const [voteStats, setVoteStats] = useState({});
  const [showVotes, setShowVotes] = useState(false);
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
        if (data && user?.id) {
          setIsFavorite(data?.is_favorite);
          setVoteStats(data?.totals);
          setUserVote(data?.vote);
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

  const handleVotes = async (vote) => {
    if (userVote && userVote === vote) {
      return;
    }

    const body = {
      userId: user.id,
      symbol: cryptoInfo.symbol,
      name: cryptoInfo.name,
      slug: cryptoInfo.slug,
      vote,
    };

    postVotes(body).then((res) => {
      const { totals, vote } = res;
      setVoteStats(totals);
      setUserVote(vote);
    });
  };

  const handleShowVotes = () => {
    setShowVotes(!showVotes);
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
              <div
                className={`flex ${
                  user?.id ? "justify-between" : "justify-end"
                }`}
              >
                {user && user?.id && (
                  <div className="flex gap-4">
                    <Button variant={"primary"} onClick={handleFavorite}>
                      {!isFavorite ? (
                        <HeartIcon className="h-5 w-5 " />
                      ) : (
                        <HeartIconSolid className="h-5 w-5" />
                      )}
                    </Button>
                    <button
                      disabled={userVote && userVote === "is_bullish"}
                      className={`${
                        userVote === "is_bearish" || userVote === null
                          ? "bg-green-600 hover:bg-green-500"
                          : "bg-gray-600"
                      } px-3 py-2 rounded-md `}
                      onClick={() => handleVotes("is_bullish")}
                    >
                      <ArrowTrendingUpIcon className="h-5 w-5" />
                    </button>
                    <button
                      disabled={userVote && userVote === "is_bearish"}
                      className={`${
                        userVote === "is_bullish" || userVote === null
                          ? "bg-red-600 hover:bg-red-500"
                          : "bg-gray-600"
                      } px-3 py-2 rounded-md `}
                      onClick={() => handleVotes("is_bearish")}
                    >
                      <ArrowTrendingDownIcon className="h-5 w-5" />
                    </button>
                    {voteStats &&
                      voteStats?.percentages?.bullish !== 0 &&
                      voteStats?.percentages?.bearish !== 0 && (
                        <Button variant={"primary"} onClick={handleShowVotes}>
                          {!showVotes ? (
                            <BarsArrowDownIcon className="h-5 w-5" />
                          ) : (
                            <BarsArrowUpIcon className="h-5 w-5" />
                          )}
                        </Button>
                      )}
                  </div>
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
          {showVotes && (
            <div className="w-full flex mt-4 gap-4 flex-col">
              <Text variant={"h3"} colorType={"normal-text"}>
                Votos de la comunidad
              </Text>
              <div className="w-full bg-gray-200 rounded-full h-6 relative flex overflow-hidden">
                <div
                  className="bg-green-600 h-6"
                  style={{
                    width: `${voteStats.percentages?.bullish}%`,
                  }}
                ></div>
                <div
                  className="bg-red-600 h-6"
                  style={{
                    width: `${voteStats.percentages?.bearish}%`,
                  }}
                ></div>
                <div className="absolute inset-0 flex items-center justify-center font-bold">
                  {voteStats.percentages?.bullish >
                  voteStats.percentages?.bearish
                    ? `${voteStats.percentages?.bullish}%`
                    : `${voteStats.percentages?.bearish}%`}
                </div>
              </div>
              <Text variant={"p"} colorType={"normal-text"}>
                De acuerdo al{" "}
                {voteStats.percentages?.bullish > voteStats.percentages?.bearish
                  ? voteStats.percentages?.bullish
                  : voteStats.percentages?.bearish}
                % de los votantes,{" "}
                <span className="font-semibold uppercase">
                  {cryptoInfo.name}
                </span>{" "}
                tiene una tendencia{" "}
                <span
                  className={
                    voteStats.percentages?.bullish >
                    voteStats.percentages?.bearish
                      ? "text-green-600 font-semibold"
                      : "text-red-600 font-semibold"
                  }
                >
                  {voteStats.percentages?.bullish >
                  voteStats.percentages?.bearish
                    ? "ALCISTA"
                    : "BAJISTA"}
                </span>
                .
              </Text>
            </div>
          )}
          <CandleStickChart symbol={cryptoInfo.symbol} />
        </>
      )}
    </Page>
  );
};

export default Criptomoneda;
