import Link from "next/link";
import { Facebook, Github, Instagram, Mail, MapPin, Phone } from "lucide-react";
import Logo from "./Logo";

function XIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const socials = [
  { label: "X", href: "https://x.com", icon: <XIcon /> },
  { label: "Facebook", href: "https://facebook.com", icon: <Facebook size={18} /> },
  { label: "Instagram", href: "https://instagram.com", icon: <Instagram size={18} /> },
  { label: "GitHub", href: "https://github.com", icon: <Github size={18} /> },
];

export default function Footer() {
  return (
    <footer className="mt-16 bg-neutral text-neutral-content">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <Logo className="text-neutral-content" />
          <p className="mt-4 max-w-xs text-sm text-neutral-content/75">
            A shared shelf for readers. Put a book on it, take one home for a week, bring it back.
          </p>
        </div>
        <div>
          <h3 className="text-lg">Contact</h3>
          <ul className="mt-4 space-y-3 text-sm text-neutral-content/75">
            <li className="flex items-center gap-2"><Mail size={16} /> hello@booknook.app</li>
            <li className="flex items-center gap-2"><Phone size={16} /> +880 1700 000 000</li>
            <li className="flex items-center gap-2"><MapPin size={16} /> Dhaka, Bangladesh</li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg">Follow us</h3>
          <div className="mt-4 flex gap-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="grid h-10 w-10 place-items-center rounded-full border border-neutral-content/30 transition hover:bg-secondary hover:text-secondary-content"
              >
                {s.icon}
              </a>
            ))}
          </div>
          <p className="mt-6 text-sm text-neutral-content/75">
            Browse the <Link href="/books" className="link">full shelf</Link>.
          </p>
        </div>
      </div>
      <div className="border-t border-neutral-content/15 py-4 text-center text-xs text-neutral-content/60">
        © {new Date().getFullYear()} BookNook. All rights reserved.
      </div>
    </footer>
  );
}
