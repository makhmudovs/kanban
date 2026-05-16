import { AnimatePresence, motion } from "framer-motion";
import { MenuIcon } from "lucide-react";
import { BoardIcon } from "../sidebar/sidebar-content";
import { useSidebarStore } from "@/app/providers/sidebar-provider";
import AccountInfo from "./account-info";
import { User } from "better-auth";
import { usePathname } from "next/navigation";
import { useCurrentBoardStore } from "@/app/providers/current-board-provider";
import BoardActions from "../board/board-actions";
import Link from "next/link";

export default function Header({ user }: { user: User }) {
  const { desktopSidebarOpen, desktopSidebarToggle, mobileSidebarToggle } =
    useSidebarStore((state) => state);

  const board = useCurrentBoardStore((state) => state.board);
  const pathName = usePathname();
  return (
    <header className="flex items-center justify-between px-4 md:px-7 py-5 bg-white dark:bg-[#2b2c37] border-b border-gray-200 dark:border-[#3e3f4e] min-h-18 transition-colors">
      <div className="flex items-center gap-3">
        <button
          className="md:hidden flex items-center gap-3"
          onClick={() => mobileSidebarToggle(true)}
        >
          <MenuIcon className="w-4 h-4 text-[#635fc7]" />
        </button>
        <div className="hidden md:flex items-center gap-3">
          <AnimatePresence>
            {!desktopSidebarOpen && (
              <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                onClick={() => desktopSidebarToggle(true)}
                className="bg-[#635fc7] p-3 rounded-r-full fixed left-0 bottom-8 z-20"
              >
                <BoardIcon />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="flex items-center gap-4 justify-center">
        {pathName !== "/dashboard" && pathName !== "/dashboard/add" && (
          <Link
            href={`/dashboard/task/add-new/${board?.id}`}
            className="bg-[#635fc7] hover:bg-[#a8a4ff] text-white px-6 py-3 rounded-full font-bold text-sm"
          >
            + Add New Task
          </Link>
        )}

        <AccountInfo user={user} />

        {pathName !== "/dashboard" && pathName !== "/dashboard/add" && (
          <BoardActions />
        )}
      </div>
    </header>
  );
}
