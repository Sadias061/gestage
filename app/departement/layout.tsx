import HeaderDepartement from "@/app/components/departement/Header";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen flex flex-col">
            <HeaderDepartement />
            <main className="flex-1 px-5 md:px-[10%] py-6 md:py-8 mt-20">
                {children}
            </main>
        </div>
    );
}