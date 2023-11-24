"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { NextPage } from "next";
import { User } from "@/types";

interface AuthContextType {
  user: User | null;
  login: (employmentId: string, pincode: string) => Promise<User>;
  logout: () => void;
}

interface UserType {
  employmentId: string;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: NextPage<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    // TODO: Replace with actual user authentication logic with Infor M3 API
    const checkUserAuthentication = async () => {
      // Logic to check if the user is authenticated
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      } else {
        router.push("/login");   
      }
      
    };

    checkUserAuthentication();
  }, []);
  const login = async (employmentId: string, pincode: string) => {
    try {
      const response = await fetch("/api/auth/m3/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          employmentId,
          divi: "CCC",
          pincode,
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const userData = await response.json();
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      router.push("/");
      return userData;
    } catch (error) {
      throw new Error("User is missing");
    }
  };

  const logout = () => {
    // Clear user from state
    setUser(null);

    // Remove from local storage
    localStorage.removeItem("user");

    // Redirect to the login page
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext) as AuthContextType;
