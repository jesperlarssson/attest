"use client";
import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";

// TypeScript interface for the context state
export interface ModalContextType {
  isModalOpen: boolean;
  id: string;
  openModal: (id: string) => void;
  closeModal: () => void;
}

// Create a context with a default value
export const ModalContext = createContext<ModalContextType | undefined>(
  undefined
);

// Provider component with type annotations
export const ModalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [id, setId] = useState("");

  const openModal = useCallback((id: string) => {
    setId(id);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return (
    <ModalContext.Provider value={{ isModalOpen, id, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};
