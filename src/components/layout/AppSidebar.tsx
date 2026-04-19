import {
  LayoutDashboard,
  Upload,
  FileText,
  Mail,
  Settings,
  Shield,
  Sparkles,
  LogOut,
  Building2,
  Users,
  Cog,
} from "lucide-react";
import appIcon from "@/assets/app-icon.png";
import { NavLink } from "@/components/NavLink";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import { useAuth } from "@/contexts/AuthContext";
import type { UserRole } from "@/contexts/AuthContext";

interface NavItem {
  title: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
  roles: UserRole[];
}

const mainItems: NavItem[] = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard, roles: ["superadmin", "admin", "employee"] },
  { title: "Companies", url: "/companies", icon: Building2, roles: ["superadmin"] },
  { title: "Meetings", url: "/meetings", icon: FileText, roles: ["superadmin", "admin", "employee"] },
  { title: "Upload Meeting", url: "/upload", icon: Upload, roles: ["admin", "employee"] },
  { title: "Users", url: "/users", icon: Users, roles: ["superadmin", "admin"] },
  { title: "AI Insights", url: "/insights", icon: Sparkles, roles: ["admin", "employee"] },
  { title: "Email Editor", url: "/email-editor", icon: Mail, roles: ["admin", "employee"] },
];

const secondaryItems: NavItem[] = [
  { title: "Email Templates", url: "/email-templates", icon: FileText, roles: ["superadmin"] },
  { title: "System Settings", url: "/system-settings", icon: Shield, roles: ["superadmin"] },
  { title: "Company Settings", url: "/company-settings", icon: Cog, roles: ["admin"] },
  { title: "Settings", url: "/settings", icon: Settings, roles: ["admin", "employee"] },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const isActive = (path: string) => location.pathname === path;

  const role = user?.role || "employee";

  const visibleMain = mainItems.filter((item) => item.roles.includes(role));
  const visibleSecondary = secondaryItems.filter((item) => item.roles.includes(role));

  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "??";

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const roleLabel = role === "superadmin" ? "Super Admin" : role === "admin" ? "Admin" : "Employee";

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border px-4 py-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg overflow-hidden">
            <img src={appIcon} alt="MeetingMind logo" className="h-full w-full object-cover" />
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="text-sm font-bold tracking-tight text-gray-900">
                MeetingMind
              </span>
              {user?.companyName && (
                <span className="text-[11px] text-sidebar-muted truncate max-w-[140px]">
                  {user.companyName}
                </span>
              )}
              {role === "superadmin" && (
                <span className="text-[11px] text-sidebar-muted">Platform</span>
              )}
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2 py-2">
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-muted text-[11px] font-semibold uppercase tracking-wider">
            Workspace
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {visibleMain.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)}>
                    <NavLink
                      to={item.url}
                      end
                      className="hover:bg-sidebar-accent"
activeClassName="font-medium"                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {visibleSecondary.length > 0 && (
          <SidebarGroup>
            <SidebarGroupLabel className="text-sidebar-muted text-[11px] font-semibold uppercase tracking-wider">
              System
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {visibleSecondary.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={isActive(item.url)}>
                      <NavLink
                        to={item.url}
                        end
                        className="hover:bg-sidebar-accent"
activeClassName="font-semibold"
                      >
                        <item.icon className="mr-2 h-4 w-4" />
                        {!collapsed && <span>{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border p-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sidebar-accent">
            <span className="text-xs font-semibold text-sidebar-accent-foreground">{initials}</span>
          </div>
          {!collapsed && (
            <div className="flex flex-1 flex-col">
              <span className="text-xs font-medium text-sidebar-accent-foreground">{user?.name || "Guest"}</span>
              <span className="text-[11px] text-sidebar-muted">{roleLabel} · {user?.plan || "Free"}</span>
            </div>
          )}
          {!collapsed && (
            <button
              onClick={handleLogout}
              className="text-sidebar-muted hover:text-sidebar-accent-foreground transition-colors"
              title="Sign out"
            >
              <LogOut className="h-4 w-4" />
            </button>
          )}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
