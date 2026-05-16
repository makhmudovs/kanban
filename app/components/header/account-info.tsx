"use client";

import { AnimatePresence, motion } from "framer-motion";
import { LogOut, Heart, Layers, Rocket, ChevronRight } from "lucide-react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { authClient } from "@/app/lib/auth-client";
import { useRouter } from "next/navigation";
import { useConfirmDialogStore } from "@/app/providers/confirm-dialog-provider";
import { User } from "better-auth";

export default function AccountInfo({ user }: { user: User }) {
  const router = useRouter();
  const confirm = useConfirmDialogStore((s) => s.confirm);

  const handleSignOut = () => {
    confirm({
      title: "Log out",
      description: "Are you sure you want to log out of your account?",
      variant: "danger",
      confirmLabel: "Log out",
      cancelLabel: "Stay logged in",
      onConfirm: () => {
        authClient.signOut({
          fetchOptions: {
            onSuccess: () => router.push("/login"),
          },
        });
      },
    });
  };

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "?";

  return (
    <div className="relative">
      <Menu>
        {({ open }) => (
          <>
            <MenuButton className="flex items-center gap-2 rounded-full focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all">
              {user?.image ? (
                <img
                  className="w-9 h-9 rounded-full ring-2 ring-violet-500/30 object-cover"
                  src={user.image}
                  alt={user.name ?? "User"}
                />
              ) : (
                <div className="w-9 h-9 rounded-full ring-2 ring-violet-500/30 bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold">
                  {initials}
                </div>
              )}
            </MenuButton>

            <AnimatePresence>
              {open && (
                <MenuItems
                  transition
                  static
                  as={motion.div}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  anchor="bottom end"
                  className="z-50 mt-2 w-60 rounded-2xl border border-white/10 bg-white dark:bg-[#2B2C37] backdrop-blur-xl shadow-2xl shadow-black/40 overflow-hidden focus:outline-none"
                >
                  {/* User info header */}
                  <div className="px-4 py-3.5 border-b border-gray-100 dark:border-white/8">
                    <div className="flex items-center gap-3">
                      {user?.image ? (
                        <img
                          className="w-10 h-10 rounded-full object-cover"
                          src={user.image}
                          alt={user.name ?? "User"}
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-linear-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                          {initials}
                        </div>
                      )}
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-gray-700 dark:text-white truncate">
                          {user?.name ?? "Loading..."}
                        </p>
                        <p className="text-xs truncate text-gray-700 dark:text-white">
                          {user?.email ?? ""}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Menu items */}
                  <div className="py-1.5">
                    {[
                      { icon: Heart, label: "My likes" },
                      { icon: Rocket, label: "Pro version", badge: true },
                    ].map(({ icon: Icon, label, badge }) => (
                      <MenuItem key={label}>
                        <button className="w-full flex items-center justify-between px-4 py-2.5 text-sm text-gray-500 dark:text-gray-300 hover:text-gray-400 dark:hover:text-white hover:bg-white/5 transition-colors group">
                          <span className="flex items-center gap-3">
                            <Icon className="w-4 h-4 text-gray-500 group-hover:text-violet-400 transition-colors" />
                            {label}
                          </span>
                          {badge && (
                            <ChevronRight className="w-3.5 h-3.5 text-gray-600 group-hover:text-gray-400 transition-colors" />
                          )}
                        </button>
                      </MenuItem>
                    ))}
                  </div>

                  {/* Sign out */}
                  <div className="py-1.5 border-t border-gray-100 dark:border-white/8">
                    <MenuItem>
                      <button
                        onClick={handleSignOut}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors group"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign out
                      </button>
                    </MenuItem>
                  </div>
                </MenuItems>
              )}
            </AnimatePresence>
          </>
        )}
      </Menu>
    </div>
  );
}
