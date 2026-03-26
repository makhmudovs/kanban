"use client";

import { createContext, useContext, ReactNode } from "react";

// Use the User type we discussed earlier
type User = {
  id: string;
  name: string;
  email: string;
  image?: string | null;
};

interface AuthContextType {
  user: User | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ 
  children, 
  user 
}: { 
  children: ReactNode; 
  user: User | null; 
}) {
  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook for easy access
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}