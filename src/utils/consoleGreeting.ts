let greeted = false;

// A note for the developers who open DevTools on a portfolio (they always do).
export function consoleGreeting() {
  if (greeted) return;
  greeted = true;

  const title = [
    "font: 700 22px/1.4 Poppins, sans-serif",
    "background: linear-gradient(90deg, #22d3ee, #4db5ff, #8b5cf6)",
    "color: #0b0b1a",
    "padding: 6px 14px",
    "border-radius: 8px",
  ].join(";");
  const body = "font: 13px/1.6 'JetBrains Mono', monospace; color: #a78bfa";
  const accent = "font: 13px/1.6 'JetBrains Mono', monospace; color: #22d3ee";

  console.log("%c Hey, fellow developer 👋 ", title);
  console.log(
    "%cYou're looking under the hood — I like that.\n" +
      "This site is React 19 + Vite with hand-written CSS: no UI kit, no animation library.\n" +
      "%c→ Press Ctrl/⌘ + K to try the command palette.\n" +
      "→ Hiring? osamamegahed2468@gmail.com",
    body,
    accent,
  );
}
