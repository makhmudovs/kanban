"use client";

import { AnimatePresence, motion } from "framer-motion";
import { LogOut, Heart, ChevronRight, EllipsisVertical } from "lucide-react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { authClient } from "@/app/lib/auth-client";
import { useRouter } from "next/navigation";
import { useConfirmDialogStore } from "@/app/providers/confirm-dialog-provider";
import { User } from "better-auth";
import { useCurrentBoardStore } from "@/app/providers/current-board-provider";
import { deleteBoard } from "@/app/lib/actions/board";
import Link from "next/link";

export default function BoardActions() {
  const confirm = useConfirmDialogStore((s) => s.confirm);
  const board = useCurrentBoardStore((state) => state.board);
  const router = useRouter();
  const handleDelete = (id: string) => {
    confirm({
      title: "Delete Board",
      description: "Are you sure you want to delete the board?",
      variant: "danger",
      confirmLabel: "Delete",
      cancelLabel: "Go back",
      onConfirm: async () => {
        const result = await deleteBoard(id);
        if (result.success) {
          router.push("/dashboard");
        }
      },
    });
  };

  if (!board) return null;

  return (
    <div className="relative">
      <Menu>
        {({ open }) => (
          <>
            <MenuButton className="flex items-center gap-2 rounded-full focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all">
              <EllipsisVertical className="" />
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
                      <div className="min-w-0">
                        <p className="text-sm font-semibold  text-gray-600 group-hover:text-gray-400  truncate">
                          board - {board?.id ?? "Loading..."}
                        </p>
                        <p className="text-xs  text-gray-600 group-hover:text-gray-400  truncate">
                          user {board?.userId ?? "-"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Menu items */}
                  <div className="py-1.5">
                    {[{ icon: Heart, label: "Edit board", badge: false }].map(
                      ({ icon: Icon, label, badge }) => (
                        <MenuItem key={label}>
                          <Link href={`/dashboard/board/edit/${board?.id}`} className="w-full flex items-center justify-between px-4 py-2.5 text-sm text-gray-500 dark:text-gray-300 hover:text-gray-400 dark:hover:text-white hover:bg-white/5 transition-colors group">
                            <span className="flex items-center gap-3">
                              <Icon className="w-4 h-4 text-gray-500 group-hover:text-violet-400 transition-colors" />
                              {label}
                            </span>
                            {badge && (
                              <ChevronRight className="w-3.5 h-3.5 text-gray-600 group-hover:text-gray-400 transition-colors" />
                            )}
                          </Link>
                        </MenuItem>
                      ),
                    )}
                  </div>

                  {/* Sign out */}
                  <div className="py-1.5 border-gray-100 dark:border-white/8">
                    <MenuItem>
                      <button
                        onClick={() => handleDelete(board?.id)}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors group"
                      >
                        <LogOut className="w-4 h-4" />
                        Delete Board
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
