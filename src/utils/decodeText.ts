const GLYPHS = "!<>-_\/[]{}=+*^?#01";

/**
 * "Decodes" an element's text: characters cycle through code glyphs and lock
 * in from left to right until the original text is back. Only touches plain
 * text nodes, and always restores the exact original string at the end.
 */
export function decodeText(el: HTMLElement, duration = 700) {
  const node = Array.from(el.childNodes).find(
    (n) => n.nodeType === Node.TEXT_NODE && n.textContent?.trim(),
  );
  if (!node || !node.textContent) return;

  const original = node.textContent;
  const start = performance.now();

  const frame = (now: number) => {
    const progress = Math.min((now - start) / duration, 1);
    const locked = Math.floor(progress * original.length);
    let out = original.slice(0, locked);
    for (let i = locked; i < original.length; i++) {
      out +=
        original[i] === " "
          ? " "
          : GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
    }
    node.textContent = progress < 1 ? out : original;
    if (progress < 1) requestAnimationFrame(frame);
  };
  requestAnimationFrame(frame);

  // safety net: whatever happens to the animation, end on the real text
  window.setTimeout(() => {
    node.textContent = original;
  }, duration + 300);
}
