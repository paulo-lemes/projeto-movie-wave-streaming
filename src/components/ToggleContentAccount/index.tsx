"use client";

import React, { useEffect, useState } from "react";
import { ToggleContentAccountProps, Content } from "@/types";
import {
  PiBookmarkSimpleFill,
  PiBookmarkSimpleLight,
  PiHeartStraightFill,
  PiHeartStraightLight,
} from "react-icons/pi";
import { useAuth } from "@/app/contexts/AuthContext";
import { useModal } from "@/app/contexts/ModalContext";
import { fetchAllData } from "@/app/fetchData";

export function ToggleContentAccount({
  toggle,
  id,
  contentType,
  isInAccount,
  setIsInAccount
}: ToggleContentAccountProps) {
  const { user } = useAuth();
  const { openModal, setRedirectAfterClose } = useModal();

  const handleClick = async () => {
    if (!user) {
      setRedirectAfterClose(null);
      openModal(
        "Faça login para conseguir favoritar e adicionar conteúdos à sua lista"
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
    if (process.env.NODE_ENV === "development") console.log(response);
    if (response && response.success) {
      setIsInAccount((prev) => !prev);
    } else {
      openModal(
        "Não foi possível favoritar ou adicionar o conteúdo à lista de interesses"
      );
    }
  };

  const updatedAccountContent = async () => {
    const content = contentType === "movie" ? "movies" : contentType;

    try {
      const data = await fetchAllData(
        `/api/accountContent?toggle=${toggle}&contentType=${content}`
      );

      const contentIsTrue =
        data.filter((content: Content) => content.id == id)?.length > 0;

      setIsInAccount(contentIsTrue);
    } catch (error) {
      if (process.env.NODE_ENV === "development") console.log(error);
      setIsInAccount(false);
    }
  };

  useEffect(() => {
    updatedAccountContent();
  }, [user, id, isInAccount]);

  if (toggle === "favorite")
    return (
      <button
        className={`cursor-pointer tooltip tooltip-right lg:tooltip-bottom 
          transition-opacity ease-in duration-300
          ${
            isInAccount === null ? "invisible opacity-0" : "visible opacity-100"
          }`}
        title={`${isInAccount ? "Remover dos" : "Adicionar aos"} favoritos`}
        data-tip={`${isInAccount ? "Remover dos" : "Adicionar aos"} favoritos`}
        onClick={handleClick}
      >
        {isInAccount ? (
          <PiHeartStraightFill
            size={30}
            className="fill-secondary"
            data-test="favorite-filled-icon"
          />
        ) : (
          <PiHeartStraightLight
            size={30}
            className="fill-secondary"
            data-test="favorite-unfilled-icon"
          />
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
          <PiBookmarkSimpleFill
            size={30}
            className="fill-secondary"
            data-test="watchlist-filled-icon"
          />
        ) : (
          <PiBookmarkSimpleLight
            size={30}
            className="fill-secondary"
            data-test="watchlist-unfilled-icon"
          />
        )}
      </button>
    );
}
