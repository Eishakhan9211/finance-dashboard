"use client";

import { useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const ROWS = [
  { month: "Jan-2026", category: "Food", amount: 5200 },
  { month: "Jan-2026", category: "Grocery", amount: 7200 },
  { month: "Jan-2026", category: "Travel", amount: 4500 },
  { month: "Jan-2026", category: "Health", amount: 1800 },
  { month: "Jan-2026", category: "Shopping", amount: 9800 },
  { month: "Jan-2026", category: "Billing", amount: 2500 },
  { month: "Feb-2026", category: "Food", amount: 6100 },
  { month: "Feb-2026", category: "Grocery", amount: 8500 },
  { month: "Feb-2026", category: "Travel", amount: 3800 },
  { month: "Feb-2026", category: "Health", amount: 2200 },
  { month: "Feb-2026", category: "Shopping", amount: 11200 },
  { month: "Feb-2026", category: "Billing", amount: 2900 },
  { month: "Mar-2026", category: "Food", amount: 4800 },
  { month: "Mar-2026", category: "Grocery", amount: 6800 },
  { month: "Mar-2026", category: "Travel", amount: 4100 },
  { month: "Mar-2026", category: "Health", amount: 1400 },
  { month: "Mar-2026", category: "Shopping", amount: 9500 },
  { month: "Mar-2026", category: "Billing", amount: 2600 },
  { month: "Apr-2026", category: "Food", amount: 5700 },
  { month: "Apr-2026", category: "Grocery", amount: 7900 },
  { month: "Apr-2026", category: "Travel", amount: 3300 },
  { month: "Apr-2026", category: "Health", amount: 1950 },
  { month: "Apr-2026", category: "Shopping", amount: 10500 },
  { month: "Apr-2026", category: "Billing", amount: 2800 },
] as const;

const MONTH_ORDER = ["Jan-2026", "Feb-2026", "Mar-2026", "Apr-2026"] as const;

type Month = (typeof MONTH_ORDER)[number];

const PIE_COLORS = [
  "#22c55e",
  "#3b82f6",
  "#a855f7",
  "#f97316",
  "#ec4899",
  "#eab308",
];

function formatRs(n: number) {
  return `Rs. ${n.toLocaleString("en-PK")}`;
}

export default function Home() {
  const months = useMemo(() => {
    const set = new Set(ROWS.map((r) => r.month));
    return MONTH_ORDER.filter((m) => set.has(m));
  }, []);

  const [selectedMonth, setSelectedMonth] = useState<Month>(months[0] ?? "Jan-2026");
  const [showPie, setShowPie] = useState(false);
  const [showTable, setShowTable] = useState(false);

  const filtered = useMemo(
    () => ROWS.filter((r) => r.month === selectedMonth),
    [selectedMonth],
  );

  const totalSpent = useMemo(
    () => filtered.reduce((s, r) => s + r.amount, 0),
    [filtered],
  );

  const barData = useMemo(() => {
    const map = new Map<string, number>();
    for (const r of filtered) {
      map.set(r.category, (map.get(r.category) ?? 0) + r.amount);
    }
    return [...map.entries()]
      .map(([category, amount]) => ({ category, amount }))
      .sort((a, b) => b.amount - a.amount);
  }, [filtered]);

  const pieData = useMemo(
    () => barData.map((d) => ({ name: d.category, value: d.amount })),
    [barData],
  );

  return (
    <div className="mx-auto flex min-h-screen max-w-6xl flex-col gap-6 px-4 py-8 md:flex-row md:px-8">
      <aside className="h-fit w-full shrink-0 rounded-xl border border-slate-700/60 bg-[var(--card)] p-5 md:sticky md:top-8 md:w-64">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-[var(--muted)]">
          Filters
        </h2>
        <label className="mb-1 block text-sm text-slate-300">Select Month</label>
        <select
          className="w-full rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none ring-green-500/40 focus:ring-2"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value as Month)}
        >
          {months.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
      </aside>

      <main className="min-w-0 flex-1 space-y-8">
        <header>
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            <span className="mr-2" aria-hidden>
              💰
            </span>
            Personal Finance Tracker
          </h1>
        </header>

        <section>
          <h2 className="mb-4 text-xl font-semibold">
            📅 Spending Report — {selectedMonth}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-slate-700/60 bg-[var(--card)] p-6">
              <p className="text-sm text-slate-400">Total Transactions</p>
              <p className="mt-1 text-2xl font-semibold tabular-nums">
                {filtered.length}
              </p>
            </div>
            <div className="rounded-xl border border-slate-700/60 bg-[var(--card)] p-6">
              <p className="text-sm text-slate-400">Total Spent</p>
              <p className="mt-1 text-2xl font-semibold tabular-nums text-[var(--accent)]">
                {formatRs(totalSpent)}
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-semibold">Spending by Category</h2>
          <div className="h-[320px] w-full rounded-xl border border-slate-700/60 bg-[var(--card)] p-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ top: 8, right: 8, left: 8, bottom: 8 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="category" tick={{ fill: "#94a3b8", fontSize: 12 }} />
                <YAxis tick={{ fill: "#94a3b8", fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1e293b",
                    border: "1px solid #475569",
                    borderRadius: "8px",
                  }}
                  labelStyle={{ color: "#e2e8f0" }}
                  formatter={(value: number) => [formatRs(value), "Amount"]}
                />
                <Bar dataKey="amount" fill="#22c55e" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="flex flex-col gap-3">
          <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-300">
            <input
              type="checkbox"
              checked={showPie}
              onChange={(e) => setShowPie(e.target.checked)}
              className="h-4 w-4 rounded border-slate-500 bg-slate-800 text-green-500 focus:ring-green-500/40"
            />
            Show Pie Chart
          </label>
          {showPie && (
            <div className="h-[380px] w-full rounded-xl border border-slate-700/60 bg-[var(--card)] p-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    label={({ name, percent }) =>
                      `${name} ${((percent ?? 0) * 100).toFixed(1)}%`
                    }
                  >
                    {pieData.map((_, i) => (
                      <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1e293b",
                      border: "1px solid #475569",
                      borderRadius: "8px",
                    }}
                    formatter={(value: number) => formatRs(value)}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
        </section>

        <section className="flex flex-col gap-3">
          <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-300">
            <input
              type="checkbox"
              checked={showTable}
              onChange={(e) => setShowTable(e.target.checked)}
              className="h-4 w-4 rounded border-slate-500 bg-slate-800 text-green-500 focus:ring-green-500/40"
            />
            Show All Transactions
          </label>
          {showTable && (
            <div className="overflow-x-auto rounded-xl border border-slate-700/60 bg-[var(--card)]">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-600 text-slate-400">
                    <th className="px-4 py-3 font-medium">#</th>
                    <th className="px-4 py-3 font-medium">Month</th>
                    <th className="px-4 py-3 font-medium">Category</th>
                    <th className="px-4 py-3 font-medium text-right">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((row, i) => (
                    <tr
                      key={`${row.month}-${row.category}-${i}`}
                      className="border-b border-slate-700/50 last:border-0"
                    >
                      <td className="px-4 py-3 tabular-nums text-slate-500">{i + 1}</td>
                      <td className="px-4 py-3">{row.month}</td>
                      <td className="px-4 py-3">{row.category}</td>
                      <td className="px-4 py-3 text-right tabular-nums">
                        {formatRs(row.amount)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <p className="text-center text-xs text-slate-500">
          Personal Finance Dashboard — 2026
        </p>
      </main>
    </div>
  );
}
