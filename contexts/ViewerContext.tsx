"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface ContextViewerState {
  isOpen: boolean;
  content: ReactNode | null;
  openViewer: (content: ReactNode) => void;
  closeViewer: () => void;
}

const ContextViewerContext = createContext<ContextViewerState>({
  isOpen: false,
  content: null,
  openViewer: () => {},
  closeViewer: () => {},
});

export const ContextViewerProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [content, setContent] = useState<ReactNode | null>(null);

  const openViewer = (newContent: ReactNode) => {
    setContent(newContent);
    setIsOpen(true);
  };

  const closeViewer = () => {
    setIsOpen(false);
    setContent(null);
  };

  return (
    <ContextViewerContext.Provider
      value={{ isOpen, content, openViewer, closeViewer }}
    >
      {children}
    </ContextViewerContext.Provider>
  );
};

export const useContextViewer = () => useContext(ContextViewerContext);
