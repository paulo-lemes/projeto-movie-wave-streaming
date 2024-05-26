import React from "react";

export function StyledTitle({ title }: { title: string }) {
  const letterArray = title.split("");

  console.log(letterArray);

  return (
    <>
      <span className="letter-shadow-r ml-0">{letterArray[0]}</span>
      {letterArray.map(
        (letter, i) =>
          i > 0 && (
            <span className="-ml-2 lg:-ml-3 letter-shadow-r">{letter}</span>
          )
      )}
    </>
  );
}
