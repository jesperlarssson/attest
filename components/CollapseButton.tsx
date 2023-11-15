import React from "react";

// Define the props types
type CollapseButtonProps = {
  collapsed: boolean;
  onCollapse: () => void; // Define the type for the onCollapse function
};

const CollapseButton: React.FC<CollapseButtonProps> = ({
  collapsed,
  onCollapse,
}) => {
  const handleOnCollapse = () => {
    onCollapse();
  };

  return (
    <button
      className="group flex flex-col justify-center rounded-md items-center transition ease-in-out w-8 h-8 relative z-20 "
      onClick={handleOnCollapse}
    >
      <div
        className={`w-1 h-3 bg-gray-800 dark:bg-white bg-opacity-30 group-hover:bg-opacity-100 rotate-0 rounded-t-full  group-hover:h-4 group-hover:translate-y-0.5 transition ease-in-out ${
          collapsed ? "group-hover:-rotate-36 " : "group-hover:rotate-36"
        }`}
      ></div>
      <div
        className={`w-1 h-3 bg-gray-800 dark:bg-white  bg-opacity-30 group-hover:bg-opacity-100 rotate-0 rounded-b-full group-hover:-rotate-36 group-hover:h-4 group-hover:-translate-y-0.5 transition ease-in-out ${
          collapsed ? "group-hover:rotate-36" : "group-hover:-rotate-36"
        }`}
      ></div>
    </button>
  );
};

export default CollapseButton;
