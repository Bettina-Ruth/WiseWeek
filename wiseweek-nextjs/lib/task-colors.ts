import { Tier, Energy, RealityRating } from "@/types";
import { AVAILABLE_HOURS } from "./mock-data";

const tierBgVar: Record<Tier, string> = {
  must: "var(--pri-must-bg)",
  should: "var(--pri-should-bg)",
  nice: "var(--pri-nice-bg)",
};
const tierBorderVar: Record<Tier, string> = {
  must: "var(--pri-must-border)",
  should: "var(--pri-should-border)",
  nice: "var(--pri-nice-border)",
};
const energyBgVar: Record<Energy, string> = {
  high: "var(--pri-must-bg)",
  med: "var(--pri-should-bg)",
  low: "var(--pri-nice-bg)",
};

/** Left = priority color, right = energy color — the task card's signature two-tone gradient. */
export function taskGradient(tier: Tier, energy: Energy): string {
  return `linear-gradient(90deg, ${tierBgVar[tier]} 0%, ${energyBgVar[energy]} 100%)`;
}

export function taskBorderColor(tier: Tier): string {
  return tierBorderVar[tier];
}

export const categoryColorVar: Record<string, string> = {
  Work: "var(--clay)",
  Study: "var(--indigo)",
  Sleep: "var(--sage)",
  Exercise: "var(--warn)",
  Friends: "var(--indigo)",
  Family: "var(--sage)",
  Hobbies: "var(--warn)",
  Reading: "var(--indigo)",
  "Self care": "var(--sage)",
};

export function realityRating(plannedHours: number): RealityRating {
  const ratio = plannedHours / AVAILABLE_HOURS;
  if (ratio < 0.75) return { cls: "healthy", label: "Healthy Week", icon: "✓" };
  if (ratio < 1) return { cls: "busy", label: "Busy Week", icon: "⚠" };
  return { cls: "impossible", label: "Impossible Week", icon: "✕" };
}

export const realityBadgeClasses: Record<RealityRating["cls"], string> = {
  healthy: "bg-sage-soft text-sage-text",
  busy: "bg-warn-soft text-warn",
  impossible: "bg-clay-soft text-clay",
};
