"use client";

import React, { useEffect, useState } from "react";
import { ToggleContentAccountProps, content } from "@/types";
import {
  PiBookmarkSimpleFill,
  PiBookmarkSimpleLight,
  PiHeartStraightFill,
  PiHeartStraightLight,
} from "react-icons/pi";
import { useAuth } from "@/app/contexts/AuthContext";
import { useModal } from "@/app/contexts/ModalContext";

export function ToggleContentAccount({
  toggle,
  id,
  contentType,
}: ToggleContentAccountProps) {
  const [isInAccount, setIsInAccount] = useState<boolean | undefined | null>(
    null
  );
  const { user } = useAuth();
  const { openModal } = useModal();

  const handleClick = async () => {
    if (!user) {
      openModal(
        "Faça login para conseguir favoritar e adicionar conteúdos à sua lista."
      );
      return;
    }

    const body = {
      media_type: contentType,
      media_id: id,
      [toggle]: !isInAccount,
    };

    const postContent = await fetch("/api/accountContent", {
      method: "POST",
      body: JSON.stringify({
        accountId: user.id,
        toggle: toggle,
        bodyParam: body,
      }),
    });

    const response = await postContent.json();
    console.log(response);
    if (response && response.success) {
      let message;
      setIsInAccount((prev) => {
        return !prev;
      });
    } else {
      openModal(
        "Não foi possível favoritar ou adicionar o conteúdo à lista de interesses."
      );
    }
  };

  const updatedAccountContent = async () => {
    const content = contentType === "movie" ? "movies" : contentType;
    const data = await fetch(
      `/api/accountContent?toggle=${toggle}&contentType=${content}`
    );

    if (data.ok) {
      const results = await data.json();
      const contentIsTrue =
        results &&
        results?.filter((content: content) => content.id == id).length > 0;

      setIsInAccount(contentIsTrue);
    } else setIsInAccount(false)
  };

  useEffect(() => {
    updatedAccountContent();
  }, [user, id, isInAccount]);

  if (toggle === "favorite")
    return (
      <button
        className={`cursor-pointer tooltip tooltip-right lg:tooltip-bottom 
          transition-opacity ease-in duration-700
          ${
            isInAccount === null ? "invisible opacity-0" : "visible opacity-100"
          }`}
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
        className={`cursor-pointer tooltip tooltip-right lg:tooltip-bottom 
          transition-opacity ease-in duration-700
          ${
            isInAccount === null ? "invisible opacity-0" : "visible opacity-100"
          }`}
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
