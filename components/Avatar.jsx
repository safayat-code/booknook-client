"use client";
import { useState } from "react";

export default function Avatar({ user, size = 40 }) {
  const [failed, setFailed] = useState(false);
  const initial = (user?.name || user?.email || "?").trim().charAt(0).toUpperCase();
  if (user?.image && !failed) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={user.image}
        alt={user.name || "User photo"}
        width={size}
        height={size}
        referrerPolicy="no-referrer"
        onError={() => setFailed(true)}
        className="rounded-full object-cover"
        style={{ width: size, height: size }}
      />
    );
  }
  return (
    <span
      className="grid place-items-center rounded-full bg-primary font-semibold text-primary-content"
      style={{ width: size, height: size, fontSize: size * 0.4 }}
    >
      {initial}
    </span>
  );
}
