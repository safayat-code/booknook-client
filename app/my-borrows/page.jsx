"use client";
import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { api } from "@/lib/api";
import { useApi, usePageTitle } from "@/lib/hooks";
import { formatDate } from "@/lib/format";
import PrivateRoute from "@/components/PrivateRoute";
import Spinner from "@/components/Spinner";

function MyBorrows() {
  usePageTitle("My Borrows");
  const { data, loading, error, reload, setData } = useApi("/borrows", { auth: true });
  const [returning, setReturning] = useState(null);

  async function handleReturn(b) {
    setReturning(b._id);
    try {
      await api(`/borrows/${b._id}`, { method: "DELETE", auth: true });
      setData((list) => list.filter((x) => x._id !== b._id));
      toast.success(`"${b.bookTitle}" was returned.`);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setReturning(null);
    }
  }

  return (
    <div className="page-wrap">
      <h1 className="section-title">My borrows</h1>
      <p className="section-sub">Books you have right now.</p>
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
            You have no borrowed books. <Link href="/books" className="link link-primary">Find one to borrow.</Link>
          </p>
        ) : (
          <div className="overflow-x-auto rounded-box border border-base-300">
            <table className="table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Borrow date</th>
                  <th>Return date</th>
                  <th className="text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {data.map((b) => (
                  <tr key={b._id}>
                    <td>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={b.bookImage} alt="" className="h-16 w-12 rounded object-cover" />
                    </td>
                    <td className="font-semibold">{b.bookTitle}</td>
                    <td>{formatDate(b.borrowDate)}</td>
                    <td>{formatDate(b.returnDate)}</td>
                    <td className="text-right">
                      <button className="btn btn-sm btn-primary" disabled={returning === b._id} onClick={() => handleReturn(b)}>
                        {returning === b._id ? <span className="loading loading-spinner loading-xs" /> : "Return Book"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default function MyBorrowsPage() {
  return (
    <PrivateRoute>
      <MyBorrows />
    </PrivateRoute>
  );
}
