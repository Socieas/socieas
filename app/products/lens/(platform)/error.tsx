"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-6">
      <div className="max-w-md text-center">
        <h2 className="text-xl font-bold tracking-tight">
          Something went wrong
        </h2>
        <p className="mt-2 text-sm text-muted">
          This page hit an unexpected error. Try again, and if it keeps
          happening let the team know.
        </p>
        <button
          onClick={() => reset()}
          className="mt-6 rounded-xl bg-brand px-5 py-2.5 text-sm font-semibold text-white"
        >
          Try again
        </button>
      </div>
    </div>
  );
}