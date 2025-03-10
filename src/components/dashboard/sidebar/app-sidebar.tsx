"use client";

import * as React from "react";
import { SquareTerminal, GalleryVerticalEnd } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { TeamSwitcher } from "./team-switcher";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import Link from "next/link";

// Sample Data
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: " FIND IT AGAIN",
      logo: GalleryVerticalEnd,
      plan: "Find your needs",
    },
  ],
  navMain: [
    {
      title: "Product Management",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        { title: "Products", url: "/user/products" },
        { title: "Create Product", url: "/user/create-product" },
        { title: "Sales", url: "/user/sales" },
        { title: "Purchases", url: "/user/purchases" },
        { title: "Wishlist", url: "/user/wishlist" },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      collapsible="icon"
      className="bg-white/20 backdrop-blur-lg shadow-xl border border-white/10 rounded-lg transition-all duration-300 hover:bg-white/30"
      {...props}
    >
      {/* Header */}
      <SidebarHeader className="p-4">
        <Link href="/" className="hover:scale-105 transition-all">
          <TeamSwitcher teams={data.teams} />
        </Link>
      </SidebarHeader>

      {/* Main Content */}
      <SidebarContent className="px-3 py-2">
        <NavMain items={data.navMain} />
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="p-3 border-t border-white/10">
        <NavUser user={data.user} />
      </SidebarFooter>

      {/* Sidebar Rail */}
      <SidebarRail className="bg-gradient-to-b from-[#16a34a] to-[#e7995e] opacity-80 transition-all hover:opacity-100" />
    </Sidebar>
  );
}
