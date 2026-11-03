import { useState } from "react";
import { FiGithub, FiArrowUpRight } from "react-icons/fi";
import { trackSpotlight } from "../../utils/spotlight";
import taskflowCover from "../../assets/projects/taskflow.jpg";
import cinaflixCover from "../../assets/projects/cinaflix.jpg";
import foodawayCover from "../../assets/projects/foodaway.jpg";
import "./Projects.css";

// Covers are served from the old portfolio's Sanity CDN, resized on the fly.
const sanity = (file) =>
  `https://cdn.sanity.io/images/7kjix88h/production/${file}?w=900&fit=max&auto=format`;

const projects = [
  {
    title: "Taskflow — Full-Stack Todo App",
    description:
      "A full-stack task manager on a Strapi 5 REST API — JWT auth with protected routes, add / edit / delete in modals, server-side pagination & sorting, and validated forms. Redesigned with a dark aqua-violet UI and an 86% smaller bundle.",
    cover: taskflowCover,
    tags: [
      "React",
      "TypeScript",
      "TanStack Query",
      "Strapi 5",
      "Tailwind CSS",
      "React Hook Form",
      "Yup",
      "JWT Auth",
    ],
    category: "React",
    featured: true,
    live: "https://to-do-full-app.vercel.app",
    github: "https://github.com/osama24680/ToDo-Full-App",
  },
  {
    title: "CinaFlix",
    description:
      "A movie platform integrating 10 TMDB endpoints — search, categories, trending movies and series, with authentication and protected routes.",
    cover: cinaflixCover,
    tags: [
      "React",
      "React Router",
      "Axios",
      "TMDB API",
      "Material UI",
      "Framer Motion",
      "Joi",
      "Sass",
    ],
    category: "React",
    featured: true,
    live: "https://cinaflix.pages.dev/",
    github: "https://github.com/osama24680/cinaFlix",
  },

  {
    title: "FoodAway",
    description:
      "A food ordering app built with Next.js — SSR and SSG for SEO, Route API authentication, Stripe checkout, a persisted Zustand cart, and content managed in Sanity CMS.",
    cover: foodawayCover,
    tags: [
      "Next.js",
      "SSR & SSG",
      "Route API",
      "Stripe",
      "Sanity CMS",
      "Zustand",
      "Motion",
      "Joi",
    ],
    category: "Next",
    live: "https://food-away.vercel.app/",
    github: "https://github.com/osama24680/FoodAway",
  },
  {
    title: "Vera",
    description:
      "A blog system where readers browse articles across categories and join the conversation with comments.",
    cover: sanity("a0d397fd4c6dd521fc89998d2059c04a34b7c3f6-5000x3000.jpg"),
    tags: [
      "Next.js",
      "TypeScript",
      "GraphQL",
      "Tailwind CSS",
      "Sass",
      "tsParticles",
    ],
    category: "Next",
    live: "https://vera-green.vercel.app/",
    github: "https://github.com/osama24680/Vera",
  },
];

const filters = [
  { id: "All", label: "All" },
  { id: "React", label: "React.js" },
  { id: "Next", label: "Next.js" },
];

// Walks the grid in order; each run of normal cards between featured (full-row) cards
// is checked for leftovers: 1 left on the 3-col grid -> full row, 2 left -> split the row,
// and 1 left on the 2-col (tablet) grid -> full row there.
const getFillClasses = (list, featuredOn) => {
  const classes = list.map(() => "");
  let run = [];
  const flush = () => {
    const rem3 = run.length % 3;
    const rem2 = run.length % 2;
    if (rem3 === 1) classes[run[run.length - 1]] += " fill_wide";
    if (rem3 === 2) run.slice(-2).forEach((idx) => (classes[idx] += " fill_half"));
    if (rem2 === 1) classes[run[run.length - 1]] += " fill_wide_md";
    run = [];
  };
  list.forEach((p, idx) => {
    if (p.featured && featuredOn) flush();
    else run.push(idx);
  });
  flush();
  return classes;
};

export default function Projects() {
  const [filter, setFilter] = useState("All");
  const visible =
    filter === "All" ? projects : projects.filter((p) => p.category === filter);

  // cards that would sit alone (or as a pair) in the last row of a run stretch to fill it
  const fillClass = getFillClasses(visible, filter === "All");

  return (
    <section id="projects">
      <h2>Projects</h2>
      <h5 className="text_light">Things I've built</h5>

      <div className="container">
        <div className="project_filters">
          {filters.map(({ id, label }) => (
            <button
              key={id}
              className={`project_filter ${filter === id ? "active" : ""}`}
              onClick={() => setFilter(id)}
            >
              {label}
              <span>
                {id === "All"
                  ? projects.length
                  : projects.filter((p) => p.category === id).length}
              </span>
            </button>
          ))}
        </div>

        <div className="projects_grid">
          {visible.map((project, i) => (
            <article
              key={project.title}
              className={`lux_card lux_lift project_card ${
                project.featured && filter === "All" ? "featured" : ""
              } ${fillClass[i]}`}
              onMouseMove={trackSpotlight}
            >
              <div className="project_cover">
                <img src={project.cover} alt={project.title} loading="lazy" />
                <span className="project_index">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              <div className="project_body">
                <h3>{project.title}</h3>
                <p>{project.description}</p>

                <div className="project_tags">
                  {project.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>

                <div className="project_links">
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noreferrer"
                      className="project_live"
                    >
                      Live Demo <FiArrowUpRight />
                    </a>
                  )}
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="project_code"
                  >
                    <FiGithub /> Code
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
