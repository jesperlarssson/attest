"use client";
import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";

interface InvoiceKey {
  pk01: string;
  pk02: string;
  pk03: string;
}

// TypeScript interface for the context state
export interface ModalContextType {
  isModalOpen: boolean;
  id: InvoiceKey;
  openModal: (id: InvoiceKey) => void;
  closeModal: () => void;
}

// Define a default value
const defaultModalContext: ModalContextType = {
  isModalOpen: false,
  id: { pk01: "", pk02: "", pk03: "" }, // Default values for InvoiceKey
  openModal: () => {}, // No-op functions for default
  closeModal: () => {},
};
// Create a context with a default value
export const ModalContext = createContext<ModalContextType | undefined>(
  defaultModalContext
);

// Provider component with type annotations
export const ModalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [id, setId] = useState<InvoiceKey>({ pk01: "", pk02: "", pk03: "" });

  const openModal = useCallback((id: InvoiceKey) => {
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
