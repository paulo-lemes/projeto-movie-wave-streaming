import React from 'react'
import { MdStarOutline } from 'react-icons/md';

export function RatingContent() {
  return (
    <button className={`flex gap-1 mb-1`}>
      <MdStarOutline className="fill-secondary" size={25} />
      <p className="text-sm text-secondary mt-1">Avaliar</p>
    </button>
  );
}
