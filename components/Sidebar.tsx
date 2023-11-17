"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import SidebarLink from "./SidebarLink";
import CollapseButton from "./CollapseButton";

interface SidebarProps {
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  isSidebarOpen,
  onToggleSidebar,
}) => {
  const { user, logout } = useAuth();

  return (
    <aside
      className={`absolute z-20 sm:fixed border-r bg-card-light border-edge-light dark:bg-card-dark dark:border-edge-dark shadow-md transition-all duration-500 ease-in-out ${
        isSidebarOpen
          ? "w-64 p-4"
          : "w-20 p-2 -translate-x-full sm:translate-x-0 "
      } h-full fixed inset-y-0 left-0 z-10 `}
    >
      <div className="flex flex-col  justify-between h-full">
        <div className="absolute right-0 translate-y-1/2 h-full translate-x-8 z-20">
          <CollapseButton
            collapsed={!isSidebarOpen}
            onCollapse={() => onToggleSidebar()}
          />
        </div>
        {/* Branding */}
        <div>
          <Link
            className="flex flex-col text-3xl font-bold hover:text-gray-300 transition duration-150 ease-in-out my-8"
            href="/"
          >
            <span
              className={`${
                isSidebarOpen ? "rotate-0" : "rotate-90"
              } transition-all ease-in-out`}
            >
              MATE
            </span>
            {isSidebarOpen && (
              <span
                className={`text-xs font-light text-accent-light dark:text-accent-dark`}
              >
                Meridion Attestation Tool Etc
              </span>
            )}
          </Link>

          {/* Navigation Links */}
          <nav className="flex flex-col space-y-4 mt-20">
            <SidebarLink
              icon={<InvoiceIcon />}
              label="Invoices"
              href="/"
              expanded={isSidebarOpen}
            />
            <SidebarLink
              icon={<InvoiceIcon />}
              label="SQL"
              href="/sql"
              expanded={isSidebarOpen}
            />
            <SidebarLink
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              }
              label="Settings"
              href="/settings"
              expanded={isSidebarOpen}
            />
          </nav>
        </div>
        {/* User and Logout */}
        {user && isSidebarOpen && (
          <div className="pt-10 text-sm">
            <div className="flex flex-col items-center">
              <Link href="/user" className="mb-4 p-4 bg-black bg-opacity-10 hover:bg-opacity-20 rounded-md w-full text-center text-xs shadow-inner flex flex-col">
                <span>Logged in as:</span> <strong className="tracking-wider">{user.name}</strong>
              </Link>
              <button
                onClick={() => logout()}
                className="underline text-sm   py-2 px-4 rounded transition duration-150 ease-in-out w-full"
              >
                Sign out
              </button>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;

const InvoiceIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <rect
        x="5"
        y="3"
        width="14"
        height="18"
        rx="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
};
