"use client";
// components/Footer.tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white text-gray-600 body-font">
      <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
        <Link href="/">
          <div className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900 cursor-pointer">
            <Image
              src="/images/meridion.png"
              alt="Meridion"
              width={200}
              height={40}
              className="w-32"
            />
          </div>
        </Link>
        <p className="text-sm text-gray-500 sm:ml-6 sm:mt-0 mt-4">© {new Date().getFullYear()} Meridion —
          <Link href="https://meridion.se/">
            <span className="text-gray-600 ml-1 cursor-pointer">Meridion website</span>
          </Link>
        </p>
        <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
          <Link href="/terms">
            <span className="text-gray-500 cursor-pointer">Terms of Use</span>
          </Link>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
