"use client";
import { useState, useEffect } from "react";

export default function ThemeToggle() {
    // Éviter les erreurs d'hydratation : rendre un placeholder stable d'abord.
    const [mounted, setMounted] = useState(false);
    const [theme, setTheme] = useState<string>("light");

    useEffect(() => {
        // Lire le thème persisté après le montage
        const read = () => {
            try {
                const stored = localStorage.getItem("theme");
                const attr = document.documentElement.getAttribute("data-theme");
                const resolved = stored || attr || "light";
                setTheme(resolved);
            } catch {
                // ignorer
            } finally {
                setMounted(true);
            }
        };
        // Différer avec requestAnimationFrame pour éviter le warning setState synchrone
        if (typeof window !== "undefined") {
            requestAnimationFrame(read);
        }
    }, []);

    function toggle() {
        try {
            const next = theme === "dracula" ? "light" : "dracula";
            document.documentElement.setAttribute("data-theme", next);
            localStorage.setItem("theme", next);
            // Persister le thème côté serveur afin que le SSR puisse rendre le même `data-theme`
            // et éviter les erreurs d'hydratation.
            try { document.cookie = `theme=${next}; path=/; max-age=31536000; SameSite=Lax`; } catch { }
            setTheme(next);
        } catch {
            // ignorer
        }
    }

    // Ne rien rendre avant le montage pour éviter l'hydration mismatch
    if (!mounted) {
        return (
            <button
                aria-label="Toggle theme"
                className="btn btn-ghost btn-circle"
                disabled
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path d="M17.293 13.293A8 8 0 116.707 2.707a7 7 0 0010.586 10.586z" />
                </svg>
            </button>
        );
    }

    return (
        <button
            aria-label="Toggle theme"
            onClick={toggle}
            className="btn btn-ghost btn-circle"
        >
            {theme === "dracula" ? (
                // Icône soleil (bouton mode clair visible quand le thème est dracula)
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="4" />
                    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
                </svg>
            ) : (
                // Icône lune/contraste (bouton thème dracula quand mode clair)
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path d="M17.293 13.293A8 8 0 116.707 2.707a7 7 0 0010.586 10.586z" />
                </svg>
            )}
        </button>
    );
}
