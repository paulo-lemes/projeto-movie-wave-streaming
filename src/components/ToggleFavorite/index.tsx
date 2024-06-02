"use client";

import React, { useEffect, useState } from "react";
import { getFavoritesAccount, postFavorite } from "@/app/actions";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";

export function ToggleFavorite({
  id,
  type,
  accountId,
}: {
  id: number;
  type: string | undefined;
  accountId: string;
}) {
  const [isFavorite, setIsFavorite] = useState<boolean | undefined | null>(
    null
  );

  const handleClick = async () => {
    const body = {
      media_type: type,
      media_id: id,
      favorite: !isFavorite,
    };

    const res = await postFavorite(accountId, body);
    console.log(res);

    if (res && res.success) {
      setIsFavorite((prev) => !prev);
    } else {
      window.alert("Não foi possível favoritar o conteúdo. Tente novamente.");
    }
  };

  const updatedFavorites = async () => {
    const favorites = await getFavoritesAccount(accountId, type);
    const favoriteIsTrue =
      favorites && favorites?.filter((content) => content.id == id).length > 0;
    setIsFavorite(favoriteIsTrue);
  };

  useEffect(() => {
    updatedFavorites();
  }, [accountId, id, isFavorite]);

  useEffect(() => {
    console.log(isFavorite);
  }, [isFavorite]);

  return (
    <button
      className="cursor-pointer tooltip tooltip-bottom"
      title={`Adicionar aos favoritos`}
      data-tip={`Adicionar aos favoritos`}
      onClick={handleClick}
    >
      {isFavorite ? (
        <MdFavorite size={30} className="fill-secondary" />
      ) : (
        <MdFavoriteBorder size={30} className="fill-secondary" />
      )}
    </button>
  );
}
