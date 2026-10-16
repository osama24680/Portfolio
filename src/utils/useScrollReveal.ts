import { useEffect } from "react";
import { decodeText } from "./decodeText";

// Elements that fade up into place the first time they scroll into view.
const SELECTOR = [
  "section > h2",
  "section > h5",
  ".lux_card",
  ".gallery_item",
  ".skills_marquee",
  ".project_filters",
  ".gallery_filters",
].join(",");

/**
 * Tags matching elements with `.reveal` and adds `.in` once they enter the
 * viewport. Elements that mount later (tab switches, filters) are never
 * tagged, so they simply render visible — nothing can get stuck hidden.
 */
export function useScrollReveal() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          el.classList.add("in");
          observer.unobserve(el);
          if (el.matches("section > h2")) decodeText(el);
          // once revealed, hand transitions back to the element's own styles
          window.setTimeout(() => {
            el.classList.remove("reveal", "in");
            el.style.removeProperty("--reveal-delay");
          }, 1200);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );

    document.querySelectorAll<HTMLElement>(SELECTOR).forEach((el) => {
      if (el.closest("header")) return;
      // stagger siblings so grids cascade in
      const index = el.parentElement
        ? Array.from(el.parentElement.children).indexOf(el)
        : 0;
      el.style.setProperty("--reveal-delay", `${(index % 4) * 90}ms`);
      el.classList.add("reveal");
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);
}
