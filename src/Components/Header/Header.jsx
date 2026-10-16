import { useRef } from "react";
import { SiReact, SiNextdotjs, SiTypescript, SiRedux, SiUpwork } from "react-icons/si";
import { BsLinkedin, BsGithub } from "react-icons/bs";
import { FiArrowUpRight, FiDownload, FiCode, FiTrendingUp, FiAward } from "react-icons/fi";
import CV from "../../assets/cv.pdf";
import osama from "../../assets/osama.png";
import { useHeroPointer, useTypewriter, magnetic } from "./useHeroEffects";
import "./Header.css";

const roles = ["Front-End Developer", "Startup Founder", "React & Next.js Engineer", "Product Builder", "Graphic Designer"];

// each stat carries its own color: aqua for code, gold for money, violet for awards
const stats = [
  { value: "10+", label: "Projects shipped", Icon: FiCode, from: "#22d3ee", to: "#4db5ff", rgb: "34, 211, 238" },
  { value: "$1K", label: "Startup funding", Icon: FiTrendingUp, from: "#fde68a", to: "#f59e0b", rgb: "251, 191, 36" },
  { value: "Top 10", label: "Plan International", Icon: FiAward, from: "#c4b5fd", to: "#8b5cf6", rgb: "139, 92, 246" },
];

const socials = [
  { href: "https://www.linkedin.com/in/osama-megahed-887b76201/", label: "LinkedIn", Icon: BsLinkedin, color: "#0A66C2" },
  { href: "https://github.com/osama24680", label: "GitHub", Icon: BsGithub, color: "#ffffff" },
  { href: "https://www.upwork.com/freelancers/~01cce0d0675a271639", label: "Upwork", Icon: SiUpwork, color: "#14a800" },
];

// tech badges orbiting the portrait
const orbit = [
  { Icon: SiReact, color: "#61DAFB", className: "orbit_react" },
  { Icon: SiNextdotjs, color: "#ffffff", className: "orbit_next" },
  { Icon: SiTypescript, color: "#3178C6", className: "orbit_ts" },
  { Icon: SiRedux, color: "#764ABC", className: "orbit_redux" },
];

export default function Header() {
  const heroRef = useRef(null);
  const readoutRef = useRef(null);
  useHeroPointer(heroRef, readoutRef);
  const role = useTypewriter(roles);

  return (
    <header id="header" ref={heroRef}>
      <div className="hero_bg" aria-hidden="true">
        <span className="hero_blob blob_blue" />
        <span className="hero_blob blob_violet" />
        <span className="hero_grid" />
        {/* the same grid, brighter, revealed only around the pointer */}
        <span className="hero_grid hero_grid_lit" />
        <span className="hero_spot" />
      </div>

      <div className="container header_container">
        <div className="hero_text">
          <div className="profile_status">
            <span className="pulse_dot" />
            Open to work · Alexandria, Egypt
          </div>

          <h5 className="hero_hello">Hello, I'm</h5>
          <h1 className="hero_name">
            Osama <span>Megahed</span>
          </h1>

          <div className="hero_role">
            <span className="hero_role_prefix">I'm a</span>
            <span className="hero_role_word" aria-label={roles.join(", ")}>
              <span aria-hidden="true">{role}</span>
              <span className="hero_caret" aria-hidden="true" />
            </span>
          </div>

          <p className="hero_tagline">
            I turn ideas into working products — from the circuit board to the browser.
          </p>

          <div className="cta">
            <a href="#contact" className="hero_btn hero_btn_primary" {...magnetic()}>
              Let's talk <FiArrowUpRight />
            </a>
            <a href={CV} download className="hero_btn hero_btn_ghost" {...magnetic()}>
              Download CV <FiDownload />
            </a>
          </div>

          <div className="hero_stats">
            {stats.map(({ value, label, Icon, from, to, rgb }) => (
              <div
                key={label}
                className="hero_stat"
                style={{ "--stat-from": from, "--stat-to": to, "--stat-rgb": rgb }}
              >
                <span className="hero_stat_icon">
                  <Icon />
                </span>
                <div>
                  <strong>{value}</strong>
                  <small>{label}</small>
                </div>
              </div>
            ))}
            <div className="hero_socials">
              {socials.map(({ href, label, Icon, color }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  style={{ "--brand": color }}
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="hero_visual">
          <div className="hero_tilt">
            <div className="hero_ring" aria-hidden="true" />
            <div className="hero_ring_dashed" aria-hidden="true" />
            <div className="me">
              <img src={osama} alt="Osama Megahed" />
            </div>

            {/* CAD-style dimension lines around the portrait */}
            <div className="hero_dim hero_dim_w" aria-hidden="true">
              <span>W 330</span>
            </div>
            <div className="hero_dim hero_dim_h" aria-hidden="true">
              <span>H 460</span>
            </div>
          </div>

          {/* depth layers: badges float far, cards float near → parallax */}
          <div className="hero_layer hero_layer_far" aria-hidden="true">
            {orbit.map(({ Icon, color, className }) => (
              <span key={className} className={`orbit_badge ${className}`} style={{ "--brand": color }}>
                <Icon />
              </span>
            ))}
          </div>

          <div className="hero_layer hero_layer_near">
            <div className="hero_float hero_float_top">
              <span className="hero_float_icon">🏆</span>
              <div>
                <strong>ShoesFit</strong>
                <small>$1,000 funded</small>
              </div>
            </div>
            <div className="hero_float hero_float_bottom">
              <span className="hero_float_icon">⚛️</span>
              <div>
                <strong>React · Next.js</strong>
                <small>TypeScript · Redux</small>
              </div>
            </div>
          </div>

          <span className="hero_readout" ref={readoutRef} aria-hidden="true">
            x 0000 · y 0000
          </span>
        </div>
      </div>
    </header>
  );
}
