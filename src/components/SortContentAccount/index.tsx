import React from "react";
import { SortContentAccountProps } from "@/types";
import { BsSortDown, BsSortDownAlt } from "react-icons/bs";

export function SortContentAccount({
  toggle,
  sortFunction,
  orderAsc,
  changeOrder,
}: SortContentAccountProps) {
  return (
    <div className="flex gap-2 items-center">
      <h5 className="text-sm sm:text-base">Ordenar por:</h5>
      <select
        className="select select-bordered select-secondary select-xs max-w-xs"
        defaultValue={""}
        onChange={(e) => {
          sortFunction(e.target.value);
        }}
      >
        {toggle === "recommended" && (
          <option value="" disabled>
            Selecione
          </option>
        )}
        {toggle !== "recommended" && (
          <option value="addition">Data de adição</option>
        )}
        <option value="popularity">Popularidade</option>
        <option value="voting">Classificação geral</option>
        {toggle === "rated" && <option value="rating">Sua avaliação</option>}
      </select>
      <div
        className="tooltip tooltip-right tooltip-neutral cursor-pointer"
        data-tip={`Mudar para ${
          orderAsc ? "ordem decrescente" : "ordem crescente"
        }`}
        onClick={changeOrder}
      >
        {orderAsc ? <BsSortDown size={20} /> : <BsSortDownAlt size={20} />}
      </div>
    </div>
  );
}
