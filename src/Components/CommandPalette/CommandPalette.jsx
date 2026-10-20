import { useEffect, useMemo, useRef, useState } from "react";
import {
  FiSearch, FiZap, FiHome, FiUser, FiCode, FiFolder, FiLayers, FiImage, FiMessageSquare,
  FiMail, FiCopy, FiDownload, FiGithub, FiLinkedin, FiArrowUp, FiCommand,
} from "react-icons/fi";
import CV from "../../assets/cv.pdf";
import "./CommandPalette.css";

const EMAIL = "osamamegahed2468@gmail.com";
const isMac = typeof navigator !== "undefined" && /Mac|iPhone|iPad/.test(navigator.platform);

const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
const open = (url) => window.open(url, "_blank", "noopener,noreferrer");

// every command: what it shows, which group it sits in, and what it does
const buildCommands = (notify) => [
  { group: "Navigate", label: "Home", hint: "Top of the page", Icon: FiHome, run: () => scrollTo("header") },
  { group: "Navigate", label: "About", hint: "Me · Experience · Education", Icon: FiUser, run: () => scrollTo("about") },
  { group: "Navigate", label: "The Venture — Vectos (ShoesFit)", hint: "Founder case study", Icon: FiZap, run: () => window.dispatchEvent(new Event("open-venture")) },
  { group: "Navigate", label: "Skills & Toolkit", hint: "Stack and tools", Icon: FiCode, run: () => scrollTo("experience") },
  { group: "Navigate", label: "Projects", hint: "React & Next.js work", Icon: FiFolder, run: () => scrollTo("projects") },
  { group: "Navigate", label: "Services", hint: "What I offer", Icon: FiLayers, run: () => scrollTo("services") },
  { group: "Navigate", label: "Design Gallery", hint: "Photoshop artworks", Icon: FiImage, run: () => scrollTo("gallery") },
  { group: "Navigate", label: "Contact", hint: "Send me a message", Icon: FiMessageSquare, run: () => scrollTo("contact") },
  {
    group: "Actions", label: "Copy email address", hint: EMAIL, Icon: FiCopy,
    run: async () => {
      try {
        await navigator.clipboard.writeText(EMAIL);
        notify("Email copied to clipboard");
      } catch {
        notify(EMAIL);
      }
    },
  },
  { group: "Actions", label: "Send an email", hint: "Opens your mail app", Icon: FiMail, run: () => (window.location.href = `mailto:${EMAIL}`) },
  {
    group: "Actions", label: "Download CV", hint: "PDF", Icon: FiDownload,
    run: () => {
      const a = document.createElement("a");
      a.href = CV;
      a.download = "Osama-Megahed-Frontend-CV.pdf";
      a.click();
    },
  },
  { group: "Actions", label: "Back to top", hint: "Scroll up", Icon: FiArrowUp, run: () => window.scrollTo({ top: 0, behavior: "smooth" }) },
  { group: "Links", label: "GitHub", hint: "github.com/osama24680", Icon: FiGithub, run: () => open("https://github.com/osama24680") },
  { group: "Links", label: "LinkedIn", hint: "in/osama-megahed", Icon: FiLinkedin, run: () => open("https://www.linkedin.com/in/osama-megahed-887b76201/") },
];

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const [toast, setToast] = useState("");
  const [compact, setCompact] = useState(false);
  const inputRef = useRef(null);
  const listRef = useRef(null);

  const commands = useMemo(
    () =>
      buildCommands((message) => {
        setToast(message);
        window.setTimeout(() => setToast(""), 2200);
      }),
    []
  );

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((c) => `${c.label} ${c.hint} ${c.group}`.toLowerCase().includes(q));
  }, [commands, query]);

  // once past the hero, shrink the trigger to an icon so it never covers content
  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // global shortcuts: Ctrl/⌘ + K toggles, "/" opens (unless typing in a field)
  useEffect(() => {
    const onKey = (e) => {
      const typing = /input|textarea/i.test(e.target.tagName) || e.target.isContentEditable;
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((o) => !o);
      } else if (e.key === "/" && !typing && !isOpen) {
        e.preventDefault();
        setIsOpen(true);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    setQuery("");
    setSelected(0);
    inputRef.current?.focus();
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => setSelected(0), [query]);

  // keep the highlighted row in view while arrowing through the list
  useEffect(() => {
    listRef.current?.querySelector(`[data-index="${selected}"]`)?.scrollIntoView({ block: "nearest" });
  }, [selected]);

  const runCommand = (command) => {
    setIsOpen(false);
    // let the palette close before scrolling/opening
    window.setTimeout(() => command.run(), 60);
  };

  const onInputKey = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelected((i) => (i + 1) % Math.max(results.length, 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelected((i) => (i - 1 + results.length) % Math.max(results.length, 1));
    } else if (e.key === "Enter" && results[selected]) {
      e.preventDefault();
      runCommand(results[selected]);
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  let lastGroup = null;

  return (
    <>
      <button
        className={`cmdk_trigger ${compact ? "compact" : ""}`}
        onClick={() => setIsOpen(true)}
        aria-label="Open command palette"
        title={`Quick jump (${isMac ? "⌘" : "Ctrl"} + K)`}
      >
        <FiCommand />
        <span>Quick jump</span>
        <kbd>{isMac ? "⌘" : "Ctrl"}</kbd>
        <kbd>K</kbd>
      </button>

      {isOpen && (
        <div className="cmdk_overlay" onClick={() => setIsOpen(false)}>
          <div
            className="cmdk"
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="cmdk_search">
              <FiSearch />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onInputKey}
                placeholder="Type a command or search…"
                aria-label="Search commands"
                role="combobox"
                aria-expanded="true"
                aria-controls="cmdk-list"
                aria-activedescendant={results[selected] ? `cmdk-item-${selected}` : undefined}
              />
              <kbd>Esc</kbd>
            </div>

            <ul className="cmdk_list" id="cmdk-list" role="listbox" ref={listRef}>
              {results.length === 0 && <li className="cmdk_empty">No results for “{query}”</li>}
              {results.map((command, i) => {
                const showGroup = command.group !== lastGroup;
                lastGroup = command.group;
                return (
                  <li key={command.label} role="presentation">
                    {showGroup && <div className="cmdk_group">{command.group}</div>}
                    <button
                      id={`cmdk-item-${i}`}
                      data-index={i}
                      role="option"
                      aria-selected={i === selected}
                      className={`cmdk_item ${i === selected ? "selected" : ""}`}
                      onMouseMove={() => setSelected(i)}
                      onClick={() => runCommand(command)}
                    >
                      <span className="cmdk_icon">
                        <command.Icon />
                      </span>
                      <span className="cmdk_label">{command.label}</span>
                      <span className="cmdk_hint">{command.hint}</span>
                    </button>
                  </li>
                );
              })}
            </ul>

            <div className="cmdk_footer">
              <span><kbd>↑</kbd><kbd>↓</kbd> navigate</span>
              <span><kbd>↵</kbd> select</span>
              <span><kbd>Esc</kbd> close</span>
            </div>
          </div>
        </div>
      )}

      {toast && <div className="cmdk_toast" role="status">{toast}</div>}
    </>
  );
}
