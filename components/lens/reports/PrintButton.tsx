"use client";

import { Printer } from "lucide-react";

export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="flex items-center gap-2 rounded-xl bg-brand px-4 py-2 text-sm font-semibold text-white print:hidden"
    >
      <Printer className="h-4 w-4" />
      Download PDF
    </button>
  );
}