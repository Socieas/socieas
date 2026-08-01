"use client";

import { FileDown } from "lucide-react";

export function CsvButton({
  rows,
  filename,
}: {
  rows: string[][];
  filename: string;
}) {
  function download() {
    const csv = rows
      .map((r) =>
        r.map((cell) => '"' + String(cell).replaceAll('"', '""') + '"').join(","),
      )
      .join("\n");
    const blob = new Blob(["\ufeff" + csv], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <button
      type="button"
      onClick={download}
      className="flex items-center gap-2 rounded-xl border border-line px-4 py-2 text-sm font-semibold text-brand print:hidden"
    >
      <FileDown className="h-4 w-4" />
      Download CSV
    </button>
  );
}