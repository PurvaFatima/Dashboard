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
    { title: "Blog", url: "/dashboard/blog", icon: BookA },
    { title: "Settings", url: "/dashboard/settings", icon: Settings },
  ]

  return (
    <Sidebar collapsible="icon" variant="floating" className="rounded-2xl">
      {/* --- HEADER --- */}
      <SidebarHeader className="flex items-center justify-center py-4 bg-gradient-to-r from-purple-400 to-pink-300 text-white shadow-md">
        {/* Icon visible always, text hidden when collapsed */}
        <Home className="w-6 h-6" />
        <h2 className="hidden group-data-[collapsible=icon]:hidden sm:inline text-lg font-bold tracking-wide ml-2">
          My Dashboard
        </h2>
      </SidebarHeader>

      {/* --- MAIN CONTENT --- */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url}>
                      <item.icon className="w-5 h-5" />
                      {/* Hide text when collapsed */}
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
      <SidebarFooter className="flex flex-col items-center sm:items-start gap-2 p-4 border-t">
        
        {/* Avatar & Email */}
        <div className="flex flex-col items-center gap-2">
          <div className="h-10 w-10 rounded-full bg-purple-600 text-white flex items-center justify-center text-lg font-bold">
            {email ? email.charAt(0).toUpperCase() : "U"}
          </div>
          <p className="text-sm text-gray-700 font-medium truncate group-data-[collapsible=icon]:hidden">
            {email || "Guest"}
          </p>
        </div>

        {/* Links - hidden when collapsed */}
        <div className="flex flex-col items-center gap-1 text-xs text-gray-500 group-data-[collapsible=icon]:hidden">
          <a href="#" className="hover:text-purple-600 transition">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-purple-600 transition">
            Contact Us
          </a>
        </div>

        {/* Logout Button */}
        <SidebarMenuItem>
          <SidebarMenuButton
            onClick={handleLogout}
            className="flex items-center gap-2 cursor-pointer text-white hover:text-red-400"
          >
            <LogOut className="w-5 h-5" />
            <span className="group-data-[collapsible=icon]:hidden">Logout</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarFooter>
    </Sidebar>
  )
}

export default AppSidebar
