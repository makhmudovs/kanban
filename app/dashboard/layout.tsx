import type { Metadata } from "next";
import Cockpit from "@/app/components/cockpit/cockpit";
import { auth } from "../lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getMenuItems } from "../lib/actions/data";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "kanban dashboard",
};

export default async function Layout({
  modal,
  children,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  const menuItems = await getMenuItems();
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) redirect("/login");

  return (
    <Cockpit menuItems={menuItems} user={session?.user}>
      {children}
      {modal}
    </Cockpit>
  );
}
