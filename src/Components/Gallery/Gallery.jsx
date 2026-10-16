import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { FiX, FiChevronLeft, FiChevronRight, FiMaximize2 } from "react-icons/fi";
import { justifyRows } from "./justifyRows";
import "./Gallery.css";

/*
 * Two copies of every artwork live in assets/gallery:
 *   thumb/ — ~640px tall, light enough for the grid (≈1.6 MB for all 31)
 *   full/  — up to 2400px, fetched only when that image is opened in the lightbox
 * The originals are never shipped.
 */
const thumbs = import.meta.glob("../../assets/gallery/thumb/*.jpg", { eager: true, import: "default" });
const fulls = import.meta.glob("../../assets/gallery/full/*.jpg", { eager: true, import: "default" });
const thumbOf = (file) => thumbs[`../../assets/gallery/thumb/${file}.jpg`];
const fullOf = (file) => fulls[`../../assets/gallery/full/${file}.jpg`];

const MANIPULATION = "Photo Manipulation";
const ADS = "Ad Design";
const POSTERS = "Posters & Social";

// ratio = width / height of the original; color = average color, shown while loading
const artworks = [
  { file: "raven", title: "Nevermore", category: MANIPULATION, ratio: 1.429, color: "#25183c" },
  { file: "girl-in-space", title: "Between Worlds", category: MANIPULATION, ratio: 1.635, color: "#20094b" },
  { file: "cyborg3", title: "Half Human", category: MANIPULATION, ratio: 0.667, color: "#65c7d6" },
  { file: "pyrmids-in-space-1", title: "Pyramids Among the Stars", category: MANIPULATION, ratio: 1, color: "#2f2731" },
  { file: "juhaina", title: "Juhayna Zabado", category: ADS, ratio: 1, color: "#e6261c" },
  { file: "patronus", title: "Spirit of the Forest", category: MANIPULATION, ratio: 1.778, color: "#2f4042" },
  { file: "girl-in-triangle2", title: "Neon Geometry", category: MANIPULATION, ratio: 0.92, color: "#a64a46" },
  { file: "mountain-eye", title: "The Mountain's Eye", category: MANIPULATION, ratio: 1, color: "#0c1216" },
  { file: "server-balancer", title: "Server Load Balancer", category: POSTERS, ratio: 0.707, color: "#263170" },
  { file: "angel-girl", title: "Frostwing", category: MANIPULATION, ratio: 1.324, color: "#214379" },
  { file: "sandface", title: "Stardust", category: MANIPULATION, ratio: 0.667, color: "#1f042f" },
  { file: "heinz", title: "Heinz Ketchup", category: ADS, ratio: 1, color: "#b52a24" },
  { file: "time-travel", title: "The Time Gate", category: MANIPULATION, ratio: 1, color: "#5b3b33" },
  { file: "storm", title: "Eye of the Storm", category: MANIPULATION, ratio: 1.714, color: "#195180" },
  { file: "girl-in-neon", title: "Neon Nights", category: MANIPULATION, ratio: 0.667, color: "#4d1249" },
  { file: "gaming-poster", title: "Battleground", category: POSTERS, ratio: 1.631, color: "#4c4756" },
  { file: "girl-in-triangle", title: "Violet Prism", category: MANIPULATION, ratio: 0.728, color: "#6c2481" },
  { file: "pizza", title: "Yummy Pizza", category: ADS, ratio: 1, color: "#a40a05" },
  { file: "child", title: "The World Beyond", category: MANIPULATION, ratio: 1.499, color: "#080812" },
  { file: "girl-in-street", title: "Neon Rain", category: MANIPULATION, ratio: 0.667, color: "#222b22" },
  { file: "ieee", title: "Eid Greeting — IEEE AAST", category: POSTERS, ratio: 1, color: "#142c48" },
  { file: "myeffect", title: "Earthbound", category: MANIPULATION, ratio: 1.601, color: "#988d77" },
  { file: "queen", title: "The Queen's Mirror", category: MANIPULATION, ratio: 0.667, color: "#603e37" },
  { file: "dental", title: "Ready for Dental", category: ADS, ratio: 1, color: "#24b7e3" },
  { file: "glass-man", title: "Dispersion", category: MANIPULATION, ratio: 1.5, color: "#f7f8f9" },
  { file: "graaaddiaaant1", title: "Duotone", category: MANIPULATION, ratio: 0.669, color: "#050c23" },
  { file: "poster-3", title: "Stay in Touch — Schneider Electric", category: POSTERS, ratio: 0.707, color: "#3c74ad" },
  { file: "ball", title: "Two Sides of the Game", category: MANIPULATION, ratio: 1, color: "#340709" },
  { file: "cracked-girl", title: "Porcelain", category: MANIPULATION, ratio: 1.703, color: "#cbbbc2" },
  { file: "strawbery-juice", title: "Natural Taste", category: ADS, ratio: 1, color: "#7d1010" },
  { file: "like-girl", title: "Double Tap", category: MANIPULATION, ratio: 0.667, color: "#020201" },
].map((art) => ({ ...art, thumb: thumbOf(art.file), full: fullOf(art.file) }));

