"use client";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Clock, FileText, Star, TrendingUp } from "lucide-react";
import Card from "@/app/components/accueil/Card";
import ThemeToggle from "./components/ui/ThemeToggle";
import { GitHubIcon } from "./components/icons/GitHubIcon";
import { LinkedInIcon } from "./components/icons/LinkedInIcon";
import { FacebookIcon } from "./components/icons/FacebookIcon";
import { WhatsAppIcon } from "./components/icons/WhatsAppIcon";

export default function Page() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false); // menu mobile
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { id: "#fonctionnalité", label: "Fonctionnalités" },
    { id: "#a-propos", label: "A propos" },
  ];

  const renderLinks = (extraClass = "") => (
    <>
      {navLinks.map(({ id, label }) => {
        const active = pathname === id;
        return (
          <Link
            key={id}
            href={id}
            className={`btn btn-sm ${active ? "btn-primary" : "btn-ghost"
              } gap-2 items-center rounded-lg ${extraClass}`}
            onClick={() => setOpen(false)}
          >
            {label}
          </Link>
        );
      })}
    </>
  );

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div className={`px-5 md:px-[10%] py-4 fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-base-100/80 backdrop-blur-md shadow-md" : "bg-base-100"
        }`}>
        <div className="flex items-center border-b border-primary/40 pb-4 px-5">
          {/* Bloc gauche (logo) */}
          <div className="flex items-center cursor-pointer ">
            <div className="p-2 rounded-md bg-primary/20">
              <span className="text-primary font-bold">GS</span>
            </div>
          </div>
          {/* Liens (desktop) */}
          <div className="flex-1 flex justify-end ">
            <div className="hidden sm:flex items-center gap-5 me-4">
              {renderLinks()}
              <a href="#" className="btn btn-primary btn-sm">
                Accéder
              </a>
            </div>
          </div>
          {/* Actions à droite */}
          <div className="flex items-center gap-2 relative">
            <ThemeToggle />
            <button
              className="btn btn-sm sm:hidden"
              onClick={() => setOpen((o) => !o)}
              aria-label="Ouvrir le menu"
            >
              <Menu className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div
          className={`sm:hidden absolute top-0 left-0 w-full bg-base-100 h-screen flex flex-col gap-3 p-5 transition-all duration-300 z-50 ${open ? "translate-x-0" : "-translate-x-full"
            }`}
        >
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center cursor-pointer ">
              <div className="p-2 rounded-md bg-primary/20">
                <span className="text-primary font-bold">GS</span>
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

        </div>
      </div>
      {/* Body */}
      <div className="px-5 md:px-[10%] py-6 md:py-6 mt-20">
        {/* Première section */}
        <div className="flex flex-col md:flex-row gap-5 items-center md:items-stretch md:h-56" id="fonctionnalites">
          {/* TEXTE (reste en bas sur mobile, mais passe à gauche sur desktop) */}
          <div className="order-2 md:order-1 flex flex-col gap-5 w-full md:w-1/2 h-56 md:h-full justify-center">
            <h1 className="font-bold text-3xl">Révolutionnez votre gestion de stagiaires</h1>
            <p>
              Optimisez la gestion, suivez les performances en temps réel et enrichissez
              l’expérience utilisateur de vos stagiaires avec notre solution tout en un.
            </p>
            <a href="#" className="btn btn-primary py-6 lg:py-7 md:py-5">
              Découvrir la solution
            </a>
          </div>
          {/* IMAGE (en haut sur mobile, à droite sur desktop) */}
          <div className="order-1 md:order-2 w-full md:w-1/2 h-56 md:h-full">
            <div className="relative w-full h-full">
              <Image
                src="/assets/imgs/esdras/presentation.png"
                alt="Présentation de la solution Gestage"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="rounded-lg shadow-lg object-cover"
                priority
              />
            </div>
          </div>
        </div>
        {/* Deuxième section */}
        <div className="flex flex-col justify-center items-center mb-10 md:mb-20 mt-10 md:mt-20">
          {/* Section fonctionnalités */}
          <div className="text-center">
            <h1 className="font-bold text-3xl mb-5 md:text-4xl lg:text-5xl">Des Fonctionnalités conçues pour l&rsquo;efficacité</h1>
            <p className="">Notre plateforme centralise tous les aspects de la gestion des stagiaires, de leur arrivée à leur  évaluation finale.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            <Card
              icon={Clock}
              title="Gestion des présences"
              description="Suivi centralisé et en temps réel des heures de présence et des absences."
            />
            <Card
              icon={FileText}
              title="Suivi des projets"
              description="Assignez des tâches, suivez leur progression et collaborez efficacement sur les projets."
            />
            <Card
              icon={Star}
              title="Évaluation continue"
              description="Facilitez le processus de feedback avec des outils d'évaluation intégrés."
            />
            <Card
              icon={TrendingUp}
              title="Dashboards de performance"
              description="Visualisez les données clés grâce à des rapports et des tableaux de bord intuitifs."
            />
          </div>
        </div>
        {/* Section découverte */}
        <div className="mb-5">
          <div className="text-center">
            <h1 className="font-bold text-3xl mb-5 md:text-4xl lg:text-5xl">Prêt à optimiser votre gestion</h1>
            <p className=" mb-5">Accéder à votre espace et transformez la manière dont vous accompagnez vos stagiaires</p>
            <a href="#" className="btn btn-primary cursor-pointer py-6 lg:py-8 md:py-7 px-20 lg:px-24 md:px-16 ">Accéder à votre tableau de bord</a>
          </div>
        </div>
      </div>
      {/* Footer */}
      <footer className="mt-8 md:mt-14 py-8  md:px-[10%] " id="a-propos">
        <div className="border-t border-primary/40 px-5 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-center">
          <div className="flex items-center cursor-pointer">
            <div className="p-2 rounded-md bg-primary/20">
              <span className="text-primary font-bold">GS</span>
            </div>
            <span className="ml-3 font-semibold">Gestage</span>
          </div>
          <p className="text-sm">
            © {new Date().getFullYear()} Gestage. Tous droits réservés.
          </p>
          <div className="flex gap-4">
            <a href="#" aria-label="GitHub" className="hover:text-primary transition-colors">
              <GitHubIcon />
            </a>
            <a href="#" aria-label="Facebook" className="hover:text-primary transition-colors">
              <FacebookIcon />
            </a>
            <a href="#" aria-label="WhatsApp" className="hover:text-primary transition-colors">
              <WhatsAppIcon />
            </a>
            <a href="#" aria-label="LinkedIn" className="hover:text-primary transition-colors">
              <LinkedInIcon />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
