// Layout/DashboardLayout.jsx
import { Outlet } from "react-router-dom";
import AppSidebar from "../components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function DashboardLayout() {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-screen overflow-x-hidden">
        {/* Single sidebar instance */}
        <AppSidebar />

        {/* Main content  */}
        <main className="py-6 px-2 overflow-y-auto overflow-hidden w-full">
          <Outlet /> {/* Renders Dashboard.jsx content here */}
        </main>
      </div>
    </SidebarProvider>
  );
}