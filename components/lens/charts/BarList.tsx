export function BarList({
  items,
}: {
  items: { label: string; value: number; display?: string }[];
}) {
  const max = Math.max(...items.map((i) => i.value), 1);
  return (
    <div className="flex flex-col gap-2.5">
      {items.map((i) => (
        <div key={i.label}>
          <div className="flex items-center justify-between gap-2 text-xs">
            <span className="min-w-0 truncate text-muted">{i.label}</span>
            <span className="shrink-0 font-semibold">
              {i.display ?? Math.round(i.value).toLocaleString("en-US")}
            </span>
          </div>
          <div className="mt-1 h-2 rounded-full bg-raised">
            <div
              className="h-2 rounded-full bg-brand"
              style={{ width: `${Math.max((i.value / max) * 100, 2)}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}