const categories = ["All", MANIPULATION, ADS, POSTERS];
const PREVIEW_COUNT = 14;

// ideal row height for the available width
const targetHeight = (width) => (width < 500 ? 175 : width < 900 ? 210 : 260);

// Grid tile image: sits on its average color, then fades in once decoded.
function GridImage({ art }) {
  const [loaded, setLoaded] = useState(false);
  const ref = useRef(null);
  // a cached image can finish before onLoad is attached
  useEffect(() => {
    if (ref.current?.complete && ref.current.naturalWidth) setLoaded(true);
  }, []);
  return (
    <img
      ref={ref}
      src={art.thumb}
      alt={art.title}
      loading="lazy"
      decoding="async"
      className={loaded ? "is-loaded" : ""}
      onLoad={() => setLoaded(true)}
    />
  );
}

// Lightbox image: shows the (already cached) thumbnail instantly, then swaps in
// the full-resolution file when it finishes downloading.
function LightboxImage({ art }) {
  const [fullReady, setFullReady] = useState(false);
  const fullRef = useRef(null);
  useEffect(() => {
    // already cached (e.g. preloaded as a neighbour) → show it immediately
    setFullReady(Boolean(fullRef.current?.complete && fullRef.current.naturalWidth));
  }, [art.file]);

  return (
    <div className="lightbox_media" style={{ "--ratio": art.ratio, backgroundColor: art.color }}>
      <img src={art.thumb} alt="" aria-hidden="true" className="lightbox_preview" />
      <img
        key={art.file}
        ref={fullRef}
        src={art.full}
        alt={art.title}
        decoding="async"
        className={`lightbox_full ${fullReady ? "is-loaded" : ""}`}
        onLoad={() => setFullReady(true)}
      />
      {!fullReady && <span className="lightbox_loader" aria-hidden="true" />}
    </div>
  );
}

