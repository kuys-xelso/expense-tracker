"use client"

import * as React from "react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { 
  GalleryVerticalEndIcon, 
  AudioLinesIcon, 
  LayoutDashboardIcon, 
  ArrowRightLeftIcon, 
  TagsIcon, 
  Settings2Icon, 
  WalletIcon, 
  LandmarkIcon, 
  CreditCardIcon 
} from "lucide-react"

// This is sample data.
const data = {
  user: {
    name: "User",
    email: "user@example.com",
    avatar: "/avatars/user.jpg",
  },
  teams: [
    {
      name: "Personal",
      logo: (
        <GalleryVerticalEndIcon
        />
      ),
      plan: "Free",
    },
    {
      name: "Family",
      logo: (
        <AudioLinesIcon
        />
      ),
      plan: "Pro",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: (
        <LayoutDashboardIcon
        />
      ),
      isActive: true,
      items: [
        {
          title: "Overview",
          url: "/dashboard/overview",
        },
        {
          title: "Analytics",
          url: "/dashboard/analytics",
        },
      ],
    },
    {
      title: "Transactions",
      url: "#",
      icon: (
        <ArrowRightLeftIcon
        />
      ),
      items: [
        {
          title: "All Transactions",
          url: "#",
        },
        {
          title: "Income",
          url: "#",
        },
        {
          title: "Expenses",
          url: "#",
        },
      ],
    },
    {
      title: "Categories",
      url: "#",
      icon: (
        <TagsIcon
        />
      ),
      items: [
        {
          title: "Manage Categories",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: (
        <Settings2Icon
        />
      ),
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Preferences",
          url: "#",
        },
        {
          title: "Accounts",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Cash",
      url: "#",
      icon: (
        <WalletIcon
        />
      ),
    },
    {
      name: "Bank Account",
      url: "#",
      icon: (
        <LandmarkIcon
        />
      ),
    },
    {
      name: "Credit Card",
      url: "#",
      icon: (
        <CreditCardIcon
        />
      ),
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
