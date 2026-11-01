"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import { uploadImage } from "@/lib/upload";

export const CATEGORIES = ["Fiction", "Science", "History", "Kids", "Others"];

// Shared by Add Book and Edit Book. `onSubmit` receives the clean book data and may throw.
export default function BookForm({ initial, user, submitLabel, onSubmit, onCancel }) {
  const [file, setFile] = useState(null);
  const [busy, setBusy] = useState(false);
  const editing = Boolean(initial);

  async function handleSubmit(e) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    if (!editing && !file) {
      toast.error("Choose a cover image for the book.");
      return;
    }
    setBusy(true);
    try {
      const image = file ? await uploadImage(file) : initial.image;
      await onSubmit({
        title: f.get("title").trim(),
        author: f.get("author").trim(),
        category: f.get("category"),
        description: f.get("description").trim(),
        totalCopies: Number(f.get("totalCopies")),
        image,
      });
    } catch (err) {
      toast.error(err.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <label className="form-control">
        <span className="label-text mb-1 font-medium">Book title</span>
        <input name="title" required defaultValue={initial?.title} className="input input-bordered" placeholder="The name on the cover" />
      </label>
      <label className="form-control">
        <span className="label-text mb-1 font-medium">Author name</span>
        <input name="author" required defaultValue={initial?.author} className="input input-bordered" placeholder="Who wrote it" />
      </label>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="form-control">
          <span className="label-text mb-1 font-medium">Category</span>
          <select name="category" required defaultValue={initial?.category || ""} className="select select-bordered">
            <option value="" disabled>Choose a category</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </label>
        <label className="form-control">
          <span className="label-text mb-1 font-medium">Total copies</span>
          <input name="totalCopies" type="number" min="1" step="1" required defaultValue={initial?.totalCopies ?? 1} className="input input-bordered" />
        </label>
      </div>
      <label className="form-control">
        <span className="label-text mb-1 font-medium">
          Book image {editing && <span className="font-normal text-base-content/60">(leave empty to keep the current one)</span>}
        </span>
        <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} className="file-input file-input-bordered w-full" />
      </label>
      {editing && !file && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={initial.image} alt="Current cover" className="h-28 w-20 rounded object-cover" />
      )}
      <label className="form-control">
        <span className="label-text mb-1 font-medium">Short description</span>
        <textarea name="description" required rows={4} defaultValue={initial?.description} className="textarea textarea-bordered" placeholder="What is this book about?" />
      </label>
      {user && (
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="form-control">
            <span className="label-text mb-1 font-medium">Your name</span>
            <input readOnly value={user.name} className="input input-bordered bg-base-200" />
          </label>
          <label className="form-control">
            <span className="label-text mb-1 font-medium">Your email</span>
            <input readOnly value={user.email} className="input input-bordered bg-base-200" />
          </label>
        </div>
      )}
      <div className="mt-2 flex justify-end gap-3">
        {onCancel && (
          <button type="button" onClick={onCancel} className="btn btn-ghost">Cancel</button>
        )}
        <button type="submit" disabled={busy} className="btn btn-primary">
          {busy ? <span className="loading loading-spinner loading-sm" /> : submitLabel}
        </button>
      </div>
    </form>
  );
}
