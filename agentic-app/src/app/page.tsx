/* eslint-disable react/no-unescaped-entities */
"use client";

import { useCallback, useState } from "react";

type Channel = "chat" | "email" | "call";

type AutomationResponse = {
  intent: string;
  reply: string;
  time: string;
};

const initialForm = {
  message: "",
  channel: "chat" as Channel,
  customerName: "Customer",
};

export default function Home() {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AutomationResponse | null>(null);

  const updateField = useCallback(
    <Field extends keyof typeof initialForm>(field: Field, value: (typeof initialForm)[Field]) => {
      setForm((prev) => ({ ...prev, [field]: value }));
    },
    [],
  );

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setError(null);
      setLoading(true);
      setResult(null);

      try {
        const response = await fetch("/api/ai", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: form.message,
            channel: form.channel,
            customer_name: form.customerName,
          }),
        });

        if (!response.ok) {
          const data = (await response.json()) as { error?: string };
          throw new Error(data.error ?? "Unexpected error");
        }

        const data = (await response.json()) as AutomationResponse;
        setResult(data);
      } catch (submitError) {
        console.error("Automation submit error:", submitError);
        setError(submitError instanceof Error ? submitError.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    },
    [form],
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex min-h-screen max-w-5xl flex-col gap-12 px-6 py-12 lg:flex-row">
        <section className="flex-1 space-y-6">
          <header className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900 px-3 py-1 text-xs uppercase tracking-wide text-slate-400">
              NextPlay AI Business Automation
            </div>
            <h1 className="text-3xl font-semibold leading-tight md:text-4xl">
              Automate every customer touchpoint with a single AI brain.
            </h1>
            <p className="max-w-xl text-slate-400">
              Centralize intent detection, sales, support, payments, and call scheduling in one place.
              Drop in a message and let the automation engine handle the rest.
            </p>
          </header>

          <form onSubmit={handleSubmit} className="space-y-6 rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-xl shadow-slate-950/40 backdrop-blur">
            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium text-slate-200">
                Customer Message
              </label>
              <textarea
                id="message"
                required
                value={form.message}
                onChange={(event) => updateField("message", event.target.value)}
                className="h-36 w-full resize-none rounded-xl border border-slate-800 bg-slate-950/50 px-4 py-3 text-sm text-slate-100 shadow-inner shadow-black/40 ring-offset-slate-950 placeholder:text-slate-500 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/30"
                placeholder="Type or paste the latest customer interaction here..."
              />
            </div>

            <div className="flex flex-col gap-4 md:flex-row">
              <div className="w-full space-y-2">
                <label htmlFor="channel" className="text-sm font-medium text-slate-200">
                  Channel
                </label>
                <div className="grid grid-cols-3 gap-2 rounded-xl bg-slate-950/40 p-1">
                  {(["chat", "email", "call"] as Channel[]).map((channel) => {
                    const isActive = form.channel === channel;
                    return (
                      <button
                        key={channel}
                        type="button"
                        onClick={() => updateField("channel", channel)}
                        className={[
                          "rounded-lg px-3 py-2 text-sm font-medium capitalize transition",
                          isActive
                            ? "bg-sky-500 text-white shadow shadow-sky-900/60"
                            : "text-slate-400 hover:bg-slate-800/60",
                        ].join(" ")}
                      >
                        {channel}
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className="w-full space-y-2">
                <label htmlFor="customerName" className="text-sm font-medium text-slate-200">
                  Customer Name
                </label>
                <input
                  id="customerName"
                  type="text"
                  value={form.customerName}
                  onChange={(event) => updateField("customerName", event.target.value)}
                  className="w-full rounded-xl border border-slate-800 bg-slate-950/50 px-4 py-3 text-sm text-slate-100 shadow-inner shadow-black/40 placeholder:text-slate-500 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/30"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || form.message.trim().length === 0}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-sky-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-900/70 transition hover:bg-sky-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-950 focus:ring-sky-400 disabled:cursor-not-allowed disabled:bg-slate-700/70 disabled:text-slate-300"
            >
              {loading ? "Automating..." : "Run Automation"}
            </button>

            {error ? (
              <div className="rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                {error}
              </div>
            ) : null}
          </form>
        </section>

        <aside className="flex-1 space-y-6">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 shadow-inner shadow-black/50">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-400">
              Automation Response
            </h2>
            {result ? (
              <div className="mt-4 space-y-4">
                <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-3">
                  <span className="text-xs uppercase tracking-wide text-slate-400">Detected Intent</span>
                  <span className="rounded-full bg-slate-800 px-3 py-1 text-xs font-medium text-sky-300">
                    {result.intent}
                  </span>
                </div>
                <div className="space-y-2">
                  <span className="text-xs uppercase tracking-wide text-slate-400">AI Reply</span>
                  <p className="whitespace-pre-line rounded-xl border border-slate-800 bg-slate-950/40 p-4 text-sm leading-relaxed text-slate-100">
                    {result.reply}
                  </p>
                </div>
                <div className="text-xs text-slate-500">
                  Generated at {new Date(result.time).toLocaleString()}
                </div>
              </div>
            ) : (
              <div className="mt-4 space-y-3 text-sm text-slate-400">
                <p>Run automation to view detected intent, AI replies, and follow-up actions in real time.</p>
                <ul className="list-disc space-y-2 pl-5">
                  <li>Intelligence is centralized in a single automation brain.</li>
                  <li>Support fallback responses when OpenAI credentials are absent.</li>
                  <li>Optimized for sales, support, payments, and call scheduling.</li>
                </ul>
              </div>
            )}
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/20 p-6 text-sm text-slate-400">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-400">
              Quick Setup
            </h3>
            <ol className="mt-3 space-y-2 list-decimal pl-5 text-xs text-slate-500">
              <li>Add your `OPENAI_API_KEY` to `.env.local`.</li>
              <li>Start the dev server with `npm run dev`.</li>
              <li>Deploy instantly to Vercel when you're ready.</li>
            </ol>
          </div>
        </aside>
      </div>
    </div>
  );
}
