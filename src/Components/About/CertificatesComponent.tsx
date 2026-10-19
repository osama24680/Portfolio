import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { FiChevronLeft, FiChevronRight, FiX, FiArrowUpRight } from "react-icons/fi";
import { TbCertificate } from "react-icons/tb";

import "./CertificatesComponent.css";
import "../Gallery/Gallery.css";
import { trackSpotlight } from "../../utils/spotlight";
import ratios from "../../assets/certificates/ratios.json";

/*
 * Certificates live in src/assets/certificates:
 *   thumb/ — ~560px, shown in the grid
 *   full/  — up to 1600px, fetched only when that certificate is opened
 */
const thumbs = import.meta.glob("../../assets/certificates/thumb/*.jpg", {
  eager: true,
  import: "default",
}) as Record<string, string>;
const fulls = import.meta.glob("../../assets/certificates/full/*.jpg", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const CATEGORIES = ["Development", "AI & Data", "Engineering", "Community"] as const;
type Category = (typeof CATEGORIES)[number];

interface ICertificate {
  file: keyof typeof ratios;
  title: string;
  issuer: string;
  date: string;
  category: Category;
  highlight?: string;
  link?: string;
}

const certificates: ICertificate[] = [
  {
    file: "typing",
    title: "Touch Typing — Advanced Assessment",
    issuer: "Typing.com",
    date: "Oct 2026",
    category: "Development",
    highlight: "98% accuracy",
    link: "https://www.typing.com/student/verify#428101425-163956856",
  },
  {
    file: "itida",
    title: "ITIDA Gigs — Freelance Training Program",
    issuer: "ITIDA × EYouth",
    date: "3 months",
    category: "Development",
  },
  {
    file: "kayfa",
    title: "AI Diploma",
    issuer: "Kayfa × Imperious University of America",
    date: "Feb 2025",
    category: "AI & Data",
  },
  {
    file: "instant",
    title: "Data Science Diploma",
    issuer: "Instant Software Solutions",
    date: "Jan 2025",
    category: "AI & Data",
    highlight: "120 hours",
  },
  {
    file: "depi",
    title: "IBM Data Scientist — Digital Egypt Pioneers",
    issuer: "Ministry of Communications & IT · DEPI",
    date: "Apr – Oct 2024",
    category: "AI & Data",
  },
  {
    file: "depi-skills",
    title: "IBM Data Scientist",
    issuer: "Skills Dynamix · DEPI",
    date: "2024",
    category: "AI & Data",
    highlight: "159 hours",
  },
  {
    file: "ieee-techtalk",
    title: "IEEE Quarter Tech Talk Table 14.0",
    issuer: "IEEE YP Egypt · AASTMT",
    date: "Aug 2024",
    category: "Community",
  },
  {
    file: "robopirates",
    title: "RoboPirates Competition — Team Sharks",
    issuer: "AASTMT · Marine & Offshore Engineering",
    date: "May 2024",
    category: "Engineering",
  },
  {
    file: "ccna",
    title: "CCNAv7: Introduction to Networks",
    issuer: "Cisco Networking Academy",
    date: "Oct 2023",
    category: "Engineering",
  },
  {
    file: "sidpec",
    title: "Engineering Internship",
    issuer: "Sidi Kerir Petrochemicals (SIDPEC)",
    date: "Sep 2023",
    category: "Engineering",
    highlight: "Exemplary performance",
  },
  {
    file: "seff",
    title: "Front-End Web Development Diploma",
    issuer: "SEFF — Software Engineering For Future",
    date: "Mar 2023",
    category: "Development",
    highlight: "99.38% score",
  },
  {
    file: "ieee-experts",
    title: "Experts Talk — Organizing Team",
    issuer: "IEEE AAST Alexandria Student Branch",
    date: "Mar 2023",
    category: "Community",
  },
  {
    file: "ieee-ai101",
    title: "AI 101 Course",
    issuer: "IEEE AAST Alexandria Student Branch",
    date: "Dec 2022",
    category: "AI & Data",
  },
  {
    file: "marcom",
    title: "Marine & Communications Equipment Training",
    issuer: "MARCOM Trade",
    date: "Sep 2022",
    category: "Engineering",
  },
];

const thumbOf = (c: ICertificate) => thumbs[`../../assets/certificates/thumb/${c.file}.jpg`];
const fullOf = (c: ICertificate) => fulls[`../../assets/certificates/full/${c.file}.jpg`];

function LightboxImage({ cert }: { cert: ICertificate }) {
  const [fullReady, setFullReady] = useState(false);
  const fullRef = useRef<HTMLImageElement>(null);
  useEffect(() => {
    setFullReady(Boolean(fullRef.current?.complete && fullRef.current.naturalWidth));
  }, [cert.file]);

  return (
    <div
      className="lightbox_media"
      style={{ "--ratio": ratios[cert.file], backgroundColor: "#fff" } as React.CSSProperties}
    >
      <img src={thumbOf(cert)} alt="" aria-hidden="true" className="lightbox_preview" />
      <img
        key={cert.file}
        ref={fullRef}
        src={fullOf(cert)}
        alt={cert.title}
        decoding="async"
        className={`lightbox_full ${fullReady ? "is-loaded" : ""}`}
        onLoad={() => setFullReady(true)}
      />
      {!fullReady && <span className="lightbox_loader" aria-hidden="true" />}
    </div>
  );
}

const CertificatesComponent = () => {
  const [filter, setFilter] = useState<"All" | Category>("All");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const visible = useMemo(
    () => (filter === "All" ? certificates : certificates.filter((c) => c.category === filter)),
    [filter]
  );

  const close = useCallback(() => setOpenIndex(null), []);
  const step = useCallback(
    (dir: number) =>
      setOpenIndex((i) => (i === null ? i : (i + dir + visible.length) % visible.length)),
    [visible.length]
  );

  // keyboard controls + lock page scroll while the lightbox is open
  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
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

  const current = openIndex === null ? null : visible[openIndex];

  return (
    <div className="certificates lux_card" onMouseMove={trackSpotlight}>
      <div className="certificates_intro">
        <span className="about-label">CERTIFICATES</span>
        <h3>Proof of the Journey.</h3>
        <span className="certificates_count">
          <TbCertificate /> {certificates.length} certificates · click any to view
        </span>
      </div>

      <div className="cert_filters">
        {(["All", ...CATEGORIES] as const).map((c) => (
          <button
            key={c}
            className={filter === c ? "active" : ""}
            onClick={() => setFilter(c)}
          >
            {c}
            <span>
              {c === "All"
                ? certificates.length
                : certificates.filter((x) => x.category === c).length}
            </span>
          </button>
        ))}
      </div>

      <div className="cert_grid">
        {visible.map((cert, i) => (
          <button
            type="button"
            className="cert_card"
            key={cert.file}
            onClick={() => setOpenIndex(i)}
            aria-label={`View certificate: ${cert.title}`}
          >
            <span className="cert_thumb">
              <img
                src={thumbOf(cert)}
                alt=""
                loading="lazy"
                decoding="async"
                className={ratios[cert.file] < 1 ? "portrait" : ""}
              />
            </span>
            <span className="cert_body">
              <span className="cert_meta">
                <span className="cert_category">{cert.category}</span>
                <span className="cert_date">{cert.date}</span>
              </span>
              <strong>{cert.title}</strong>
              <small>{cert.issuer}</small>
              {cert.highlight && <span className="cert_highlight">★ {cert.highlight}</span>}
            </span>
          </button>
        ))}
      </div>

      {/* portalled to <body> so the card's transforms can't trap the fixed overlay */}
      {current &&
        createPortal(
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
            <LightboxImage cert={current} />
            <figcaption>
              <div>
                <h4>{current.title}</h4>
                <small>
                  {current.issuer} · {current.date}
                </small>
              </div>
              {current.link ? (
                <a className="cert_verify" href={current.link} target="_blank" rel="noreferrer">
                  Verify <FiArrowUpRight />
                </a>
              ) : (
                <span>
                  {String((openIndex ?? 0) + 1).padStart(2, "0")} /{" "}
                  {String(visible.length).padStart(2, "0")}
                </span>
              )}
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
        </div>,
          document.body
        )}
    </div>
  );
};

export default CertificatesComponent;
