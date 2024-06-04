"use client";

import React, { useEffect, useState } from "react";
import { ToggleContentAccountProps, content } from "@/types";
import { postContentList } from "@/app/actions";
import {
  PiBookmarkSimpleFill,
  PiBookmarkSimpleLight,
  PiHeartStraightFill,
  PiHeartStraightLight,
} from "react-icons/pi";
import { useAuth } from "@/app/contexts/AuthContext";

export function ToggleContentAccount({
  toggle,
  id,
  contentType,
}: ToggleContentAccountProps) {
  const [isInAccount, setIsInAccount] = useState<boolean | undefined | null>(
    null
  );
  const { user } = useAuth();

  const handleClick = async () => {
    const body = {
      media_type: contentType,
      media_id: id,
      [toggle]: !isInAccount,
    };

    const res = await postContentList(toggle, user?.id, body);
    console.log(res);

    if (res && res.success) {
      setIsInAccount((prev) => !prev);
    } else {
      alert(
        "Não foi possível favoritar ou adicionar o conteúdo à lista de interesses."
      );
    }
  };

  const updatedAccountContent = async () => {
    const content = contentType === "movie" ? "movies" : contentType;
    const data = await fetch(
      `/api/accountContent?accountId=${user?.id}&toggle=${toggle}&contentType=${content}`
    );

    if (data.ok) {
      const results = await data.json();
      const favoriteIsTrue =
        results &&
        results?.filter((content: content) => content.id == id).length > 0;

      setIsInAccount(favoriteIsTrue);
    }
  };

  useEffect(() => {
    if (user) updatedAccountContent();
  }, [user, id, isInAccount]);

  if (toggle === "favorite")
    return (
      <button
        className="cursor-pointer tooltip tooltip-right lg:tooltip-bottom"
        title={`${isInAccount ? "Remover dos" : "Adicionar aos"} favoritos`}
        data-tip={`${isInAccount ? "Remover dos" : "Adicionar aos"} favoritos`}
        onClick={handleClick}
      >
        {isInAccount ? (
          <PiHeartStraightFill size={30} className="fill-secondary" />
        ) : (
          <PiHeartStraightLight size={30} className="fill-secondary" />
        )}
      </button>
    );

  if (toggle === "watchlist")
    return (
      <button
        className="cursor-pointer tooltip tooltip-right lg:tooltip-bottom"
        title={`${
          isInAccount ? "Remover da" : "Adicionar na"
        } lista de interesses`}
        data-tip={`${
          isInAccount ? "Remover da" : "Adicionar na"
        } lista de interesses`}
        onClick={handleClick}
      >
        {isInAccount ? (
          <PiBookmarkSimpleFill size={30} className="fill-secondary" />
        ) : (
          <PiBookmarkSimpleLight size={30} className="fill-secondary" />
        )}
      </button>
    );
}
