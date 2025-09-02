// app-sidebar.jsx (shadcn component)
import { Calendar, Home, Inbox, Search, Settings } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

// Menu items.
const items = [
  { title: "Home", url: "#", icon: Home },
  { title: "Inbox", url: "#", icon: Inbox },
  { title: "Calendar", url: "#", icon: Calendar },
  { title: "Search", url: "#", icon: Search },
  { title: "Settings", url: "#", icon: Settings },
]

export function AppSidebar() {
  return (
    <aside
      className={`bg-white border-r-2 border-gray-200 shadow-lg min-h-screen flex flex-col p-6`}
      style={{ minWidth: "260px" }}
    >
      {/* Sidebar Heading */}
      <div className="mb-6">
        <h1 className="sidebar-heading text-base font-semibold text-blue-700 tracking-wide mb-2">
          Finance Dashboard
        </h1>
        <div className="h-1 w-8 bg-blue-500 rounded mb-2"></div>
      </div>

      {/* Sidebar Navigation (example) */}
      <nav className="flex flex-col gap-4">
        <a
          href="#overview"
          className="text-lg font-medium text-gray-700 hover:text-blue-600 transition-colors px-3 py-2 rounded hover:bg-blue-50"
        >
          Overview
        </a>
        <a
          href="#reports"
          className="text-lg font-medium text-gray-700 hover:text-blue-600 transition-colors px-3 py-2 rounded hover:bg-blue-50"
        >
          Reports
        </a>
        <a
          href="#analytics"
          className="text-lg font-medium text-gray-700 hover:text-blue-600 transition-colors px-3 py-2 rounded hover:bg-blue-50"
        >
          Analytics
        </a>
        <a
          href="#settings"
          className="text-lg font-medium text-gray-700 hover:text-blue-600 transition-colors px-3 py-2 rounded hover:bg-blue-50"
        >
          Settings
        </a>
      </nav>

      {/* Optional: Add a footer or user info */}
      <div className="mt-auto pt-8 border-t border-gray-100">
        <span className="text-sm text-gray-400">© 2025 Finance Dashboard</span>
      </div>
    </aside>
  )
}

// ✅ Provide default export too (so either import style works)
export default AppSidebar;
