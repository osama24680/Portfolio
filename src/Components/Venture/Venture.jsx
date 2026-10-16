import { useEffect, useRef, useState } from "react";
import { FiActivity, FiCpu, FiTrendingUp, FiMonitor, FiCheck, FiMinus, FiArrowUpRight, FiAward, FiChevronDown, FiZap } from "react-icons/fi";
import { trackSpotlight } from "../../utils/spotlight";
import ShoeVisual from "./ShoeVisual";
import SoleBlueprint from "./SoleBlueprint";
import {
  venture,
  problem,
  pipeline,
  milestones,
  market,
  revenueStreams,
  competitors,
  team,
  supervisors,
} from "./ventureData";
import "./VentureArt.css";
import "./Venture.css";

const pipelineIcons = [FiActivity, FiCpu, FiTrendingUp, FiMonitor];

const initials = (name) =>
  name
    .split(/[\s-]+/)
    .slice(0, 2)
    .map((p) => p[0])
    .join("");

// other parts of the site (navbar, command palette) open the case study with this event
export const OPEN_VENTURE = "open-venture";

export default function Venture() {
  const [open, setOpen] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const show = () => {
      setOpen(true);
      // wait for the content to mount, then bring it into view
      requestAnimationFrame(() => sectionRef.current?.scrollIntoView({ behavior: "smooth" }));
    };
    const onHash = () => window.location.hash === "#venture" && show();
    onHash();
    window.addEventListener(OPEN_VENTURE, show);
    window.addEventListener("hashchange", onHash);
    return () => {
      window.removeEventListener(OPEN_VENTURE, show);
      window.removeEventListener("hashchange", onHash);
    };
  }, []);

  const close = () => {
    setOpen(false);
    requestAnimationFrame(() => sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }));
  };

  if (!open) {
    return (
      <section id="venture" ref={sectionRef} className="venture_collapsed">
        <div className="container">
          <button className="lux_card lux_gold venture_banner" onClick={() => setOpen(true)} onMouseMove={trackSpotlight}>
            <span className="venture_banner_icon">
              <FiZap />
            </span>
            <span className="venture_banner_text">
              <small>Founder story</small>
              <strong>
                {venture.name} — AI smart shoes that flag health risks early
              </strong>
              <em>7th · AAST Rally 2024 &nbsp;·&nbsp; Top 10 · Plan International &nbsp;·&nbsp; $1,000 funded</em>
            </span>
            <span className="venture_banner_cta">
              Open case study <FiChevronDown />
            </span>
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id="venture" ref={sectionRef} className="venture_open">
      <h2>The Venture</h2>
      <h5 className="text_light">Founder story · {venture.name}</h5>

      <div className="container venture_wrap">
        {/* ---------- Intro ---------- */}
        <article className="lux_card venture_intro" onMouseMove={trackSpotlight}>
          <div className="venture_intro_text">
            <span className="venture_role">
              <FiAward /> {venture.role} · {venture.period}
            </span>
            <h3 className="venture_name">{venture.name}</h3>
            <p className="venture_tagline">“{venture.tagline}”</p>
            <p className="venture_pitch">{venture.pitch}</p>

            <div className="venture_badges">
              {venture.badges.map((b) => (
                <span key={b.label} className={`venture_badge ${b.tone}`}>
                  <strong>{b.label}</strong>
                  <small>{b.detail}</small>
                </span>
              ))}
            </div>
          </div>

          <div className="venture_visual">
            <div className="venture_glow" aria-hidden="true" />
            <ShoeVisual />
          </div>
        </article>

        {/* ---------- Problem ---------- */}
        <div className="venture_problem">
          <article className="lux_card venture_problem_text" onMouseMove={trackSpotlight}>
            <span className="venture_eyebrow">01 · The problem</span>
            <p>{problem.text}</p>
          </article>
          {problem.stats.map((s) => (
            <article key={s.value} className="lux_card venture_stat" onMouseMove={trackSpotlight}>
              <strong>{s.value}</strong>
              <small>{s.label}</small>
            </article>
          ))}
        </div>

        {/* ---------- How it works ---------- */}
        <article className="lux_card venture_block" onMouseMove={trackSpotlight}>
          <span className="venture_eyebrow">02 · How it works</span>
          <ol className="venture_pipeline">
            {pipeline.map((p, i) => {
              const Icon = pipelineIcons[i];
              return (
                <li key={p.step}>
                  <span className="pipeline_icon">
                    <Icon />
                  </span>
                  <span className="pipeline_step">{p.step}</span>
                  <h4>{p.title}</h4>
                  <p>{p.detail}</p>
                  <span className="pipeline_metric">{p.metric}</span>
                </li>
              );
            })}
          </ol>
        </article>

        {/* ---------- Traction + design ---------- */}
        <div className="venture_split">
          <article className="lux_card venture_block" onMouseMove={trackSpotlight}>
            <span className="venture_eyebrow">03 · Traction</span>
            <ol className="venture_timeline">
              {milestones.map((m) => (
                <li
                  key={m.title}
                  className={`${m.highlight ? "highlight" : ""} ${m.upcoming ? "upcoming" : ""}`}
                >
                  <span className="timeline_date">{m.date}</span>
                  <div>
                    <h4>{m.title}</h4>
                    <p>{m.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </article>

          <article className="lux_card venture_design" onMouseMove={trackSpotlight}>
            <span className="venture_eyebrow">Product design</span>
            <SoleBlueprint />
            <p>
              Sole modelled in 3ds Max and printed in <b>TPU</b> — flexible, durable, and
              insulating — with slots that protect the PCB and battery without sacrificing comfort.
            </p>
          </article>
        </div>

        {/* ---------- Market & business model ---------- */}
        <article className="lux_card venture_block" onMouseMove={trackSpotlight}>
          <span className="venture_eyebrow">04 · Market & business model</span>
          <div className="venture_market">
            {market.map((m) => (
              <div key={m.label} className="market_tile">
                <strong>{m.value}</strong>
                <span>{m.label}</span>
                <small>{m.note}</small>
              </div>
            ))}
          </div>
          <div className="venture_streams">
            <span>Revenue streams</span>
            {revenueStreams.map((r) => (
              <em key={r}>{r}</em>
            ))}
          </div>
        </article>

        {/* ---------- Competition ---------- */}
        <article className="lux_card venture_block" onMouseMove={trackSpotlight}>
          <span className="venture_eyebrow">05 · Competitive edge</span>
          <div className="venture_table_wrap">
            <table className="venture_table">
              <thead>
                <tr>
                  <th />
                  {competitors.columns.map((c, i) => (
                    <th key={c} className={i === 0 ? "ours" : ""}>
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {competitors.rows.map((row) => (
                  <tr key={row.label}>
                    <th scope="row">{row.label}</th>
                    {row.values.map((v, i) => (
                      <td key={i} className={i === 0 ? "ours" : ""}>
                        {v === true ? (
                          <FiCheck className="yes" aria-label="Yes" />
                        ) : v === false ? (
                          <FiMinus className="no" aria-label="No" />
                        ) : (
                          v
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>

        {/* ---------- Team ---------- */}
        <article className="lux_card venture_block" onMouseMove={trackSpotlight}>
          <span className="venture_eyebrow">06 · The founding team</span>
          <div className="venture_team">
            {team.map((m) => (
              <div key={m.name} className={`team_member ${m.lead ? "lead" : ""}`}>
                <span className="team_avatar">{initials(m.name)}</span>
                <h4>{m.name}</h4>
                <span className="team_role">{m.role}</span>
                <small>{m.focus}</small>
              </div>
            ))}
          </div>
          <p className="venture_supervisors">Supervised by {supervisors.join(" & ")} · AAST</p>
        </article>

        {/* ---------- CTA ---------- */}
        <article className="lux_card lux_gold venture_cta" onMouseMove={trackSpotlight}>
          <div>
            <h3>{venture.mission}</h3>
            <p>Investor, partner, or building in health-tech? I'd love to talk.</p>
          </div>
          <div className="venture_cta_actions">
            <a href="#contact" className="venture_cta_btn">
              Let's talk <FiArrowUpRight />
            </a>
            <button className="venture_close" onClick={close}>
              Collapse
            </button>
          </div>
        </article>
      </div>
    </section>
  );
}
