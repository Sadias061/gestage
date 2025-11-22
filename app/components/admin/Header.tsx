"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { LayoutDashboard, Menu, X, LogOut } from "lucide-react";
import ThemeToggle from "@/app/components/ui/ThemeToggle";

export default function HeaderAdmin() {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);

    const navLinks = [
        { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
        // ajouter d'autres liens de navigation si nécessaire
    ];

    const renderLinks = (extraClass = "") => (
        <>
            {navLinks.map(({ href, label, icon: Icon }) => {
                const active = pathname === href;
                return (
                    <Link
                        key={href}
                        href={href}
                        className={`btn btn-sm ${active ? "btn-primary" : "btn-ghost"} gap-2 items-center rounded-lg ${extraClass}`}
                        onClick={() => setOpen(false)}
                    >
                        <Icon className="w-4 h-4" /> {label}
                    </Link>
                );
            })}
        </>
    );

    return (
        <div className="border-b border-base-300 bg-base-100 px-5 md:px-[10%] py-4 relative">
            <div className="flex justify-between items-center">
                {/* Logo */}
                <div className="flex items-center cursor-pointer">
                    <div className="p-2 rounded-md bg-secondary/20">
                        <span className="text-secondary font-bold">GA</span>
                    </div>
                </div>

                {/* Bouton menu mobile */}
                <button
                    className="btn btn-sm sm:hidden"
                    onClick={() => setOpen(o => !o)}
                    aria-label="Ouvrir le menu"
                >
                    <Menu className="w-4 h-4" />
                </button>

                {/* Liens desktop */}
                <div className="hidden sm:flex items-center gap-2">
                    {renderLinks()}
                    <ThemeToggle />
                    <div className="avatar placeholder">
                        <div className="bg-secondary text-secondary-content rounded-full w-10 flex items-center justify-center">
                            <span className="text-sm font-semibold">A</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Menu mobile */}
            <div
                className={`sm:hidden absolute top-0 left-0 w-full bg-base-100 h-screen flex flex-col gap-3 p-5 transition-all duration-300 z-50 ${open ? "translate-x-0" : "-translate-x-full"}`}
            >
                <div className="flex justify-between items-center mb-2">
                    <div className="avatar placeholder">
                        <div className="bg-secondary text-secondary-content rounded-full w-10 flex items-center justify-center">
                            <span className="text-sm font-semibold">A</span>
                        </div>
                    </div>
                    <button
                        className="btn btn-sm"
                        onClick={() => setOpen(false)}
                        aria-label="Fermer le menu"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
                {renderLinks("w-full")}
                <div className="mt-2">
                    <ThemeToggle />
                </div>
                <div className="mt-auto flex flex-col gap-2">
                    <button className="btn btn-outline btn-sm gap-2"><LogOut className="w-4 h-4" /> Déconnexion</button>
                </div>
            </div>
        </div>
    );
}
