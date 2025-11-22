import type { Metadata } from "next";
import "./globals.css";
import { cookies } from 'next/headers';

export const metadata: Metadata = {
  title: "Gestage",
  description: "Application de gestion de stagiaires",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Lire le cookie de thème côté serveur pour rendre `data-theme` sur l'élément HTML
  // afin que la sortie SSR corresponde au client et évite les erreurs d'hydratation.
  let serverTheme = "light";
  try {
    const cookieStore = await cookies();
    const cookieTheme = cookieStore.get("theme")?.value;
    if (cookieTheme) serverTheme = cookieTheme;
  } catch {
    // ignorer
  }

  const setThemeScript = `
  (function(){
    try{
      var theme = localStorage.getItem('theme');
      if(!theme){
        var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        theme = prefersDark ? 'dracula' : 'light';
      }
      document.documentElement.setAttribute('data-theme', theme);
    }catch(e){}
  })();
  `;

  return (
    <html lang="en" data-theme={serverTheme} content="width=device-width, initial-scale=1.0">
      <body className="antialiased">
        <script dangerouslySetInnerHTML={{ __html: setThemeScript }} />
        {children}
      </body>
    </html>
  );
}
