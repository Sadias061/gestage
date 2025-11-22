import HeaderStagiaire from "@/app/components/stagiaire/Header";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen flex flex-col">
            <HeaderStagiaire />
            <main className="flex-1 px-5 md:px-[10%] py-6 md:py-8">
                {children}
            </main>
        </div>
    );
}