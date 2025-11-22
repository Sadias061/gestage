import HeaderDepartement from "@/app/components/departement/Header";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen flex flex-col">
            <HeaderDepartement />
            <main className="flex-1">
                <div className="container mx-auto px-4 md:px-8">{children}</div>
            </main>
        </div>
    );
}