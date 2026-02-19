import { Home, History, Plus, User, Settings } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { path: "/", label: "Home", icon: Home },
  { path: "/medical-history", label: "History", icon: History },
  { path: "/add", label: "Add", icon: Plus },
  { path: "/profile", label: "Profile", icon: User },
  { path: "/settings", label: "Settings", icon: Settings },
];

export function BottomNav() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 backdrop-blur-2xl bg-black/10 dark:bg-black/20 border-t border-white/10 dark:border-white/5">
      <div className="flex items-center justify-around py-3 px-4">
        {navItems.map(({ path, label, icon: Icon }) => {
          const isActive = location.pathname === path;
          return (
            <Link
              key={path}
              to={path}
              className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition ${
                isActive
                  ? "text-primary"
                  : "text-foreground/60 hover:text-foreground"
              }`}
              title={label}
            >
              <Icon size={24} />
              <span className="text-xs font-medium hidden sm:inline">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
