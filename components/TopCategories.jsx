import Link from "next/link";
import { BookOpen, FlaskConical, Landmark, Baby, Library } from "lucide-react";

const cats = [
  { name: "Fiction", icon: BookOpen, text: "Novels and short stories" },
  { name: "Science", icon: FlaskConical, text: "How the world works" },
  { name: "History", icon: Landmark, text: "People, places and eras" },
  { name: "Kids", icon: Baby, text: "Picture books and first readers" },
  { name: "Others", icon: Library, text: "Everything that fits nowhere else" },
];

export default function TopCategories() {
  return (
    <section className="page-wrap">
      <h2 className="section-title">Top categories</h2>
      <p className="section-sub">Start from a shelf you like.</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {cats.map((c) => (
          <Link
            key={c.name}
            href={`/books?category=${c.name}`}
            className="flex h-full flex-col rounded-box border border-base-300 p-5 transition hover:border-secondary hover:bg-base-200"
          >
            <c.icon className="text-secondary" size={28} />
            <h3 className="mt-4 text-xl">{c.name}</h3>
            <p className="mt-1 text-sm text-base-content/70">{c.text}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
