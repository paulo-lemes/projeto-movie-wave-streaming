"use client";

import React, { useState } from "react";

export function RatingStars({
  rating,
  handleStarSelection,
}: {
  rating: number | string;
  handleStarSelection: (value: number) => void;
}) {
  const [hover, setHover] = useState<number | null>(null);
  const totalStars = 10;

  return (
    <div className={""}>
      {[...Array(totalStars)].map((star, index) => {
        const currentRating = index + 1;

        return (
          <label key={index}>
            <input
              key={star}
              type="radio"
              name="rating"
              value={currentRating}
              onChange={() => handleStarSelection(currentRating)}
              className="hidden"
            />
            <span
              className={`${""} ${
                currentRating <= (hover || Number(rating)) ? "" : "text-neutral"
              }`}
              onMouseEnter={() => setHover(currentRating)}
              onMouseLeave={() => setHover(null)}
            >
              &#9733;
            </span>
          </label>
        );
      })}
    </div>
  );
}
