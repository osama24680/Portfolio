import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiHtml5,
  SiCss3,
  SiRedux,
  SiReactrouter,
  SiGraphql,
  SiJsonwebtokens,
  SiSass,
  SiTailwindcss,
  SiMui,
  SiStyledcomponents,
  SiBootstrap,
  SiFramer,
  SiJquery,
  SiGit,
  SiGithub,
  SiFigma,
  SiAdobephotoshop,
  SiFirebase,
  SiSanity,
  SiPython,
  SiCisco,
  SiReactquery,
  SiAxios,
  SiStrapi,
} from "react-icons/si";
import { TbRegex, TbAtom2 } from "react-icons/tb";
import {
  MdOutlineHub,
  MdApi,
  MdOutlineMemory,
  MdInsights,
  MdPsychology,
  MdOutlineLayers,
  MdDataObject,
  MdRule,
  MdOutlineRocketLaunch,
  MdOutlineLightbulb,
  MdCampaign,
  MdGroups,
  MdTrendingUp,
} from "react-icons/md";
import { trackSpotlight } from "../../utils/spotlight";
import "./Experience.css";

const core = [
  { name: "React.js", note: "Component architecture", Icon: SiReact, color: "#61DAFB" },
  { name: "Next.js", note: "SSR, SSG & routing", Icon: SiNextdotjs, color: "#ffffff" },
  { name: "TypeScript", note: "Type-safe, scalable code", Icon: SiTypescript, color: "#3178C6" },
  { name: "JavaScript", note: "ES6+ & OOP", Icon: SiJavascript, color: "#F7DF1E" },
];

const groups = [
  {
    id: "state",
    number: "02",
    title: "State, Data & Forms",
    caption: "Predictable data flow, from API to screen.",
    skills: [
      { name: "Redux", Icon: SiRedux, color: "#764ABC" },
      { name: "TanStack Query", Icon: SiReactquery, color: "#FF4154" },
      { name: "Context API", Icon: MdOutlineHub, color: "#61DAFB" },
      { name: "React Router", Icon: SiReactrouter, color: "#CA4245" },
      { name: "Axios", Icon: SiAxios, color: "#8a63f5" },
      { name: "REST APIs", Icon: MdApi, color: "#4db5ff" },
      { name: "GraphQL", Icon: SiGraphql, color: "#E10098" },
      { name: "JWT", Icon: SiJsonwebtokens, color: "#d63aff" },
      { name: "Yup", Icon: MdRule, color: "#4ade80" },
      { name: "Joi", Icon: MdRule, color: "#38bdf8" },
      { name: "Regex", Icon: TbRegex, color: "#fbbf24" },
    ],
  },
  {
    id: "style",
    number: "03",
    title: "UI, Styling & Motion",
    caption: "Scalable components, pixel-perfect and alive.",
    skills: [
      { name: "Atomic Design", Icon: TbAtom2, color: "#61DAFB" },
      { name: "HTML5", Icon: SiHtml5, color: "#E34F26" },
      { name: "CSS3", Icon: SiCss3, color: "#2965F1" },
      { name: "Sass", Icon: SiSass, color: "#CC6699" },
      { name: "Tailwind", Icon: SiTailwindcss, color: "#06B6D4" },
      { name: "Material UI", Icon: SiMui, color: "#007FFF" },
      { name: "styled-components", Icon: SiStyledcomponents, color: "#DB7093" },
      { name: "Bootstrap", Icon: SiBootstrap, color: "#7952B3" },
      { name: "Framer Motion", Icon: SiFramer, color: "#ffffff" },
      { name: "jQuery", Icon: SiJquery, color: "#4fa3e0" },
    ],
  },
  {
    id: "tools",
    number: "04",
    title: "Tools & Platforms",
    caption: "Design to deploy, under version control.",
    skills: [
      { name: "Git", Icon: SiGit, color: "#F05032" },
      { name: "GitHub", Icon: SiGithub, color: "#ffffff" },
      { name: "Figma", Icon: SiFigma, color: "#F24E1E" },
      { name: "Photoshop", Icon: SiAdobephotoshop, color: "#31A8FF" },
      { name: "Firebase", Icon: SiFirebase, color: "#FFCA28" },
      { name: "Sanity", Icon: SiSanity, color: "#F03E2F" },
      { name: "Strapi", Icon: SiStrapi, color: "#8E75FF" },
    ],
  },
  {
    id: "beyond",
    number: "05",
    title: "Beyond Front-End",
    caption: "An engineer's view of the whole product.",
    skills: [
      { name: "Python", Icon: SiPython, color: "#FFD43B" },
      { name: "EDA", Icon: MdInsights, color: "#4db5ff" },
      { name: "Machine Learning", Icon: MdPsychology, color: "#c084fc" },
      { name: "Deep Learning", Icon: MdOutlineLayers, color: "#c084fc" },
      { name: "CCNA", Icon: SiCisco, color: "#1BA0D7" },
      { name: "IoT & Embedded", Icon: MdOutlineMemory, color: "#4ade80" },
    ],
  },
];

