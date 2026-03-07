import { ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/lib/auth";
import { 
  LayoutDashboard, 
  ScanLine, 
  Truck, 
  Leaf, 
  Gift, 
  LogOut,
  Menu,
  X
} from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Scan E-Waste", href: "/scan", icon: ScanLine },
  { name: "My Pickups", href: "/pickups", icon: Truck },
  { name: "My Impact", href: "/impact", icon: Leaf },
  { name: "Rewards", href: "/rewards", icon: Gift },
];

export function AppLayout({ children }: { children: ReactNode }) {
  const { user, logout } = useAuth();
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const SidebarContent = () => (
    <>
      <div className="p-6">
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl emerald-gradient flex items-center justify-center shadow-lg shadow-primary/30">
            <Leaf className="text-white w-6 h-6" />
          </div>
          <span className="text-2xl font-bold font-display tracking-tight text-foreground">
            EcoCycle
          </span>
        </Link>
      </div>

      <nav className="flex-1 px-4 space-y-2 mt-4">
        {NAV_LINKS.map((link) => {
          const isActive = location === link.href;
          return (
            <Link 
              key={link.name} 
              href={link.href}
              className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 ${
                isActive 
                  ? "bg-primary/10 text-primary font-semibold shadow-sm" 
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <link.icon className={`w-5 h-5 ${isActive ? "text-primary" : ""}`} />
              {link.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 mt-auto">
        <div className="bg-primary/5 rounded-2xl p-4 border border-primary/10">
          <div className="flex items-center gap-3 mb-4">
            <img 
              src={user?.photoURL || ""} 
              alt={user?.displayName} 
              className="w-10 h-10 rounded-full border-2 border-primary/20"
            />
            <div className="overflow-hidden">
              <p className="text-sm font-semibold truncate text-foreground">{user?.displayName}</p>
              <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
            </div>
          </div>
          <button 
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-sans text-foreground">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-72 bg-white border-r border-border shadow-sm fixed h-full z-10">
        <SidebarContent />
      </aside>

      {/* Mobile Header & Menu */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-md border-b border-border z-50 flex items-center justify-between px-4">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg emerald-gradient flex items-center justify-center">
            <Leaf className="text-white w-5 h-5" />
          </div>
          <span className="text-xl font-bold font-display text-foreground">EcoCycle</span>
        </Link>
        <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 text-foreground">
          <Menu className="w-6 h-6" />
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="fixed inset-0 z-50 flex md:hidden"
          >
            <div className="w-4/5 max-w-sm bg-white h-full shadow-2xl flex flex-col">
              <div className="p-4 flex justify-end">
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-foreground">
                  <X className="w-6 h-6" />
                </button>
              </div>
              <SidebarContent />
            </div>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex-1 bg-black/20 backdrop-blur-sm"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 md:pl-72 pt-16 md:pt-0 min-h-screen flex flex-col">
        <div className="flex-1 w-full max-w-6xl mx-auto p-4 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
