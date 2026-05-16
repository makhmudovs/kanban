import { useSidebarStore } from "@/app/providers/sidebar-provider";
import { useCurrentBoardStore } from "@/app/providers/current-board-provider";
import { MenuItems } from "@/app/types";
import { motion } from "framer-motion";
import { EyeOff, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export const BoardIcon = () => (
  <svg className="w-4 h-4 shrink-0" viewBox="0 0 18 16" fill="currentColor">
    <rect x="0" y="0" width="3" height="16" rx="1.5" />
    <rect x="5" y="0" width="3" height="10" rx="1.5" />
    <rect x="10" y="0" width="3" height="16" rx="1.5" />
    <rect x="15" y="0" width="3" height="6" rx="1.5" />
  </svg>
);

export function SidebarContent({
  menuItems,
  isMobile = false,
}: {
  menuItems: MenuItems[];
  isMobile?: boolean;
}) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { desktopSidebarToggle } = useSidebarStore((state) => state);
  const setBoard = useCurrentBoardStore((state) => state.setBoard);
  const pathName = usePathname();

  // Set current board from URL on mount and when pathname changes
  useEffect(() => {
    const activeItem = menuItems.find(
      (item) => pathName === `/dashboard/${item.id}`,
    );
    if (activeItem) {
      setBoard({ id: activeItem.id, userId: activeItem.userId });
    } else {
      setBoard(null);
    }
  }, [pathName, menuItems, setBoard]);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  return (
    <div className="flex flex-col h-full bg-white dark:bg-[#2b2c37] border-r border-gray-200 dark:border-[#3e3f4e]">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-8">
        <div className="flex items-end gap-1">
          <span className="block w-1.5 h-3 rounded-sm bg-[#635fc7]" />
          <span className="block w-1.5 h-5 rounded-sm bg-[#635fc7]" />
          <span className="block w-1.5 h-7 rounded-sm bg-[#635fc7]" />
        </div>
        <span className="text-2xl font-bold tracking-tight text-black dark:text-white">
          kanban
        </span>
      </div>

      <p className="text-xs font-bold tracking-[2.5px] uppercase text-gray-500 px-6 pb-3">
        All Boards ({menuItems?.length || 0})
      </p>

      <nav className="flex-1 overflow-y-auto pr-5">
        <Link
          href="/dashboard"
          onClick={() => setBoard(null)}
          className={`flex items-center gap-3 w-full px-6 py-3.5 rounded-r-full text-sm font-semibold mb-1 transition-colors capitalize ${
            pathName === "/dashboard"
              ? "bg-[#635fc7] text-white"
              : "text-gray-500 hover:text-[#635fc7] hover:bg-[#635fc7]/10"
          }`}
        >
          <BoardIcon />
          Overview
        </Link>

        {menuItems?.map((item) => (
          <Link
            key={item.id}
            href={`/dashboard/${item.id}`}
            onClick={() => setBoard({ id: item.id, userId: item.userId })}
            className={`flex items-center gap-3 w-full px-6 py-3.5 rounded-r-full text-sm font-semibold mb-1 transition-colors capitalize ${
              pathName === `/dashboard/${item.id}`
                ? "bg-[#635fc7] text-white"
                : "text-gray-500 hover:text-[#635fc7] hover:bg-[#635fc7]/10"
            }`}
          >
            <BoardIcon />
            {item.name}
          </Link>
        ))}

        <Link
          href="/dashboard/board/new"
          className={`flex items-center gap-3 w-full px-6 py-3.5 rounded-r-full text-sm font-semibold mb-1 transition-colors capitalize ${
            pathName === "/dashboard/board/new"
              ? "bg-[#635fc7] text-white"
              : "text-gray-500 hover:text-[#635fc7] hover:bg-[#635fc7]/10"
          }`}
        >
          <BoardIcon />+ Add new board
        </Link>
      </nav>

      {/* Footer / Theme Toggle */}
      <div className="px-4 pb-6 pt-4">
        <div className="flex items-center justify-center gap-5 bg-gray-100 dark:bg-[#20212c] rounded-lg py-3 mb-4">
          <Sun className="w-4 h-4" />
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="w-10 h-5 bg-[#635fc7] rounded-full relative transition-colors"
          >
            {mounted && (
              <motion.span
                animate={{ x: theme === "dark" ? 20 : 2 }}
                initial={false}
                className="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow"
              />
            )}
          </button>
          <Moon className="w-4 h-4" />
        </div>

        {!isMobile && (
          <button
            onClick={() => desktopSidebarToggle(false)}
            className="flex items-center gap-2 text-gray-500 hover:text-[#635fc7] text-sm font-semibold transition-colors w-full px-2"
          >
            <EyeOff className="w-4 h-4" />
            Hide Sidebar
          </button>
        )}
      </div>
    </div>
  );
}
