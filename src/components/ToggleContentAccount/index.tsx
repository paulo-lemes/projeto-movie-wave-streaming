"use client";

import React, { useEffect, useState } from "react";
import { ToggleContentAccountProps } from "@/types";
import { getContentAccount, postContentList } from "@/app/actions";
import {
  PiBookmarkSimpleFill,
  PiBookmarkSimpleLight,
  PiHeartStraightFill,
  PiHeartStraightLight,
} from "react-icons/pi";

export function ToggleContentAccount({
  toggle,
  id,
  contentType,
  accountId,
}: ToggleContentAccountProps) {
  const [isInAccount, setIsInAccount] = useState<boolean | undefined | null>(
    null
  );

  const handleClick = async () => {
    const body = {
      media_type: contentType,
      media_id: id,
      [toggle]: !isInAccount,
    };

    const res = await postContentList(toggle, accountId, body);
    console.log(res);

    if (res && res.success) {
      setIsInAccount((prev) => !prev);
    } else {
      window.alert("Não foi possível favoritar o conteúdo. Tente novamente.");
    }
  };

  const updatedAccountContent = async () => {
    const results = await getContentAccount(toggle, accountId, contentType);
    const favoriteIsTrue =
      results && results?.filter((content) => content.id == id).length > 0;
    setIsInAccount(favoriteIsTrue);
  };

  useEffect(() => {
    updatedAccountContent();
  }, [accountId, id, isInAccount]);

  if (toggle === "favorite")
    return (
      <button
        className="cursor-pointer tooltip tooltip-bottom"
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
        className="cursor-pointer tooltip tooltip-bottom"
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
