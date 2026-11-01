"use client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { api } from "@/lib/api";
import { authClient } from "@/lib/auth-client";
import { usePageTitle } from "@/lib/hooks";
import PrivateRoute from "@/components/PrivateRoute";
import BookForm from "@/components/BookForm";

function AddBook() {
  usePageTitle("Add Book");
  const router = useRouter();
  const { data } = authClient.useSession();

  async function handleAdd(book) {
    await api("/books", { method: "POST", body: book, auth: true });
    toast.success(`"${book.title}" is now on the shelf.`);
    router.push("/my-books");
  }

  return (
    <div className="page-wrap max-w-2xl">
      <h1 className="section-title">Add a book</h1>
      <p className="section-sub">Share a book with other readers.</p>
      <div className="mt-8 rounded-box border border-base-300 p-6">
        <BookForm user={data.user} submitLabel="Add Book" onSubmit={handleAdd} />
      </div>
    </div>
  );
}

export default function AddBookPage() {
  return (
    <PrivateRoute>
      <AddBook />
    </PrivateRoute>
  );
}
