import React from "react";
import classNames from "classnames";

export function ClassificationContent({
  certification,
  meaning,
}: {
  certification: string;
  meaning: string;
}) {
  const bgColorStyle = classNames({
    "bg-green-500": certification === "L",
    "bg-blue-500": certification === "10",
    "bg-yellow-500": certification === "12",
    "bg-orange-500": certification === "14",
    "bg-red-500": certification === "16",
    "bg-black": certification === "18",
  });

  return (
    <div
      className={`flex items-center lg:tooltip lg:tooltip-right`}
      data-tip={meaning}
    >
      <div className={`${bgColorStyle} px-2.5 py-1 rounded-lg w-max h-max`}>
        <p className={`font-bold text-xl text-white`}>{certification}</p>
      </div>
      <p className="text-xs lg:hidden pl-2">{meaning}</p>
    </div>
  );
}