import { useEffect, useRef, useState } from "react";
import "./Cursor.css";

const INTERACTIVE = "a, button, [role='button'], input, textarea, .gallery_item, .lux_card";

/**
 * Aqua dot that tracks the pointer exactly + a violet ring that trails it with
 * easing (linear interpolation each frame). Only on precise pointers (mouse),
 * never on touch, and disabled for reduced-motion users.
 */
export default function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);
  const [enabled] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    if (!enabled) return;
    const target = { x: -100, y: -100 };
    const pos = { x: -100, y: -100 };
    let frame = 0;

    const tick = () => {
      // ease 18% of the remaining distance per frame
      pos.x += (target.x - pos.x) * 0.18;
      pos.y += (target.y - pos.y) * 0.18;
      ring.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      frame = requestAnimationFrame(tick);
    };

    const onMove = (e) => {
      target.x = e.clientX;
      target.y = e.clientY;
      dot.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      document.documentElement.classList.add("cursor-active");
    };

    const onOver = (e) => {
      const hovering = e.target.closest?.(INTERACTIVE);
      // interactive cards get a soft ring; links & buttons get a bold one
      const strong = hovering && hovering.matches("a, button, [role='button'], input, textarea, .gallery_item");
      ring.current.classList.toggle("is-hover", Boolean(hovering));
      ring.current.classList.toggle("is-strong", Boolean(strong));
    };

    const onLeave = () => document.documentElement.classList.remove("cursor-active");
    const onDown = () => ring.current.classList.add("is-down");
    const onUp = () => ring.current.classList.remove("is-down");

    frame = requestAnimationFrame(tick);
    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.documentElement.classList.remove("cursor-active");
    };
  }, [enabled]);

  if (!enabled) return null;
  return (
    <>
      <div className="cursor_ring" ref={ring} aria-hidden="true">
        <span />
      </div>
      <div className="cursor_dot" ref={dot} aria-hidden="true" />
    </>
  );
}
