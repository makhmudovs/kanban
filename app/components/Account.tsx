"use client";

import { Menu, MenuButton, MenuItem, MenuItems, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { authClient } from "@/app/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "../context/AuthContext";

// Import your avatar from the public folder
import AvatarImg from '@/public/icons/avatar.svg';

export default function AccountDropdown() {
  const router = useRouter();
  const { user } = useAuth();

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
          router.refresh();
        },
      },
    });
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      {/* Trigger Button - Mimicking the circular Vercel style */}
      <MenuButton className="group relative flex items-center justify-center rounded-full transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ad1fea] focus-visible:ring-offset-2">
        <div className="relative h-9 w-9 overflow-hidden rounded-full border-2 border-transparent group-hover:border-[#ad1fea]/50 transition-colors">
          <Image
            src={AvatarImg}
            alt={user?.name || "User account"}
            fill
            className="object-cover"
          />
        </div>
      </MenuButton>

      {/* Dropdown Menu with Animation */}
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <MenuItems className="absolute right-0 z-50 mt-3 w-64 origin-top-right bg-white rounded-lg shadow-2xl ring-1 ring-black/5 focus:outline-none overflow-hidden">
          
          {/* User Info Section - Keeps your site's color palette */}
          <div className="px-6 py-4 border-b border-[#f2f4fe] bg-[#f7f8fd]">
            <p className="text-[10px] font-bold text-[#647196] uppercase tracking-widest mb-1">
              {user?.name || "Member"}
            </p>
            <p className="text-sm font-bold text-[#3a4374] truncate">
              {user?.email}
            </p>
          </div>

          <div className="py-2">
            <MenuItem>
              {({ focus }) => (
                <Link
                  href="/profile"
                  className={`${
                    focus ? "bg-[#f2f4fe] text-[#4661e6]" : "text-[#647196]"
                  } flex w-full items-center px-6 py-3 text-sm font-bold transition`}
                >
                  View Profile
                </Link>
              )}
            </MenuItem>

            <MenuItem>
              {({ focus }) => (
                <button
                  onClick={handleLogout}
                  className={`${
                    focus ? "bg-red-50 text-[#d73737]" : "text-[#d73737]"
                  } flex w-full items-center px-6 py-3 text-sm font-bold transition`}
                >
                  Logout
                </button>
              )}
            </MenuItem>
          </div>
        </MenuItems>
      </Transition>
    </Menu>
  );
}