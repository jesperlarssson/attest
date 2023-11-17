// "use client";
// import React from "react";
// import Link from "next/link";
// import { useAuth } from "@/contexts/AuthContext";
// import { usePathname } from 'next/navigation'

// const Navbar: React.FC = () => {
//   const { user, logout } = useAuth();
//   const pathname = usePathname();

//    // Check if the current route is /login
//    if (pathname === '/login') {
//     return null; // Don't render the Navbar when on /login route
//   }

//   return (
//     <nav className="fixed top-0 left-0 w-full bg-white text-gray-800 shadow-md px-8 py-4">
//       <div className="container w-full mx-auto flex justify-between items-center">
//         <div className="flex items-center">
//           {/* Home Link */}
//           <Link
//             href="/"
//             className="text-xl font-bold hover:text-gray-600 transition duration-150 ease-in-out mr-4 flex flex-col items-start"
//           >
//             <span className="tracking-wider"> MATE </span>
//             <span className="text-xs font-light -mt-1">Meridion Attestation Tool</span>
//           </Link>
//         </div>
//         <div className="flex items-center gap-4">
//           {/* Notifications Link */}
//           <Link
//             href="/settings"
//             className="h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer hover:text-gray-800 hover:bg-gray-400  hover:duration-300 hover:ease-linear focus:bg-white"
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-6 w-6"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 stroke-linecap="round"
//                 stroke-linejoin="round"
//                 stroke-width="2"
//                 d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
//               />
//             </svg>
//           </Link>

//           {/* Settings Link */}
//           <Link
//             href="/settings"
//             className="h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer hover:text-gray-800 hover:bg-gray-400  hover:duration-300 hover:ease-linear focus:bg-white"
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-6 w-6"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 stroke-linecap="round"
//                 stroke-linejoin="round"
//                 stroke-width="2"
//                 d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
//               />
//               <path
//                 stroke-linecap="round"
//                 stroke-linejoin="round"
//                 stroke-width="2"
//                 d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
//               />
//             </svg>
//           </Link>
//           {/* User Icon Button */}
//           {user && (
//             <div className="relative group">
//               <button className="h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer hover:text-gray-800 hover:bg-gray-400  hover:duration-300 hover:ease-linear focus:bg-white">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-6 w-6"
//                   viewBox="0 0 20 20"
//                   fill="currentColor"
//                 >
//                   <path
//                     fill-rule="evenodd"
//                     d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
//                     clip-rule="evenodd"
//                   />
//                 </svg>
//               </button>
//               <div className="absolute top-12 opacity-0 group-hover:opacity-100 transition-all ease-in-out w-32 bg-gray-700 rounded py-1 px-2 -translate-x-6 pointer-events-none">
//                 <span className=" text-white text-xs ">
//                   Logged in as:
//                   <br /> <strong>{user.employmentId}</strong>
//                 </span>
//               </div>
//             </div>
//           )}
//           {/* Logout Button */}
//           <button
//             onClick={() => logout()}
//             className="border border-gray-500 hover:bg-gray-700 hover:text-white text-gray-700 font-bold py-2 px-6 rounded-full transition duration-150 ease-in-out text-sm"
//           >
//             Logout
//           </button>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

// //<span className="text-xl font-bold ">Invoice Attestation System</span>

import React from 'react'

const Navbar = () => {
  return (
    <div>Navbar</div>
  )
}

export default Navbar