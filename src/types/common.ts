import { ReactNode } from "react";
import { Content } from "./content";

export interface ApiResponse {
  page: number;
  results: Content[];
  total_pages: number;
  total_results: number;
}

export interface ChildrenProps {
  children?: ReactNode;
}

export interface FadeInContentProps {
  children: ReactNode;
  classCSS?: string;
  duration: number;
}

export interface FadeInImageProps {
  src: string;
  type: string;
  alt?: string;
  width?: number;
  height?: number;
  classCSS?: string;
  title?: string;
  priority?: boolean;
  unoptimized?: boolean;
}

export interface BannerProps {
  children: ReactNode;
  backdrop?: string;
  title?: string;
  spotlight?: boolean;
}

export interface ModalContextType {
  isModalOpen: boolean;
  openModal: (value: string) => void;
  setIsModalOpen: (value: boolean) => void;
  modalText: string;
  redirectAfterClose: string | null;
  setRedirectAfterClose: (value: string | null) => void;
}
