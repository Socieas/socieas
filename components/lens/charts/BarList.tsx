const PALETTE = [
  "#7C3AED",
  "#EC4899",
  "#F59E0B",
  "#10B981",
  "#3B82F6",
  "#8B5CF6",
  "#F43F5E",
  "#14B8A6",
];

export function BarList({
  items,
}: {
  items: Array<{ label: string; value: number }>;
}) {
  const total = items.reduce((acc, it) => acc + it.value, 0);
  if (items.length === 0 || total <= 0) return null;

  let acc = 0;
  const segments = items.map((it, i) => {
    const start = (acc / total) * 360;
    acc += it.value;
    const end = (acc / total) * 360;
    return `${PALETTE[i % PALETTE.length]} ${start}deg ${end}deg`;
  });

  return (
    <div className="flex flex-col items-center gap-5 sm:flex-row">
      <div
        aria-hidden
        className="relative h-32 w-32 shrink-0 rounded-full"
        style={{ background: `conic-gradient(${segments.join(", ")})` }}
      >
        <div className="absolute inset-3 flex items-center justify-center rounded-full bg-surface">
          <span className="px-2 text-center text-xs font-bold text-muted">
            {Math.round(total).toLocaleString("en-US")}
          </span>
        </div>
      </div>
      <ul className="w-full min-w-0 flex-1 space-y-1.5">
        {items.map((it, i) => (
          <li key={it.label} className="flex items-center gap-2 text-sm">
            <span
              aria-hidden
              className="h-2.5 w-2.5 shrink-0 rounded-full"
              style={{ backgroundColor: PALETTE[i % PALETTE.length] }}
            />
            <span className="min-w-0 flex-1 truncate text-muted">
              {it.label}
            </span>
            <span className="font-semibold">
              {Math.round(it.value).toLocaleString("en-US")}
            </span>
            <span className="w-10 text-right text-xs font-bold text-muted">
              {((it.value / total) * 100).toFixed(0)}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}