"use client";

import { ModalContextType } from "@/types";
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";

const ModalContext = createContext<ModalContextType>({
  isModalOpen: false,
  openModal: () => {},
  setIsModalOpen: () => {},
  modalText: "",
  redirectAfterClose: "",
  setRedirectAfterClose: () => {},
});

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalText, setModalText] = useState("");
  const [redirectAfterClose, setRedirectAfterClose] = useState<string | null>(null);

  const openModal = useCallback((text: string) => {
    setModalText(text)
    setIsModalOpen(true);
  }, []);

  return (
    <ModalContext.Provider
      value={{
        isModalOpen,
        openModal,
        setIsModalOpen,
        modalText,
        redirectAfterClose,
        setRedirectAfterClose,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
