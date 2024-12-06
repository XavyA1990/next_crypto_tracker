import React from "react";
import {
  ArrowTrendingDownIcon,
  ArrowTrendingUpIcon,
} from "@heroicons/react/24/outline";
import { BarsArrowDownIcon, BarsArrowUpIcon } from "@heroicons/react/20/solid";
import Button from "../Button/Button";
import { postVotes } from "@/services/crypto";

const CommunityVotesButtons = ({
  userId,
  symbol,
  name,
  slug,
  setVoteStats,
  setUserVote,
  userVote,
  voteStats,
  setShowVotes,
  showVotes,
}) => {
  const handleVotes = async (vote) => {
    if (userVote && userVote === vote) {
      return;
    }

    const body = {
      userId: userId,
      symbol: symbol,
      name: name,
      slug: slug,
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
  return (
    <>
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
      {voteStats != {} && voteStats?.total_votes != 0 && (
        <Button variant={"primary"} onClick={handleShowVotes}>
          {!showVotes ? (
            <BarsArrowDownIcon className="h-5 w-5" />
          ) : (
            <BarsArrowUpIcon className="h-5 w-5" />
          )}
        </Button>
      )}
    </>
  );
};

export default CommunityVotesButtons;
