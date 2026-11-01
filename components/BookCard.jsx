import Link from "next/link";

export default function BookCard({ book }) {
  const out = book.availableCopies <= 0;
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-box border border-base-300 bg-base-100">
      <div className="relative">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={book.image} alt={`Cover of ${book.title}`} className="h-64 w-full object-cover" loading="lazy" />
        <span
          className={`badge absolute left-3 top-3 border-0 ${out ? "bg-error text-white" : "bg-neutral text-neutral-content"}`}
        >
          {out ? "Not Available" : `${book.availableCopies} of ${book.totalCopies} available`}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <span className="badge badge-outline badge-secondary w-fit">{book.category}</span>
        <h3 className="line-clamp-1 text-xl">{book.title}</h3>
        <p className="line-clamp-1 text-sm text-base-content/70">by {book.author}</p>
        <Link href={`/books/${book._id}`} className="btn btn-primary mt-auto">
          View Details
        </Link>
      </div>
    </article>
  );
}
