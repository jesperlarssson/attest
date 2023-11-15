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

interface AuthContextType {
  user: UserType | null;
  login: (employmentId: string, pincode: string) => Promise<UserType>;
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
  const [user, setUser] = useState<UserType | null>(null);
  const router = useRouter();

  useEffect(() => {
    // TODO: Replace with actual user authentication logic with Infor M3 API
    const checkUserAuthentication = async () => {
      // Logic to check if the user is authenticated
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        //setUser(JSON.parse(savedUser));
        const user = JSON.parse(savedUser);
        login(user.employmentId, user.pincode);
      }
    };

    checkUserAuthentication();
  }, []);
  const login = async (employmentId: string, pincode: string) => {
    // TODO: Replace with actual login logic with Infor M3 API

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          employmentId,
          pincode,
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const userData = await response.json();
      const user = { employmentId: userData.employmentId };
      setUser(user);
      console.log(user);
      localStorage.setItem("user", JSON.stringify(user));
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
