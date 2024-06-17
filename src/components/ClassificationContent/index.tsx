import React from "react";
import classNames from "classnames";
import { CiCircleInfo } from "react-icons/ci";

export function ClassificationContent({
  certification,
  meaning,
}: {
  certification: string;
  meaning: string;
}) {
  const certificationDivStyle = classNames(
    "px-2.5 py-1 rounded-lg w-max h-max",
    {
      "bg-green-500": certification === "L",
      "bg-blue-500": certification === "10",
      "bg-yellow-500": certification === "12",
      "bg-orange-500": certification === "14",
      "bg-red-500": certification === "16",
      "bg-black": certification === "18",
    }
  );

  return (
    <div className="flex items-center gap-2">
      <div className={certificationDivStyle}>
        <p className="font-bold text-xl text-white">{certification}</p>
      </div>
      <div className="hidden lg:block tooltip tooltip-right" data-tip={meaning}>
        <CiCircleInfo size={30} />
      </div>
      <p className="text-xs lg:hidden">{meaning}</p>
    </div>
  );
}
