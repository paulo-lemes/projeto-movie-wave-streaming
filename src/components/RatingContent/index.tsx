"use client";

import React, { useEffect, useState } from "react";
import { RatingContentProps, content } from "@/types";
import { useAuth } from "@/app/contexts/AuthContext";
import { useModal } from "@/app/contexts/ModalContext";
import { MdStarOutline, MdStarRate } from "react-icons/md";
import { RatingStars } from "../RatingsStars";

export function RatingContent({ id, contentType }: RatingContentProps) {
  const [isRated, setIsRated] = useState<boolean | null>(null);
  const [rating, setRating] = useState<number | string>(0);
  const [showRatingStars, setShowRatingStars] = useState<boolean>(false);

  const { user } = useAuth();
  const { openModal, setRedirectAfterClose } = useModal();

  const handleStarSelection = (value: number) => {
    setRating(value);
  };

  const handleCloseModal = () => {
    setShowRatingStars(false);
  };

  const handleClick = async () => {
    if (!user) {
      setRedirectAfterClose(null);
      openModal("Faça login para conseguir avaliar conteúdos");
      return;
    }
    setShowRatingStars(true);
  };

  const handleRatingAction = async (method: string) => {
    const postContent = await fetch("/api/accountRating", {
      method: method,
      body: JSON.stringify({
        id: id,
        contentType: contentType,
        rating: rating,
      }),
    });

    const response = await postContent.json();
    console.log(response);

    setRedirectAfterClose(null);
    setShowRatingStars((prev) => !prev);

    if (response && response.success) {
      switch (response.status_code) {
        case 1:
          openModal("Avaliação feita!");
          setIsRated((prev) => !prev);
          break;
        case 12:
          openModal("Avaliação atualizada!");
          break;
        case 13:
          openModal("Avaliação excluída");
          setIsRated((prev) => !prev);
          setRating(0);
          break;
        default:
          break;
      }
    } else openModal("Não foi possível avaliar o conteúdo");
  };

  const updatedAccountRating = async () => {
    const content = contentType === "movie" ? "movies" : contentType;
    const data = await fetch(`/api/accountRating?contentType=${content}`);

    if (data.ok) {
      const results = await data.json();
      const ratingIsTrue = results?.filter(
        (content: content) => content.id == id
      );

      console.log(ratingIsTrue);

      if (ratingIsTrue.length > 0) {
        setIsRated(true);
        setRating(ratingIsTrue[0].rating);
        return;
      } else setIsRated(false);
    } else setIsRated(false);
  };

  useEffect(() => {
    updatedAccountRating();
  }, [user, id]);

  return (
    <div
      className={`flex gap-2 items-center transition-opacity ease-in duration-300 ${
        isRated === null ? "invisible opacity-0" : "visible opacity-100"
      }`}
    >
      {!isRated ? (
        <button
          className={`flex gap-1 mb-1 transition-opacity ease-in duration-300 ${
            isRated ? "invisible opacity-0" : "visible opacity-100"
          }`}
          onClick={handleClick}
        >
          <MdStarOutline className="fill-secondary" size={25} />
          <p className="text-sm text-secondary mt-1">Avaliar</p>
        </button>
      ) : (
        <div
          className={`flex gap-1 items-center transition-opacity ease-in duration-300 ${
            !isRated ? "invisible opacity-0" : "visible opacity-100"
          }`}
        >
          <p className="font-bold sm:text-lg mt-1">Sua avaliação:</p>
          <MdStarRate className="fill-secondary" size={25} />
          <p className="font-bold text-secondary sm:text-lg mt-1">
            {rating}/10
          </p>
          <button
            className={`transition-opacity ease-in duration-700 ${
              isRated === null ? "invisible opacity-0" : "visible opacity-100"
            }`}
            onClick={handleClick}
          >
            <p className="text-sm text-secondary mt-1">- Alterar</p>
          </button>
        </div>
      )}
      {showRatingStars && (
        <RatingStars
          isOpen={showRatingStars}
          onClose={handleCloseModal}
          isRated={isRated}
          handleAction={handleRatingAction}
          rating={rating}
          handleStarSelection={handleStarSelection}
        />
      )}
    </div>
  );
}
