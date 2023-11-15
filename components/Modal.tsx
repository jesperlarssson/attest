"use client";

import React, { ReactNode, useEffect } from "react";
import { twMerge } from "tailwind-merge";

interface ModalProps {
  children: ReactNode;
  isOpen: boolean; // Add a prop to control the visibility of the modal
  onClose: () => void; // Add a prop for handling the closing of the modal
}

const Modal: React.FC<ModalProps> = ({ children, isOpen, onClose }) => {
  return (
    <div
      className={twMerge(
        `inset-0 bg-black bg-opacity-50  flex justify-center items-center transition-all ease-in-out duration-500`,
        isOpen
          ? "fixed z-40 backdrop-blur-sm opacity-100"
          : "absolute z-0 opacity-0 pointer-events-none"
      )}
    >
      <div
        className={twMerge(
          `bg-card-light dark:bg-card-dark p-6 rounded-md shadow-lg border border-edge-light dark:border-edge-dark transition-all ease-in-out duration-500`,
          isOpen ? "scale-100 opacity-100" : "scale-75 opacity-0"
        )}
      >
        <button onClick={onClose} className=" absolute top-2 right-2">
          X
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
