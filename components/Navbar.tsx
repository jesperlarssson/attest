"use client";
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white text-gray-800 shadow-md px-8 py-8 flex justify-between items-center ">
      <span className="text-xl font-bold tracking-wider">ATTEST</span>
      <div className='flex gap-4 items-center'>
        {user && (
          <span className="hidden sm:block mr-4">
            Logged in as: <strong>{user.employmentId}</strong>
          </span>
        )}
        <button
          onClick={() => logout()}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-150 ease-in-out"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
