// Layout with Header for Stagiaire
// import HeaderStagiaire from "@/app/components/stagiaire/Header";

// export default function Layout({ children }: { children: React.ReactNode }) {
//     return (
//         <div className="min-h-screen flex flex-col">
//             <HeaderStagiaire />
//             <main className="flex-1 px-5 md:px-[10%] py-6 md:py-8 mt-20">
//                 {children}
//             </main>
//         </div>
//     );
// }


// Layout with Sidebar for Stagiaire
import SidebarStagiaire from "@/app/components/stagiaire/Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen flex">
            

            {/* Sidebar: collapsed on tablet (md) -> icons only, expanded on lg */}
            <aside className="">
                <SidebarStagiaire />
            </aside>
            <main className="flex-1 px-5 md:px-8 py-6 md:py-8">
                {children}
            </main>
        </div>
    );
}