"use client";

import Button from "../Button/Button";
import { postFavorites } from "@/services/crypto";
import Icons from "../Icons/Icons";

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
      <Icons type={isFavorite ? "heartSolid" : "heart"} className="h-5 w-5" />
    </Button>
  );
};

export default FavoritesButton;
