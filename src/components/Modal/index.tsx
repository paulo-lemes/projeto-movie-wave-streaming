import React from "react";
import { modalProps } from "@/types";

export function Modal({ isOpen, onClose, children }: modalProps) {
  return (
    isOpen && (
      <div className="fixed inset-0 flex z-40 items-center justify-center">
        <div
          className="modal-overlay fixed inset-0 z-40 bg-black opacity-50"
          onClick={onClose}
        ></div>
        <div className="modal-container rounded-lg z-50 overflow-y-auto">
          {children}
        </div>
      </div>
    )
  );
}
