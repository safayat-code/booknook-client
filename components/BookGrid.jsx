import BookCard from "./BookCard";

export default function BookGrid({ books }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {books.map((b) => (
        <BookCard key={b._id} book={b} />
      ))}
    </div>
  );
}
