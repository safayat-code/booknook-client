import { BookPlus, BookCheck, Undo2 } from "lucide-react";

const steps = [
  { icon: BookPlus, title: "Add", text: "Upload a cover, write a line about the book and say how many copies you have." },
  { icon: BookCheck, title: "Borrow", text: "Open any book, confirm your details and keep it for 7 days. One copy per reader." },
  { icon: Undo2, title: "Return", text: "Open My Borrows and press Return Book. The copy goes straight back on the shelf." },
];

export default function HowItWorks() {
  return (
    <section className="bg-base-200">
      <div className="page-wrap">
        <h2 className="section-title">How borrowing works</h2>
        <p className="section-sub">Three steps, in this order.</p>
        <ol className="mt-8 grid gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <li key={s.title} className="flex h-full flex-col rounded-box border border-base-300 bg-base-100 p-6">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-primary font-display text-lg text-primary-content">{i + 1}</span>
                <s.icon className="text-secondary" size={26} />
              </div>
              <h3 className="mt-4 text-xl">{s.title}</h3>
              <p className="mt-2 text-base-content/75">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
