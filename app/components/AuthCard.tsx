import React from "react";

interface AuthCardProps {
  title: string;
  children: React.ReactNode;
}

import { KeySquare, User } from "lucide-react";

const AuthCard: React.FC<AuthCardProps> = ({ title, children }) => {
  return (
    <div className="bg-white p-8 md:p-12 rounded-lg shadow-xl w-full max-w-2xl relative">
      <div className="absolute -top-7 left-12 w-14 h-14 bg-linear-to-br from-purple-500 to-pink-500 rounded-full shadow-lg flex items-center justify-center">
        <span className="text-white text-3xl font-light">
          {title === "Login" ? (
            <KeySquare className="h-8 w-8" />
          ) : (
            <User className="h-8 w-8" />
          )}
        </span>
      </div>

      <h1 className="text-3xl font-extrabold text-[#3a4374] mt-6 mb-10 tracking-tight">
        {title}
      </h1>

      {children}
    </div>
  );
};

export default AuthCard;
