"use client";

import { Search } from "lucide-react";
import Topbar from "@/components/layout/Topbar";

const HELP_CATEGORIES = [
  { title: "Getting started", desc: "Set up your first week, energy windows, and priority pyramid." },
  { title: "Understanding your score", desc: "How the weekly life score is calculated and why one bad day won't tank it." },
  { title: "AI reflection", desc: "How WiseWeek finds behavioral patterns instead of just summarizing tasks." },
  { title: "Reality check", desc: "What Healthy, Busy, and Impossible week ratings mean and how to fix them." },
  { title: "Billing", desc: "Manage your plan, invoices, and trial." },
  { title: "Contact support", desc: "Reach a real person, usually within a few hours." },
];

export default function HelpPage() {
  return (
    <>
      <Topbar title="Help" sub="Guides and support" />
      <div className="flex-1 overflow-y-auto p-7">
        <div className="mb-6 flex items-center gap-2.5 rounded-2xl border border-line bg-surface px-5 py-4 text-sm text-text-dim">
          <Search size={15} />
          Search help articles…
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {HELP_CATEGORIES.map((c) => (
            <div key={c.title} className="card">
              <h3 className="mb-1.5 text-sm font-semibold text-text">{c.title}</h3>
              <p className="text-xs text-text-dim">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
