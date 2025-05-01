import React from "react";
import { Home, Heart, Clock, BarChart2, User, Settings } from "lucide-react";
import Link from "next/link";

const navLinks = [
  { name: "Dashboard", href: "/donor-dashboard", icon: <Home className="w-5 h-5" /> },
  { name: "Donate", href: "/donor-dashboard/donate", icon: <Heart className="w-5 h-5" /> },
  { name: "Donation History", href: "/donor-dashboard/donation-history", icon: <Clock className="w-5 h-5" /> },
  { name: "Impact", href: "/donor-dashboard/impact", icon: <BarChart2 className="w-5 h-5" /> },
  { name: "Profile", href: "/donor-dashboard/profile", icon: <User className="w-5 h-5" /> },
  { name: "Settings", href: "/donor-dashboard/settings", icon: <Settings className="w-5 h-5" /> },
];

export function Sidebar() {
  return (
    <aside className="w-64 bg-card border-r border-border flex flex-col min-h-screen hidden md:flex">
      <div className="h-20 flex items-center justify-center border-b border-border">
        <span className="text-2xl font-bold text-primary">Ni-Swarth</span>
      </div>
      <nav className="flex-1 py-4">
        <ul className="space-y-2">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                href={link.href}
                className="flex items-center px-6 py-3 text-foreground hover:bg-accent rounded-lg transition-colors group"
              >
                <span className="mr-3 text-accent group-hover:text-primary">{link.icon}</span>
                <span className="font-medium">{link.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
} 