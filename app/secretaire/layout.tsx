import HeaderSecretaire from "@/app/components/secretaire/Header";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen flex flex-col">
            <HeaderSecretaire />
            <main className="flex-1">
                <div className="container mx-auto px-4 md:px-8">{children}</div>
            </main>
        </div>
    );
}