"use client";

import React from "react";
import Header from "@/app/components/header/header";

import { User } from "better-auth";
import { MenuItems } from "@/app/types";
import Sidebar from "../sidebar/sidebar";

export default function Cockpit({
  menuItems,
  user,
  children,
}: Readonly<{
  menuItems: MenuItems[];
  user: User;
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-[#20212c] text-black dark:text-white font-sans transition-colors duration-300">
      <Sidebar menuItems={menuItems} />

      <div className="flex-1 flex flex-col overflow-hidden relative">
        {/* Header */}
        <Header user={user} />

        {/* Board */}
        <main className="flex-1 overflow-x-auto p-4 md:p-6 bg-gray-50 dark:bg-[#20212c]">
          {children}
        </main>
      </div>
    </div>
  );
}
