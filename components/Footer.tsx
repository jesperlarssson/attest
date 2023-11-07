"use client";
// components/Footer.tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Footer: React.FC = () => {
  return (
    <footer className="fixed bottom-0 left-0 w-full text-center lg:text-left ">
      <div className="container px-6 pt-6 pb-4 mx-auto flex flex-wrap flex-col md:flex-row justify-between border-t border-gray-200">
        <div className="flex justify-center md:justify-start mb-4 md:mb-0">
          {/* Your logo path here */}
          <Image
            src="/images/meridion.png"
            alt="Meridion"
            width={200} // Set the image size as per your requirement
            height={40}
            className=""
          />
        </div>
        <div className="flex flex-wrap justify-center md:justify-end items-center">
         
         <Link href="https://meridion.se/">Meridion website</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
