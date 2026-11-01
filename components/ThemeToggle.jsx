"use client";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState("booknook");

  useEffect(() => {
    setTheme(document.documentElement.getAttribute("data-theme") || "booknook");
  }, []);

  function toggle() {
    const next = theme === "booknook" ? "booknookdark" : "booknook";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("booknook-theme", next);
    } catch {}
  }

  const dark = theme === "booknookdark";
  return (
    <button
      type="button"
      onClick={toggle}
      className="btn btn-ghost btn-circle"
      aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
    >
      {dark ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}
