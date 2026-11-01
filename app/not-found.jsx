"use client";
import Link from "next/link";
import { usePageTitle } from "@/lib/hooks";

export default function NotFound() {
  usePageTitle("Page Not Found");
  return (
    <div className="page-wrap grid min-h-[60vh] place-items-center text-center">
      <div>
        <p className="font-display text-7xl text-secondary">404</p>
        <h1 className="section-title mt-2">This page is not on the shelf</h1>
        <p className="section-sub mx-auto">The link may be wrong, or the book was removed.</p>
        <Link href="/" className="btn btn-primary mt-8">Back to Home</Link>
      </div>
    </div>
  );
}
