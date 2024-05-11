import { useCallback, useState } from "react";

export function useModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleModalClose = useCallback(() => {
    setIsModalOpen(false);
  }, []);
  return { isModalOpen, handleModalOpen, handleModalClose };
}
