"use client";

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import PageTitle from "../PageTitle/PageTitle";
import Text from "../Text/Text";
import FavoritesButton from "../FaviritesButton/FavoritesButton";
import CommunityVotesButtons from "../CommunityVotesButtons/CommunityVotesButtons";
import Link from "../Link/Link";
import CommunityVotesDisplay from "../CommunityVotesDisplay/CommunityVotesDisplay";
import CandleStickChart from "../CandleStickChart/CandleStickChart";
import CryptoMonthlyTable from "../CryptoMonthlyTable/CryptoMonthlyTable";
import {
  fetchCryptocurrencyInfo,
  fetchUserCryptoPreference,
} from "@/services/crypto";
import Spinner from "../Spinner/Spinner";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/store/globalStore";
import labels from "@/lib/labels/labels";

const { seeMore, cryptoNotFound, returnToHome } = labels.commons;

const CryptocurrencyShow = () => {
  const [cryptoInfo, setCryptoInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const user = useAuthStore((state) => state.user);
  const [isFavorite, setIsFavorite] = useState(false);
  const [error, setError] = useState([]);
  const [userVote, setUserVote] = useState("");
  const [voteStats, setVoteStats] = useState({});
  const [showVotes, setShowVotes] = useState(false);
  const path = usePathname();
  const slug = path.split("/")[2];

  useEffect(() => {
    fetchCryptocurrencyInfo(slug)
      .then((data) => {
        if (!data) {
          setError((prev) => [...prev, "Error fetching crypto info"]);
          setLoading(false);
          return;
        }
        setCryptoInfo(data);
      })
      .catch((error) => {
        console.error("Error fetching crypto info");
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

  if (loading) {
    return (
      <div className="flex items-center h-full justify-center absolute left-1/2 bottom-1/4">
        <Spinner />
      </div>
    );
  }

  if (error.length > 0) {
    return (
      <div className="flex flex-col items-center h-full justify-center mt-8">
        <Text variant={"h2"} colorType={"normal-text"}>
          {cryptoNotFound}
        </Text>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link variant={"primary"} href="/">
            {returnToHome}
          </Link>
          <Link href="/criptomonedas" variant={"no-fill"}>
            <Text variant={"span"} colorType={"text-title"}>
              {seeMore}<span aria-hidden="true"> →</span>
            </Text>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <PageTitle title={`${cryptoInfo.name}`} imgSrc={cryptoInfo.logo} />
      <div className="flex flex-col gap-4 px-3">
        <Text variant={"h2"} colorType={"normal-text"}>
          {cryptoInfo.symbol}
        </Text>
        <Text colorType={"normal-text"}>{cryptoInfo.description}</Text>
        {cryptoInfo.website && (
          <div
            className={`flex ${user?.id ? "justify-between" : "justify-end"}`}
          >
            {user && user?.id && (
              <div className="flex gap-4">
                <FavoritesButton
                  symbol={cryptoInfo.symbol}
                  name={cryptoInfo.name}
                  slug={cryptoInfo.slug}
                  isFavorite={isFavorite}
                  setIsFavorite={setIsFavorite}
                  userId={user.id}
                />
                <CommunityVotesButtons
                  name={cryptoInfo.name}
                  slug={cryptoInfo.slug}
                  symbol={cryptoInfo.symbol}
                  userId={user.id}
                  userVote={userVote}
                  setUserVote={setUserVote}
                  voteStats={voteStats}
                  setVoteStats={setVoteStats}
                  showVotes={showVotes}
                  setShowVotes={setShowVotes}
                />
              </div>
            )}
            <Link target="_blank" href={cryptoInfo.website} variant={"primary"}>
              {seeMore}
            </Link>
          </div>
        )}
      </div>
      {showVotes && user?.id && (
        <CommunityVotesDisplay
          bullish={voteStats.percentages?.bullish}
          bearish={voteStats.percentages?.bearish}
          name={cryptoInfo.name}
        />
      )}
      <div className="px-3">
        <CandleStickChart symbol={cryptoInfo.symbol} />
      </div>
      <CryptoMonthlyTable name={cryptoInfo.name} symbol={cryptoInfo.symbol} />
    </>
  );
};

export default CryptocurrencyShow;
