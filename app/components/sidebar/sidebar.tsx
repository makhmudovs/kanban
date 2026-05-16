import { useSidebarStore } from "@/app/providers/sidebar-provider";
import { SidebarContent } from "@/app/components/sidebar/sidebar-content";

import { AnimatePresence, motion } from "framer-motion";
import { MenuItems } from "@/app/types";

export default function Sidebar({ menuItems }: { menuItems: MenuItems[] }) {
  const { desktopSidebarOpen, mobileSidebarOpen, mobileSidebarToggle } =
    useSidebarStore((state) => state);
  return (
    <>
      {/* Desktop Sidebar */}
      <AnimatePresence initial={false}>
        {desktopSidebarOpen && (
          <motion.aside
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 260, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="hidden md:flex flex-col h-screen overflow-hidden whitespace-nowrap"
          >
            <div className="w-65 h-full">
              <SidebarContent menuItems={menuItems} />
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileSidebarOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => mobileSidebarToggle(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute top-0 left-0 h-full w-70"
            >
              <SidebarContent menuItems={menuItems} isMobile />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
