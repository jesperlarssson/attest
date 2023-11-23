"use client";

import React from "react";
import { useContextViewer } from "@/contexts/ViewerContext";
import { twMerge } from "tailwind-merge";
import CollapseButton from "./CollapseButton";

const ContextViewer: React.FC = () => {
  const { isOpen, content, closeViewer } = useContextViewer();

  const viewerClass = isOpen ? "translate-x-0" : "translate-x-full";

  return (
    <>
      <div
        onClick={closeViewer}
        className={twMerge(
          `inset-0 bg-black bg-opacity-10 fixed left-0 top-0  w-screen h-screen overflow-scroll  flex justify-center items-center transition-all ease-in-out duration-500`,
          isOpen
            ? "fixed z-30 backdrop-blur-sm opacity-800"
            : "absolute z-0 opacity-0"
        )}
      ></div>
      <div
        className={`fixed z-40 right-0 top-0 bottom-0 w-2/3 bg-white dark:bg-card-dark shadow-xl transform transition-transform duration-500 ease-in-out ${viewerClass}`}
      >
        <div>{content}</div>
        <div className="h-full flex items-center absolute left-0 top-0">
          <CollapseButton collapsed={isOpen} onCollapse={closeViewer} />
        </div>
      </div>
    </>
  );
};

export default ContextViewer;
