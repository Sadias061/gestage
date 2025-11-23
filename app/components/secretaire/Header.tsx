"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { LayoutDashboard, Menu, X, LogOut } from "lucide-react";
import ThemeToggle from "@/app/components/ui/ThemeToggle";

export default function HeaderSecretaire() {
    const pathname = usePathname();
    const [open, setOpen] = useState(false); // menu mobile
    const [profileOpen, setProfileOpen] = useState(false); // dropdown profil
    const profileRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
                setProfileOpen(false);
            }
        }
        if (profileOpen) document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [profileOpen]);

    const navLinks = [
        { href: "/secretaire", label: "Accueil", icon: LayoutDashboard },
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
                        className={`btn btn-sm ${active ? "btn-secondary" : "btn-ghost"} gap-2 items-center rounded-lg ${extraClass}`}
                        onClick={() => setOpen(false)}
                    >
                        <Icon className="w-4 h-4" /> {label}
                    </Link>
                );
            })}
        </>
    );

    return (
        <div className="border-b border-secondary/40 bg-base-100 px-5 md:px-[10%] py-4 relative">
            <div className="flex items-center">
                {/* Bloc gauche (logo) */}
                <div className="flex items-center cursor-pointer">
                    <div className="p-2 rounded-md bg-secondary/20">
                        <span className="text-secondary font-bold">SC</span>
                    </div>
                </div>
                {/* Liens centrés (desktop) */}
                <div className="flex-1 flex justify-center">
                    <div className="hidden sm:flex items-center gap-2">
                        {renderLinks()}
                    </div>
                </div>
                {/* Actions à droite */}
                <div className="flex items-center gap-2 relative" ref={profileRef}>
                    <button
                        className="btn btn-sm sm:hidden"
                        onClick={() => setOpen(o => !o)}
                        aria-label="Ouvrir le menu"
                    >
                        <Menu className="w-4 h-4" />
                    </button>
                    <ThemeToggle />
                    {/* Bouton déconnexion visible sur desktop */}
                    <button className="btn btn-outline btn-secondary btn-sm gap-2 hidden sm:flex" aria-label="Déconnexion (desktop)">
                        <LogOut className="w-4 h-4" />
                    </button>
                    <button
                        type="button"
                        aria-label="Ouvrir le menu profil"
                        onClick={() => setProfileOpen(o => !o)}
                        className="btn btn-ghost btn-circle avatar"
                    >
                        <div className="w-10 rounded-full bg-secondary flex items-center justify-center">
                            <span className="text-sm font-semibold text-secondary-content">S</span>
                        </div>
                    </button>
                    {profileOpen && (
                        <ul className="menu menu-sm absolute right-0 top-full mt-2 bg-base-100 rounded-box z-60 w-52 p-2 shadow ">
                            <li>
                                <a className="justify-between">
                                    Profil
                                    <span className="badge text-secondary border-secondary">Nouveau</span>
                                </a>
                            </li>
                        </ul>
                    )}
                </div>
            </div>
            <div
                className={`sm:hidden absolute top-0 left-0 w-full bg-base-100 h-screen flex flex-col gap-3 p-5 transition-all duration-300 z-50 ${open ? "translate-x-0" : "-translate-x-full"}`}
            >
                <div className="flex justify-between items-center mb-2">
                    <div className="avatar placeholder">
                        <div className="bg-secondary text-secondary-content rounded-full w-10 flex items-center justify-center">
                            <span className="text-sm font-semibold">S</span>
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
                {/* Bouton déconnexion mobile */}
                <div className="mt-4 flex flex-col gap-2">
                    <button className="btn btn-secondary btn-outline btn-sm gap-2 text-secondaey" aria-label="Déconnexion (mobile)">
                        <LogOut className="w-4 h-4" />
                        Déconnexion
                    </button>
                </div>
            </div>
        </div>
    );
}
