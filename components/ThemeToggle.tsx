"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {

  const [dark, setDark] = useState<boolean | null>(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    setDark(savedTheme === "dark");
  }, []);

  useEffect(() => {
    if (dark === null) return;

    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    <button
      onClick={() => setDark(!dark)}
      className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] transition-all duration-300"
    >

      <div className="relative h-5 w-5">

        <div
          className={`absolute inset-0 rounded-full border-2 border-[var(--text)] transition-all duration-300 ${
            dark ? "scale-0 opacity-0" : "scale-100 opacity-100"
          }`}
        />

        <div
          className={`absolute inset-0 rounded-full border-2 border-[var(--text)] transition-all duration-300 ${
            dark ? "scale-100 opacity-100" : "scale-0 opacity-0"
          }`}
          style={{
            clipPath: "polygon(40% 0%, 100% 0%, 100% 100%, 40% 100%)",
          }}
        />

      </div>

    </button>
  );
}