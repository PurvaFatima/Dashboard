// app-sidebar.jsx (shadcn component)
import { Home, Settings, BookA, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

// Firebase
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

export function AppSidebar() {
  const navigate = useNavigate();

  /**
   * Handles user logout via Firebase
   * Redirects back to the login page after successful sign-out
  
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login"); // redirect after logout
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };
 */

  const handleLogout = async () => {
  try {
    await signOut(auth); // wait until Firebase actually signs out
    console.log("✅ User signed out successfully");
    navigate("/login"); // only redirect after success
  } catch (error) {
    console.error("❌ Error logging out:", error.message);
  }
};
  
  // Menu items
  const items = [
    { title: "Dashboard", url: "/dashboard", icon: Home },
    { title: "Blog", url: "/blog", icon: BookA },
    { title: "Settings", url: "/settings", icon: Settings },
  ];

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url}>
                      <item.icon className="w-5 h-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}

              {/* Logout Button */}
              <SidebarMenuItem>
                <SidebarMenuButton onClick={handleLogout}>
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

// ✅ Provide default export too
export default AppSidebar;
