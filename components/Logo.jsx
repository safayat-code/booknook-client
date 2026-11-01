import Link from "next/link";

export default function Logo({ className = "" }) {
  return (
    <Link href="/" className={`flex items-center gap-2 ${className}`} aria-label="BookNook home">
      <svg width="30" height="30" viewBox="0 0 32 32" aria-hidden="true">
        <rect x="3" y="4" width="26" height="24" rx="3" className="fill-primary" />
        <path d="M10 4h12v15l-6-4-6 4z" className="fill-secondary" />
        <rect x="6" y="23" width="20" height="2" rx="1" className="fill-primary-content" opacity="0.7" />
      </svg>
      <span className="font-display text-2xl leading-none">BookNook</span>
    </Link>
  );
}
