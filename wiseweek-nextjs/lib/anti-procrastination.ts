interface StepTemplate {
  kws: string[];
  steps: (title: string) => string[];
}

const TEMPLATES: StepTemplate[] = [
  {
    kws: ["write", "report", "draft", "doc", "blog", "post", "proposal", "outline"],
    steps: (T) => [
      `Open a blank doc for "${T}"`,
      "Write just the title",
      "Sketch a 3-bullet outline",
      "Draft the first paragraph",
      "Write one more section",
    ],
  },
  {
    kws: ["review", "feedback", "pr ", "pull request", "design review"],
    steps: (T) => [
      `Open "${T}" and skim it once`,
      "Note your first reaction",
      "Leave one comment",
      "Leave a second comment",
      "Write your overall verdict",
    ],
  },
  {
    kws: ["meeting", "call", "1:1", "standup", "sync", "demo"],
    steps: (T) => [
      `Open the invite for "${T}"`,
      "Jot down one talking point",
      "Jot two more talking points",
      "Note what you need from others",
      "Send a quick agenda",
    ],
  },
  {
    kws: ["clean", "organize", "tidy", "laundry", "dishes", "declutter"],
    steps: (T) => [
      `Pick one small corner for "${T}"`,
      "Clear just that one spot",
      "Do one more spot",
      "Put 5 things away",
      "Do a final sweep",
    ],
  },
  {
    kws: ["ship", "code", "build", "fix", "bug", "feature", "staging", "deploy", "onboarding"],
    steps: (T) => [
      `Open the project for "${T}"`,
      "Write one TODO or failing test",
      "Build the smallest working piece",
      "Run it and see what breaks",
      "Fix it up and clean it",
    ],
  },
  {
    kws: ["read", "research", "study", "paper", "learn", "papers"],
    steps: (T) => [
      `Open the material for "${T}"`,
      "Read just the first page",
      "Note one takeaway",
      "Read a little further",
      "Summarize it in 2 lines",
    ],
  },
  {
    kws: ["email", "reply", "thread", "message", "client proposal"],
    steps: (T) => [
      `Open the thread for "${T}"`,
      "Re-read what they actually asked",
      "Draft one sentence back",
      "Add any details still needed",
      "Hit send",
    ],
  },
  {
    kws: ["gym", "exercise", "run", "workout", "rest", "sleep"],
    steps: (T) => [
      `Put on clothes for "${T}"`,
      "Do just 2 minutes of it",
      "Keep going a little longer",
      "Push through the middle stretch",
      "Cool down and finish",
    ],
  },
];

export const AP_COLORS = ["#B5654A", "#C9A455", "#7480A3", "#71917A", "#C9A455"];

export function generateAntiProcSteps(title: string): string[] {
  const T = title || "this task";
  const lower = T.toLowerCase();
  for (const tpl of TEMPLATES) {
    if (tpl.kws.some((k) => lower.includes(k))) return tpl.steps(T);
  }
  return [
    `Open up "${T}"`,
    "Take the tiniest first action on it",
    "Build the core piece of it",
    "Refine what you've done",
    `Wrap up "${T}"`,
  ];
}
