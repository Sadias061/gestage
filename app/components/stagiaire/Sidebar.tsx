"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  Inbox,
  User,
  Calendar,
  Search,
  BarChart2,
  Folder,
  Settings,
} from "lucide-react";
import React from "react";

export default function SidebarStagiaire() {
  const [open, setOpen] = useState(true);
  const pathname = usePathname();
  const [imgError, setImgError] = useState(false);

  type NavLink = {
    href: string;
    label: string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    gap?: boolean;
  };
  const navLinks: NavLink[] = [
    { href: "/stagiaire", label: "Accueil", icon: LayoutDashboard },
    { href: "/stagiaire/inbox", label: "Inbox", icon: Inbox },
    { href: "/stagiaire/accounts", label: "Accounts", icon: User, gap: true },
    { href: "/stagiaire/schedule", label: "Schedule", icon: Calendar },
    { href: "/stagiaire/search", label: "Search", icon: Search },
    { href: "/stagiaire/analytics", label: "Analytics", icon: BarChart2 },
    { href: "/stagiaire/files", label: "Files", icon: Folder, gap: true },
    { href: "/stagiaire/settings", label: "Setting", icon: Settings },
  ];

  return (
    <div
      className={`${
        open ? "w-64 border-r rounded-xl" : "w-24 border-r rounded-xl"
      }  h-screen p-5 pt-8 relative duration-300`}
    >
      {/* Toggle Button */}
      <button
        onClick={() => setOpen(!open)}
        aria-label="Toggle sidebar"
        className={`absolute right-0 top-9 w-8 h-8 flex items-center justify-center transition-transform ${
          !open ? "rotate-180" : ""
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5 text-primary cursor-pointer"
        >
          <path d="M3 19V5" />
          <path d="m13 6-6 6 6 6" />
          <path d="M7 12h14" />
        </svg>
      </button>

      {/* Logo Section */}
      <div className="flex gap-x-4 items-center">
        {/* Logo: use existing presentation.png or fallback to inline SVG on error */}
        {!imgError ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src="/assets/imgs/esdras/logo.png"
            alt="logo"
            onError={() => setImgError(true)}
            className={`cursor-pointer duration-500 ${open && "rotate-360"}`}
          />
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-primary w-8 h-8"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <path d="M3 9h18" />
            <circle cx="8.5" cy="14.5" r="1.5" />
          </svg>
        )}
        <h1
          className={`origin-left font-medium text-xl duration-200 ${
            !open && "scale-0"
          }`}
        >
          Gestage
        </h1>
      </div>

      {/* Navigation Menu */}
      <ul className="pt-10">
        {navLinks.map((link) => {
          const Icon = link.icon;
          const active = pathname === link.href;
          return (
            <li
              key={link.href}
              className={`flex rounded-md p-4 cursor-pointer text-sm items-center gap-x-4 ${
                link.gap ? "mt-9" : "mt-2"
              } ${active ? "bg-light-white" : ""}`}
            >
              <Link href={link.href} className="flex items-center gap-x-4">
                <Icon className="w-5 h-5" />
                <span className={`${!open ? "hidden" : ""}`}>{link.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
