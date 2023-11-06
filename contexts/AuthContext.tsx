"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { NextPage } from 'next';
import { credentials } from '@/lib/dummy-backend';

interface AuthContextType {
  user: UserType | null;
  login: (employmentId: string, pincode: string) => Promise<void>;
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
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        //setUser(JSON.parse(savedUser));
        const user = JSON.parse(savedUser);
        login(user.employmentId, user.pincode)
      }
    };

    checkUserAuthentication();
  }, []);
  const login = async (employmentId: string, pincode: string) => {
    // TODO: Replace with actual login logic with Infor M3 API
    // On successful authentication:
    if (credentials.employmentID === employmentId && credentials.pincode === pincode) {
      const userData = { employmentId, pincode };
      setUser(userData);

      // Save to local storage
      localStorage.setItem('user', JSON.stringify(userData));

      // Redirect to the home page
      router.push('/');
    } else {
      // Handle login failure
      console.error('Invalid login credentials');
      // Possible user feedback: "Invalid employment ID or PIN code."
    }
  };

  const logout = () => {
    // Clear user from state
    setUser(null);

    // Remove from local storage
    localStorage.removeItem('user');

    // Redirect to the login page
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext) as AuthContextType;
