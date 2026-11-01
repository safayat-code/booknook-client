"use client";
import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { Pencil, Trash2 } from "lucide-react";
import { api } from "@/lib/api";
import { authClient } from "@/lib/auth-client";
import { useApi, usePageTitle } from "@/lib/hooks";
import PrivateRoute from "@/components/PrivateRoute";
import Spinner from "@/components/Spinner";
import Modal from "@/components/Modal";
import BookForm from "@/components/BookForm";

function MyBooks() {
  usePageTitle("My Books");
  const { data: session } = authClient.useSession();
  const email = session.user.email;
  const { data, loading, error, reload, setData } = useApi(`/books?addedBy=${encodeURIComponent(email)}`);
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [busy, setBusy] = useState(false);

  async function handleUpdate(book) {
    const updated = await api(`/books/${editing._id}`, { method: "PATCH", body: book, auth: true });
    setData((list) => list.map((b) => (b._id === editing._id ? { ...b, ...updated } : b)));
    toast.success(`"${book.title}" was updated.`);
    setEditing(null);
  }

  async function handleDelete() {
    setBusy(true);
    try {
      await api(`/books/${deleting._id}`, { method: "DELETE", auth: true });
      setData((list) => list.filter((b) => b._id !== deleting._id));
      toast.success(`"${deleting.title}" was deleted.`);
      setDeleting(null);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="page-wrap">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="section-title">My books</h1>
          <p className="section-sub">Books you added to the shelf.</p>
        </div>
        <Link href="/add-book" className="btn btn-primary">Add Book</Link>
      </div>

      <div className="mt-8">
        {loading ? (
          <Spinner />
        ) : error ? (
          <div className="alert alert-error">
            <span>{error}</span>
            <button className="btn btn-sm" onClick={reload}>Try again</button>
          </div>
        ) : data.length === 0 ? (
          <p className="rounded-box border border-dashed border-base-300 p-10 text-center">
            You have not added any books yet. <Link href="/add-book" className="link link-primary">Add your first one.</Link>
          </p>
        ) : (
          <div className="overflow-x-auto rounded-box border border-base-300">
            <table className="table">
              <thead>
                <tr>
                  <th>Book</th>
                  <th>Category</th>
                  <th>Copies left</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.map((b) => (
                  <tr key={b._id}>
                    <td>
                      <div className="flex items-center gap-3">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={b.image} alt="" className="h-16 w-12 rounded object-cover" />
                        <div>
                          <Link href={`/books/${b._id}`} className="font-semibold hover:underline">{b.title}</Link>
                          <div className="text-sm text-base-content/60">{b.author}</div>
                        </div>
                      </div>
                    </td>
                    <td>{b.category}</td>
                    <td>{b.availableCopies} of {b.totalCopies}</td>
                    <td>
                      <div className="flex justify-end gap-2">
                        <button className="btn btn-sm btn-outline btn-primary" onClick={() => setEditing(b)}>
                          <Pencil size={14} /> Edit
                        </button>
                        <button className="btn btn-sm btn-outline btn-error" onClick={() => setDeleting(b)}>
                          <Trash2 size={14} /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Modal open={Boolean(editing)} onClose={() => setEditing(null)} title="Edit book">
        {editing && (
          <BookForm initial={editing} submitLabel="Save changes" onSubmit={handleUpdate} onCancel={() => setEditing(null)} />
        )}
      </Modal>

      <Modal open={Boolean(deleting)} onClose={() => !busy && setDeleting(null)} title="Delete this book?">
        <p className="text-base-content/75">
          <strong>{deleting?.title}</strong> will be removed from the shelf, along with any active borrows of it. This cannot be undone.
        </p>
        <div className="mt-6 flex justify-end gap-3">
          <button className="btn btn-ghost" onClick={() => setDeleting(null)} disabled={busy}>Keep book</button>
          <button className="btn btn-error" onClick={handleDelete} disabled={busy}>
            {busy ? <span className="loading loading-spinner loading-sm" /> : "Delete book"}
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default function MyBooksPage() {
  return (
    <PrivateRoute>
      <MyBooks />
    </PrivateRoute>
  );
}
