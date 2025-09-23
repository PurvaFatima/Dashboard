// app-sidebar.jsx
import { Home, Settings, BookA, LogOut } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar"
import { onAuthStateChanged, signOut } from "firebase/auth"
import { useEffect, useState } from "react"
import { auth } from "../firebase"
import LogoLight from "../assets/2.png"
import LogoDark from "../assets/1.png"

// Sidebar component with Firebase auth integration

export function AppSidebar() {
  const [email, setEmail] = useState(null)
  const navigate = useNavigate()

  // ✅ Track Firebase auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setEmail(user?.email || null)
    })
    return () => unsubscribe()
  }, [])

  // ✅ Logout
  const handleLogout = async () => {
    try {
      await signOut(auth)
      console.log("✅ User signed out successfully")
      navigate("/")
    } catch (error) {
      console.error("❌ Error logging out:", error.message)
    }
  }

  const items = [
    { title: "Dashboard", url: "/dashboard", icon: Home },
    { title: "Expenditure", url: "/dashboard/expenditure", icon: BookA },
    { title: "Settings", url: "/dashboard/settings", icon: Settings },
  ]

  return (
    <Sidebar
      collapsible="icon"
      className="rounded-2xl"
      /* rounded corners for modern look */
    >
      {/* --- HEADER --- */}
      <SidebarHeader
        className="flex items-center text-black dark:text-amber-100 justify-center py-4 bg-gradient-to-r from-blue-400 to-75% shadow-md"
        /* CHANGED: header kept gradient but explicitly ensured white text and shadow for contrast */
      >
        {/* Light Logo */}
        <img
    src={LogoLight}
    alt="App Logo"
    className="
      object-contain transition-all duration-300
      h-15 w-auto
      group-data-[collapsible=icon]:h-8 group-data-[collapsible=icon]:w-8
      dark:hidden 
    "
  />

  {/* Dark Logo */}
  <img
    src={LogoDark}
    alt="App Logo"
    className="
      hidden dark:block object-contain transition-all duration-300
      h-15 w-auto
      group-data-[collapsible=icon]:h-8 group-data-[collapsible=icon]:w-8
    "
  />
      </SidebarHeader>

      {/* --- MAIN CONTENT --- */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className="text-white hover:bg-white/10 hover:text-pink-200 transition dark:!text-white"
                    /* CHANGED: force white text for menu items, subtle hover bg & hover text for feedback */
                  >
                    <Link to={item.url} className="flex items-center gap-3">
                      <item.icon className="w-5 h-5 text-current" /* CHANGED: icon inherits text color */ />
                      <span className="group-data-[collapsible=icon]:hidden">
                        {item.title}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* --- FOOTER --- */}
      <SidebarFooter
        className="flex flex-col items-center sm:items-start gap-3 p-4 border-t border-white/20"
        /* CHANGED: subtle border (white/20) for separation that works in both modes */
      >
        
        {/* Avatar & Email */}
        <div className="flex flex-row items-center gap-2">
          <div
            className="h-10 w-10 rounded-full bg-black dark:bg-amber-100 text-blue-500 flex items-center justify-center text-lg font-bold shadow"
            /* CHANGED: avatar bg white and purple text to keep contrast and brand color */
          >
            {email ? email.charAt(0).toUpperCase() : "U"}
          </div>
          <p
            className="text-sm  text-black dark:text-white font-medium truncate group-data-[collapsible=icon]:hidden"
            /* CHANGED: email text set to white/80 for readable contrast on sidebar bg */
          >
            {email || "Guest"}
          </p>
        </div>

        {/* Logout Button */}
        <SidebarMenuItem>
          <SidebarMenuButton
            onClick={handleLogout}
            className="flex items-center gap-2 cursor-pointer text-white hover:text-blue-400 transition"
            /* CHANGED: logout uses same color / hover pattern as other menu items */
          >
            <LogOut className="w-5 h-5 text-current" /* CHANGED: icon inherits text color */ />
            <span className="group-data-[collapsible=icon]:hidden">Logout</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarFooter>
    </Sidebar>
  )
}

export default AppSidebar
