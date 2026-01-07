import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Receipt,
  Wallet,
  Sparkles,
  Settings,
  TrendingUp,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const navItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Transactions", url: "/transactions", icon: Receipt },
  { title: "Budgets", url: "/budgets", icon: Wallet },
  { title: "Predictions", url: "/predictions", icon: TrendingUp },
  { title: "AI Insights", url: "/insights", icon: Sparkles },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const isCollapsed = state === "collapsed";

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <div className="p-4">
          <NavLink to="/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            {!isCollapsed && (
              <span className="font-bold text-lg bg-gradient-primary bg-clip-text text-transparent">
                FinanceAI
              </span>
            )}
          </NavLink>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => {
                const isActive = location.pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={isActive}>
                      <NavLink to={item.url} className="flex items-center gap-3">
                        <item.icon className="w-5 h-5" />
                        <span>{item.title}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