const venture = {
  skills: [
    { name: "Product Thinking", Icon: MdOutlineLightbulb, color: "#fbbf24" },
    { name: "MVP Building", Icon: MdOutlineRocketLaunch, color: "#fbbf24" },
    { name: "Pitching", Icon: MdCampaign, color: "#fbbf24" },
    { name: "Fundraising", Icon: MdTrendingUp, color: "#fbbf24" },
    { name: "Team Leadership", Icon: MdGroups, color: "#fbbf24" },
  ],
  stats: [
    { value: "Top 10", label: "Plan International" },
    { value: "$1K", label: "Funding raised" },
    { value: "7th", label: "Rally Competition" },
  ],
};

const marquee = [
  ...core,
  ...groups.flatMap((g) => g.skills),
  { name: "OOP", Icon: MdDataObject, color: "#4db5ff" },
];
const half = Math.ceil(marquee.length / 2);
const marqueeRows = [marquee.slice(0, half), marquee.slice(half)];

export default function Experience() {
  return (
    <section id="experience">
      <h2>Skills &amp; Toolkit</h2>
      <h5 className="text_light">The tools I craft with</h5>

      <div className="skills_marquee" aria-hidden="true">
        {marqueeRows.map((row, i) => (
          <div className={`marquee_row ${i === 1 ? "reverse" : ""}`} key={i}>
            <div className="marquee_track">
              {[...row, ...row].map(({ name, Icon, color }, j) => (
                <span className="marquee_chip" key={name + j} style={{ "--brand": color }}>
                  <Icon /> {name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="container skills_bento">
        <article className="lux_card lux_lift bento_card bento_core" onMouseMove={trackSpotlight}>
          <div className="bento_head">
            <span className="bento_number">01</span>
            <div>
              <h3>Core Stack</h3>
              <p>My daily drivers for building modern, production-ready web apps.</p>
            </div>
          </div>

          <div className="core_grid">
            {core.map(({ name, note, Icon, color }) => (
              <div className="core_tile" key={name} style={{ "--brand": color }}>
                <Icon className="core_icon" />
                <div>
                  <h4>{name}</h4>
                  <small>{note}</small>
                </div>
              </div>
            ))}
          </div>
        </article>

        {groups.map((group) => (
          <article
            className={`lux_card lux_lift bento_card bento_${group.id}`}
            key={group.id}
            onMouseMove={trackSpotlight}
          >
            <div className="bento_head">
              <span className="bento_number">{group.number}</span>
              <div>
                <h3>{group.title}</h3>
                <p>{group.caption}</p>
              </div>
            </div>

            <div className="skill_chips">
              {group.skills.map(({ name, Icon, color }) => (
                <span className="skill_chip" key={name} style={{ "--brand": color }}>
                  <Icon /> {name}
                </span>
              ))}
            </div>
          </article>
        ))}

        <article className="lux_card lux_lift lux_gold bento_card bento_venture" onMouseMove={trackSpotlight}>
          <div className="venture_info">
            <div className="bento_head">
              <span className="bento_number">06</span>
              <div>
                <h3>Entrepreneurship &amp; Product</h3>
                <p>
                  I don't stop at the code. With <strong>Vectos</strong>{" "}
                  (formerly ShoesFit) I took an idea from concept to a funded
                  product — and I'm growing it into a startup.
                </p>
              </div>
            </div>

            <div className="skill_chips">
              {venture.skills.map(({ name, Icon, color }) => (
                <span className="skill_chip" key={name} style={{ "--brand": color }}>
                  <Icon /> {name}
                </span>
              ))}
            </div>
          </div>

          <div className="venture_stats">
            {venture.stats.map((stat) => (
              <div className="venture_stat" key={stat.label}>
                <strong>{stat.value}</strong>
                <small>{stat.label}</small>
              </div>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}
