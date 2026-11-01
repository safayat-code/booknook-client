"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";
import { api } from "@/lib/api";
import { authClient } from "@/lib/auth-client";
import { useApi, usePageTitle } from "@/lib/hooks";
import { formatDate } from "@/lib/format";
import PrivateRoute from "@/components/PrivateRoute";
import Spinner from "@/components/Spinner";
import Modal from "@/components/Modal";

function Details() {
  const { id } = useParams();
  const { data: session } = authClient.useSession();
  const user = session.user;
  const { data: book, loading, error, reload } = useApi(`/books/${id}`, { auth: true });
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  usePageTitle(book ? book.title : "Book Details");

  const returnBy = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  async function confirmBorrow() {
    setBusy(true);
    try {
      await api("/borrows", { method: "POST", body: { bookId: id }, auth: true });
      toast.success(`You borrowed "${book.title}". Return it by ${formatDate(returnBy)}.`);
      setOpen(false);
      reload();
    } catch (err) {
      toast.error(err.message);
      setOpen(false);
      reload();
    } finally {
      setBusy(false);
    }
  }

  if (loading && !book) return <Spinner full />;
  if (error && !book) {
    return (
      <div className="page-wrap">
        <div className="alert alert-error">
          <span>{error}</span>
          <button className="btn btn-sm" onClick={reload}>Try again</button>
        </div>
      </div>
    );
  }

  const out = book.availableCopies <= 0;
  return (
    <div className="page-wrap">
      <div className="grid gap-10 md:grid-cols-5">
        <div className="md:col-span-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={book.image} alt={`Cover of ${book.title}`} className="aspect-[3/4] w-full rounded-box border border-base-300 object-cover" />
        </div>
        <div className="md:col-span-3">
          <span className="badge badge-outline badge-secondary">{book.category}</span>
          <h1 className="section-title mt-3">{book.title}</h1>
          <p className="mt-1 text-lg text-base-content/75">by {book.author}</p>
          <p className="mt-6 max-w-prose leading-relaxed">{book.description}</p>

          <dl className="mt-8 grid gap-4 rounded-box border border-base-300 p-5 sm:grid-cols-2">
            <div>
              <dt className="text-sm text-base-content/60">Copies available</dt>
              <dd className="text-lg font-semibold">{book.availableCopies} of {book.totalCopies}</dd>
            </div>
            <div>
              <dt className="text-sm text-base-content/60">Added by</dt>
              <dd className="text-lg font-semibold">{book.addedByName}</dd>
              <dd className="truncate text-sm text-base-content/60">{book.addedByEmail}</dd>
            </div>
            <div>
              <dt className="text-sm text-base-content/60">Added on</dt>
              <dd>{formatDate(book.createdAt)}</dd>
            </div>
          </dl>

          <button onClick={() => setOpen(true)} disabled={out} className="btn btn-primary mt-8">
            {out ? "Not Available" : "Borrow This Book"}
          </button>
        </div>
      </div>

      <Modal open={open} onClose={() => !busy && setOpen(false)} title="Borrow this book">
        <p className="mb-4 text-base-content/75">
          You are borrowing <strong>{book.title}</strong>. Please return it by {formatDate(returnBy)}.
        </p>
        <div className="grid gap-4">
          <label className="form-control">
            <span className="label-text mb-1 font-medium">Your name</span>
            <input readOnly value={user.name} className="input input-bordered bg-base-200" />
          </label>
          <label className="form-control">
            <span className="label-text mb-1 font-medium">Your email</span>
            <input readOnly value={user.email} className="input input-bordered bg-base-200" />
          </label>
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <button className="btn btn-ghost" onClick={() => setOpen(false)} disabled={busy}>Cancel</button>
          <button className="btn btn-primary" onClick={confirmBorrow} disabled={busy}>
            {busy ? <span className="loading loading-spinner loading-sm" /> : "Confirm Borrow"}
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default function BookDetailsPage() {
  return (
    <PrivateRoute>
      <Details />
    </PrivateRoute>
  );
}
