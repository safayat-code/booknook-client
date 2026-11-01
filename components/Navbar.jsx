"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu } from "lucide-react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import Logo from "./Logo";
import Avatar from "./Avatar";
import ThemeToggle from "./ThemeToggle";

const publicLinks = [
  { href: "/", label: "Home" },
  { href: "/books", label: "All Books" },
];
const privateLinks = [
  { href: "/add-book", label: "Add Book" },
  { href: "/my-books", label: "My Books" },
  { href: "/my-borrows", label: "My Borrows" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  const links = user ? [...publicLinks, ...privateLinks] : publicLinks;
  const isActive = (href) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
  const closeMenu = () => document.activeElement?.blur();

  async function handleLogout() {
    closeMenu();
    await authClient.signOut();
    toast.success("You have been logged out.");
    router.push("/");
  }

  const items = links.map((l) => (
    <li key={l.href}>
      <Link href={l.href} className={isActive(l.href) ? "font-semibold text-primary" : ""}>
        {l.label}
      </Link>
    </li>
  ));

  return (
    <header className="sticky top-0 z-40 border-b border-base-300 bg-base-100/95 backdrop-blur">
      <div className="navbar mx-auto max-w-7xl px-4 sm:px-6">
        <div className="navbar-start gap-1">
          <div className="dropdown lg:hidden">
            <button tabIndex={0} className="btn btn-ghost btn-circle" aria-label="Open menu">
              <Menu size={22} />
            </button>
            <ul
              tabIndex={0}
              onClick={closeMenu}
              className="menu dropdown-content z-50 mt-3 w-56 rounded-box border border-base-300 bg-base-100 p-2 shadow-lg"
            >
              {items}
            </ul>
          </div>
          <Logo />
        </div>

        <nav className="navbar-center hidden lg:flex" aria-label="Main">
          <ul className="menu menu-horizontal gap-1 px-1">{items}</ul>
        </nav>

        <div className="navbar-end gap-1">
          <ThemeToggle />
          {isPending ? null : user ? (
            <div className="dropdown dropdown-end">
              <button tabIndex={0} className="btn btn-ghost btn-circle" aria-label="Open account menu">
                <Avatar user={user} size={36} />
              </button>
              <ul
                tabIndex={0}
                className="menu dropdown-content z-50 mt-3 w-64 rounded-box border border-base-300 bg-base-100 p-2 shadow-lg"
              >
                <li className="pointer-events-none px-3 py-2">
                  <span className="block truncate text-base font-semibold">{user.name}</span>
                  <span className="block truncate text-xs text-base-content/60">{user.email}</span>
                </li>
                <li>
                  <Link href="/profile" onClick={closeMenu}>My Profile</Link>
                </li>
                <li>
                  <button type="button" onClick={handleLogout}>Logout</button>
                </li>
              </ul>
            </div>
          ) : (
            <div className="flex gap-2">
              <Link href="/login" className="btn btn-outline btn-primary btn-sm sm:btn-md">Login</Link>
              <Link href="/register" className="btn btn-primary btn-sm sm:btn-md">Register</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
