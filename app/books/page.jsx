"use client";
import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { useApi, usePageTitle } from "@/lib/hooks";
import Spinner from "@/components/Spinner";
import BookGrid from "@/components/BookGrid";

const TABS = ["All", "Fiction", "Science", "History", "Kids", "Others"];

function AllBooks() {
  usePageTitle("All Books");
  const params = useSearchParams();
  const initial = TABS.includes(params.get("category")) ? params.get("category") : "All";
  const [category, setCategory] = useState(initial);
  const [term, setTerm] = useState("");
  const { data, loading, error, reload } = useApi("/books");

  const shown = useMemo(() => {
    const t = term.trim().toLowerCase();
    return (data || []).filter(
      (b) =>
        (category === "All" || b.category === category) &&
        (!t || b.title.toLowerCase().includes(t) || b.author.toLowerCase().includes(t))
    );
  }, [data, category, term]);

  return (
    <div className="page-wrap">
      <h1 className="section-title">All books</h1>
      <p className="section-sub">Everything on the shelf, newest first.</p>

      <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div role="tablist" className="flex flex-wrap gap-2">
          {TABS.map((t) => (
            <button
              key={t}
              role="tab"
              aria-selected={category === t}
              onClick={() => setCategory(t)}
              className={`btn btn-sm ${category === t ? "btn-primary" : "btn-outline"}`}
            >
              {t}
            </button>
          ))}
        </div>
        <label className="input input-bordered flex items-center gap-2 md:w-72">
          <Search size={16} />
          <input value={term} onChange={(e) => setTerm(e.target.value)} className="grow" placeholder="Search title or author" aria-label="Search books" />
        </label>
      </div>

      <div className="mt-8">
        {loading ? (
          <Spinner />
        ) : error ? (
          <div className="alert alert-error">
            <span>{error}</span>
            <button className="btn btn-sm" onClick={reload}>Try again</button>
          </div>
        ) : shown.length === 0 ? (
          <p className="rounded-box border border-dashed border-base-300 p-10 text-center">
            No books match that. Try another category or search.
          </p>
        ) : (
          <BookGrid books={shown} />
        )}
      </div>
    </div>
  );
}

export default function BooksPage() {
  return (
    <Suspense fallback={<Spinner full />}>
      <AllBooks />
    </Suspense>
  );
}
