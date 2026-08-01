export type Insight = { title: string; detail: string };

export type MetricRow = {
  provider: string;
  metric: string;
  date: string;
  value: number;
  dimension: string | null;
};

const DAY_NAMES = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const POST_WINDOWS: Record<string, string> = {
  facebook: "9:00 AM and 12:00 PM",
  instagram: "11:00 AM and 1:00 PM",
  youtube: "5:00 PM and 8:00 PM",
};

function sum(rows: MetricRow[], metric: string, from: string, toNext: string) {
  let total = 0;
  for (const r of rows) {
    if (r.metric === metric && !r.dimension && r.date >= from && r.date < toNext) {
      total += r.value;
    }
  }
  return total;
}

function avg(
  rows: MetricRow[],
  metric: string,
  from: string,
  toNext: string,
): number | null {
  const vals = rows.filter(
    (r) =>
      r.metric === metric && !r.dimension && r.date >= from && r.date < toNext,
  );
  if (vals.length === 0) return null;
  return vals.reduce((acc, r) => acc + r.value, 0) / vals.length;
}

function dims(rows: MetricRow[], metric: string) {
  return rows
    .filter((r) => r.metric === metric && r.dimension)
    .sort((a, b) => b.value - a.value)
    .map((r) => ({ label: String(r.dimension), value: r.value }));
}

export function bestPostDay(rows: MetricRow[], metric: string): string | null {
  const totals = new Array(7).fill(0) as number[];
  const counts = new Array(7).fill(0) as number[];
  let points = 0;
  for (const r of rows) {
    if (r.metric !== metric || r.dimension) continue;
    const day = new Date(`${r.date}T00:00:00Z`).getUTCDay();
    totals[day] += r.value;
    counts[day] += 1;
    points += 1;
  }
  if (points < 7) return null;
  let best = -1;
  let bestAvg = -1;
  for (let d = 0; d < 7; d++) {
    if (counts[d] === 0) continue;
    const a = totals[d] / counts[d];
    if (a > bestAvg) {
      bestAvg = a;
      best = d;
    }
  }
  return best >= 0 ? DAY_NAMES[best] : null;
}

export function websiteInsights(
  rows: MetricRow[],
  from: string,
  toNext: string,
  prevFrom: string,
): Insight[] {
  const out: Insight[] = [];
  const cur = sum(rows, "sessions", from, toNext);
  const prev = sum(rows, "sessions", prevFrom, from);
  if (cur > 0 && prev > 0) {
    const pct = ((cur - prev) / prev) * 100;
    out.push(
      pct >= 0
        ? {
            title: "Traffic is growing",
            detail: `Sessions are up ${pct.toFixed(1)}% versus the previous period. Invest more in the channels and content behind this rise.`,
          }
        : {
            title: "Traffic dipped",
            detail: `Sessions are down ${Math.abs(pct).toFixed(1)}% versus the previous period. Check the channel chart to see which source slowed.`,
          },
    );
  }
  const channels = dims(rows, "traffic_channel");
  if (channels.length > 0) {
    const total = channels.reduce((acc, c) => acc + c.value, 0);
    const top = channels[0];
    const share = total > 0 ? Math.round((top.value / total) * 100) : 0;
    out.push({
      title: "Strongest channel",
      detail: `${top.label} brings ${share}% of all traffic. Run one experiment on a second channel so growth never depends on a single source.`,
    });
  }
  const er = avg(rows, "engagement_rate", from, toNext);
  if (er != null) {
    out.push(
      er < 40
        ? {
            title: "Engagement can improve",
            detail: `The engagement rate is ${er.toFixed(1)}%. Stronger page introductions and internal links will keep visitors exploring longer.`,
          }
        : {
            title: "Healthy engagement",
            detail: `The engagement rate is ${er.toFixed(1)}%, a strong signal that content matches what visitors are looking for.`,
          },
    );
  }
  return out;
}

export function searchInsights(
  rows: MetricRow[],
  from: string,
  toNext: string,
): Insight[] {
  const out: Insight[] = [];
  const clicks = sum(rows, "clicks", from, toNext);
  const impressions = sum(rows, "impressions", from, toNext);
  if (impressions > 500) {
    const ctr = (clicks / impressions) * 100;
    out.push(
      ctr < 2
        ? {
            title: "Titles need attention",
            detail: `Google shows these pages often but only ${ctr.toFixed(2)}% of viewers click. Rewriting page titles and descriptions is the fastest free win here.`,
          }
        : {
            title: "Search snippets are working",
            detail: `A click rate of ${ctr.toFixed(2)}% shows titles and descriptions are earning their impressions.`,
          },
    );
  }
  const queries = dims(rows, "top_queries");
  if (queries.length > 0) {
    out.push({
      title: "Winning keyword",
      detail: `"${queries[0].label}" brings the most Google clicks. Publish supporting content around this topic to own it completely.`,
    });
  }
  const pos = avg(rows, "avg_position", from, toNext);
  if (pos != null && pos > 10) {
    out.push({
      title: "Page two opportunity",
      detail: `The average Google position is ${pos.toFixed(1)}, just past page one. Refreshing older posts and adding internal links can push them over the line.`,
    });
  }
  return out;
}

export function socialInsights(
  rows: MetricRow[],
  provider: string,
  from: string,
  toNext: string,
): Insight[] {
  const out: Insight[] = [];
  const day = bestPostDay(rows, provider === "youtube" ? "views" : "engagements");
  const window = POST_WINDOWS[provider] ?? "11:00 AM and 1:00 PM";
  out.push(
    day
      ? {
          title: "Best time to post",
          detail: `Your audience engages most on ${day}s. Lens AI recommends publishing between ${window} local time on that day.`,
        }
      : {
          title: "Best time to post",
          detail: `Not enough history yet for a personal answer. Until then, publish between ${window} local time, the strongest general window for this platform.`,
        },
  );
  const change = sum(rows, "follower_change", from, toNext);
  if (change !== 0) {
    out.push(
      change > 0
        ? {
            title: "Audience momentum",
            detail: `A net gain of ${Math.round(change).toLocaleString("en-US")} followers this period. Keep the current posting rhythm going.`,
          }
        : {
            title: "Audience is slipping",
            detail: `A net loss of ${Math.abs(Math.round(change)).toLocaleString("en-US")} followers this period. Review which recent posts underperformed and adjust the content mix.`,
          },
    );
  }
  if (provider === "youtube") {
    const views = sum(rows, "views", from, toNext);
    const minutes = sum(rows, "watch_minutes", from, toNext);
    if (views > 0 && minutes > 0) {
      const perView = minutes / views;
      out.push({
        title: "Watch depth",
        detail: `Viewers watch about ${perView.toFixed(1)} minutes per view. ${perView >= 2 ? "Strong retention, longer videos are safe to try." : "Tighten video openings, the first 30 seconds decide retention."}`,
      });
    }
  } else {
    const reach = sum(rows, "reach", from, toNext);
    const eng = sum(rows, "engagements", from, toNext);
    if (reach > 0 && eng > 0) {
      const rate = (eng / reach) * 100;
      out.push({
        title: "Engagement quality",
        detail: `${rate.toFixed(1)}% of people reached actually engage. ${rate >= 3 ? "That is above typical benchmarks, this content style works." : "Try more question posts, carousels and reels to lift interaction."}`,
      });
    }
  }
  return out;
}