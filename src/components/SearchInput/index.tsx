"use client";

import React from "react";
import { motion } from "framer-motion";
import { MdOutlineManageSearch } from "react-icons/md";

export function SearchInput({
  handleSearch,
}: {
  handleSearch: (formData: FormData) => void;
}) {
  return (
    <form action={handleSearch} className="mt-32">
      <motion.label
        className="input input-bordered input-secondary flex w-[80vw] sm:w-[50vw] m-auto"
        initial={{ x: -100, opacity: 0 }}
        animate={{
          x: 0,
          opacity: 1,
          transition: {
            duration: 0.5,
            delay: 0.3,
          },
        }}
      >
        <input
          name="text"
          type="text"
          className="grow"
          placeholder="Pesquisar"
        />
        <button type="submit" className="cursor-pointer">
          <MdOutlineManageSearch size={30} />
        </button>
      </motion.label>
    </form>
  );
}
