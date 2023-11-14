import React from "react";
import Link from "next/link";

type SidebarLinkProps = {
  icon: React.ReactNode; // Assuming icon is passed as a React component
  label: string;
  href: string;
  expanded: boolean;
};

const SidebarLink: React.FC<SidebarLinkProps> = ({
  icon,
  label,
  href,
  expanded,
}) => {
  return (
    <Link
      className="hover:bg-black hover:bg-opacity-10 p-2 flex justify-center items-center gap-4 rounded transition duration-150 ease-in-out text-sm"
      href={href}
    >
      <span   className={`${
          expanded ? "" : "w-full ml-4"
        }`}>{icon}</span>

      <span
        className={`${
          expanded ? "opacity-80 w-full" : "opacity-0 w-0"
        } transition-opacity duration-150`}
      >
        {label}
      </span>
    </Link>
  );
};

export default SidebarLink;