export default function Gallery() {
  const [category, setCategory] = useState("All");
  const [showAll, setShowAll] = useState(false);
  const [openIndex, setOpenIndex] = useState(null);

  const filtered =
    category === "All" ? artworks : artworks.filter((a) => a.category === category);
  const visible = showAll ? filtered : filtered.slice(0, PREVIEW_COUNT);
  const current = openIndex !== null ? filtered[openIndex] : null;

  // measure the grid so rows can be justified to its exact width
  const gridRef = useRef(null);
  const [grid, setGrid] = useState({ width: 0, gap: 16 });
  useLayoutEffect(() => {
    const el = gridRef.current;
    // the gap comes from Gallery.css, so the math always matches the layout
    const measure = () => {
      const next = { width: el.clientWidth, gap: parseFloat(getComputedStyle(el).rowGap) || 0 };
      // the observer also fires on height changes; only re-layout when width or gap moved
      setGrid((prev) => (prev.width === next.width && prev.gap === next.gap ? prev : next));
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const rows = useMemo(
    () => justifyRows(visible.map((a) => a.ratio), grid.width, targetHeight(grid.width), grid.gap),
    [visible, grid]
  );

  const close = useCallback(() => setOpenIndex(null), []);
  const step = useCallback(
    (dir) => setOpenIndex((i) => (i + dir + filtered.length) % filtered.length),
    [filtered.length]
  );

  // keyboard controls + lock page scroll while the lightbox is open
  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [openIndex, close, step]);

  // warm the cache for the neighbours so next/prev feel instant
  useEffect(() => {
    if (openIndex === null) return;
    [1, -1].forEach((dir) => {
      const next = filtered[(openIndex + dir + filtered.length) % filtered.length];
      const img = new Image();
      img.decoding = "async";
      img.src = next.full;
    });
  }, [openIndex, filtered]);

  const changeCategory = (c) => {
    setCategory(c);
    setShowAll(false);
  };

  return (
    <section id="gallery">
      <h2>Design Gallery</h2>
      <h5 className="text_light">Photoshop artworks, ads &amp; posters</h5>

      <div className="container">
        <div className="gallery_filters">
          {categories.map((c) => (
            <button
              key={c}
              className={`gallery_filter ${category === c ? "active" : ""}`}
              onClick={() => changeCategory(c)}
            >
              {c}
              <span>{c === "All" ? artworks.length : artworks.filter((a) => a.category === c).length}</span>
            </button>
          ))}
        </div>

        <div
          ref={gridRef}
          className={`gallery_grid ${!showAll && filtered.length > PREVIEW_COUNT ? "faded" : ""}`}
        >
          {rows.map((row) => (
            <div className="gallery_row" key={row.start} style={{ height: row.height }}>
              {visible.slice(row.start, row.end).map((art, k) => (
                <button
                  className="gallery_item"
                  key={art.file}
                  style={{ "--ratio": art.ratio, backgroundColor: art.color }}
                  onClick={() => setOpenIndex(row.start + k)}
                >
                  <GridImage art={art} />
                  <div className="gallery_caption">
                    <div>
                      <h4>{art.title}</h4>
                      <small>{art.category}</small>
                    </div>
                    <FiMaximize2 />
                  </div>
                </button>
              ))}
            </div>
          ))}
        </div>

        {filtered.length > PREVIEW_COUNT && (
          <div className="gallery_more">
            <button className="outlineBtn" onClick={() => setShowAll((s) => !s)}>
              {showAll ? "Show less" : `View all ${filtered.length} designs`}
            </button>
          </div>
        )}
      </div>

      {current && (
        <div className="lightbox" onClick={close} role="dialog" aria-modal="true" aria-label={current.title}>
          <button className="lightbox_btn lightbox_close" onClick={close} aria-label="Close">
            <FiX />
          </button>
          <button
            className="lightbox_btn lightbox_prev"
            onClick={(e) => {
              e.stopPropagation();
              step(-1);
            }}
            aria-label="Previous"
          >
            <FiChevronLeft />
          </button>

          <figure className="lightbox_figure" onClick={(e) => e.stopPropagation()}>
            <LightboxImage art={current} />
            <figcaption>
              <div>
                <h4>{current.title}</h4>
                <small>{current.category}</small>
              </div>
              <span>
                {String(openIndex + 1).padStart(2, "0")} / {String(filtered.length).padStart(2, "0")}
              </span>
            </figcaption>
          </figure>

          <button
            className="lightbox_btn lightbox_next"
            onClick={(e) => {
              e.stopPropagation();
              step(1);
            }}
            aria-label="Next"
          >
            <FiChevronRight />
          </button>
        </div>
      )}
    </section>
  );
}
