"use client";
import Link from "next/link";
import { useApi } from "@/lib/hooks";
import Spinner from "./Spinner";
import BookGrid from "./BookGrid";

export default function NewArrivals() {
  const { data, loading, error, reload } = useApi("/books?limit=6");
  return (
    <section className="page-wrap">
      <h2 className="section-title">New arrivals</h2>
      <p className="section-sub">The six newest books on the shelf.</p>
      <div className="mt-8">
        {loading ? (
          <Spinner />
        ) : error ? (
          <div className="alert alert-error">
            <span>{error}</span>
            <button className="btn btn-sm" onClick={reload}>Try again</button>
          </div>
        ) : data.length === 0 ? (
          <p className="rounded-box border border-dashed border-base-300 p-8 text-center">
            The shelf is empty. <Link href="/add-book" className="link link-primary">Add the first book.</Link>
          </p>
        ) : (
          <>
            <BookGrid books={data} />
            <div className="mt-10 text-center">
              <Link href="/books" className="btn btn-primary">See All Books</Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
