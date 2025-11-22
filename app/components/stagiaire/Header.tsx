"use client";
import ThemeToggle from "@/app/components/ui/ThemeToggle";

export default function HeaderStagiaire() {
  return (
    <div className="navbar bg-primary text-primary-content shadow-sm">
      <div className="container mx-auto px-4 md:px-8 flex items-center">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">Stagiaire</a>
        </div>
        <div className="flex gap-2 items-center">
          <ThemeToggle />
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="Avatar"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>
            <ul
              tabIndex={-1}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow"
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
