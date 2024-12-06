"use client";

import React from "react";
import Button from "../Button/Button";
import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/20/solid";
import { postFavorites } from "@/services/crypto";

const FavoritesButton = ({
  symbol,
  name,
  slug,
  userId,
  setIsFavorite,
  isFavorite,
}) => {
  const handleFavorite = async () => {
    const body = {
      userId: userId,
      symbol: symbol,
      name: name,
      slug: slug,
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

  return (
    <Button variant={"primary"} onClick={handleFavorite}>
      {!isFavorite ? (
        <HeartIcon className="h-5 w-5 " />
      ) : (
        <HeartIconSolid className="h-5 w-5" />
      )}
    </Button>
  );
};

export default FavoritesButton;
