"use client";

import Button from "../Button/Button";
import { postFavorites } from "@/services/crypto";
import Icons from "../Icons/Icons";
import { useFavoritesStore } from "@/store/globalStore";

const FavoritesButton = ({
  symbol,
  name,
  slug,
  userId,
  setIsFavorite,
  isFavorite,
}) => {
  const { setFavoritesLength, favoritesLength } = useFavoritesStore();
  const handleFavorite = async () => {
    const body = {
      userId: userId,
      symbol: symbol,
      name: name,
      slug: slug,
      isFavorite: !isFavorite,
    };

    setIsFavorite(!isFavorite);
    setFavoritesLength(favoritesLength + (!isFavorite ? 1 : -1));

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
