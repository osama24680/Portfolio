import { useEffect, useRef, useState } from "react";

const prefersMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(pointer: fine)").matches &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Feeds the pointer position into CSS variables on the hero, eased each frame:
 *   --mx / --my  pointer position in px (spotlight + lit grid)
 *   --px / --py  position normalised to -1…1 (3D tilt + parallax depth)
 * Also writes live coordinates into `readoutRef`. No React re-renders —
 * everything goes straight to the DOM. The loop sleeps once it has settled.
 */
export function useHeroPointer(heroRef, readoutRef) {
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero || !prefersMotion()) return;

    const target = { x: 0, y: 0, nx: 0, ny: 0 };
    const pos = { x: 0, y: 0, nx: 0, ny: 0 };
    let frame = 0;

    const tick = () => {
      let moving = false;
      for (const k of ["x", "y", "nx", "ny"]) {
        const delta = target[k] - pos[k];
        pos[k] += delta * 0.12;
        if (Math.abs(delta) > 0.001) moving = true;
      }
      hero.style.setProperty("--mx", `${pos.x}px`);
      hero.style.setProperty("--my", `${pos.y}px`);
      hero.style.setProperty("--px", pos.nx.toFixed(4));
      hero.style.setProperty("--py", pos.ny.toFixed(4));
      frame = moving ? requestAnimationFrame(tick) : 0;
    };

    const onMove = (e) => {
      const rect = hero.getBoundingClientRect();
      target.x = e.clientX - rect.left;
      target.y = e.clientY - rect.top;
      target.nx = (target.x / rect.width) * 2 - 1;
      target.ny = (target.y / rect.height) * 2 - 1;
      if (readoutRef.current) {
        readoutRef.current.textContent = `x ${String(Math.round(target.x)).padStart(4, "0")} · y ${String(
          Math.round(target.y)
        ).padStart(4, "0")}`;
      }
      hero.classList.add("is-pointer");
      if (!frame) frame = requestAnimationFrame(tick);
    };

    const onLeave = () => {
      // drift back to centre
      target.nx = 0;
      target.ny = 0;
      hero.classList.remove("is-pointer");
      if (!frame) frame = requestAnimationFrame(tick);
    };

    hero.addEventListener("pointermove", onMove);
    hero.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      hero.removeEventListener("pointermove", onMove);
      hero.removeEventListener("pointerleave", onLeave);
    };
  }, [heroRef, readoutRef]);
}

/**
 * Typewriter: types each word, holds, deletes, moves to the next.
 * Reduced-motion users just get the words swapping without the typing.
 */
export function useTypewriter(words, { type = 65, erase = 35, hold = 1600 } = {}) {
  const [text, setText] = useState("");
  const state = useRef({ word: 0, deleting: false, text: "" });

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setText(words[0]);
      const id = setInterval(() => {
        state.current.word = (state.current.word + 1) % words.length;
        setText(words[state.current.word]);
      }, 2600);
      return () => clearInterval(id);
    }

    let timeout;
    // the typed text lives in the ref; state only mirrors it for rendering,
    // so no side effects run inside a state updater (StrictMode-safe)
    const step = () => {
      const s = state.current;
      const full = words[s.word];
      const current = s.text || "";
      let delay;

      if (!s.deleting && current === full) {
        s.deleting = true;
        delay = hold;
      } else if (s.deleting && current === "") {
        s.deleting = false;
        s.word = (s.word + 1) % words.length;
        delay = type * 4;
      } else {
        s.text = s.deleting ? full.slice(0, current.length - 1) : full.slice(0, current.length + 1);
        setText(s.text);
        delay = s.deleting ? erase : type;
      }
      timeout = setTimeout(step, delay);
    };
    timeout = setTimeout(step, 500);
    return () => clearTimeout(timeout);
  }, [words, type, erase, hold]);

  return text;
}

/** Magnetic hover: the element leans toward the pointer while it is over it. */
export function magnetic(strength = 0.3) {
  return {
    onMouseMove: (e) => {
      if (!prefersMotion()) return;
      const el = e.currentTarget;
      const rect = el.getBoundingClientRect();
      const dx = e.clientX - (rect.left + rect.width / 2);
      const dy = e.clientY - (rect.top + rect.height / 2);
      el.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`;
    },
    onMouseLeave: (e) => {
      e.currentTarget.style.transform = "";
    },
  };
}
