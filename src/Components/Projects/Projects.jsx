import { useState } from "react";
import { FiGithub, FiArrowUpRight } from "react-icons/fi";
import { trackSpotlight } from "../../utils/spotlight";
import taskflowCover from "../../assets/projects/taskflow.jpg";
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
    cover: sanity("13bbfe03516ce2035f7cded66b6f9b9fc4452c0c-4000x2667.jpg"),
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
      "A food app built with Next.js — SSR and SSG for SEO, NextAuth authentication, Stripe payments, and content managed in Sanity CMS.",
    cover: sanity("0cb43bdc5850c9b8264deb341ad5e08cc9de2825-3376x2440.jpg"),
    tags: [
      "Next.js",
      "SSR & SSG",
      "NextAuth",
      "Stripe",
      "Sanity CMS",
      "Zustand",
      "Firebase",
      "Mantine",
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
  {
    title: "E-commerce Clothes",
    description:
      "A full shopping experience built with Redux Toolkit — home, products, product details, and a working cart, powered by the Fake Store API.",
    cover: sanity("a831ce6f5abc086586bfcb0de0c17c6ff3ef2543-1426x1008.jpg"),
    tags: [
      "React",
      "Redux Toolkit",
      "React Router",
      "Bootstrap",
      "React Toastify",
      "Skeleton Loading",
      "Fake Store API",
    ],
    category: "React",
    live: "https://e-commerce-redux-toolkit.pages.dev/home",
    github: "https://github.com/osama24680/e_commerce_redux_toolkit",
  },
  {
    title: "Black Gym",
    description:
      "Build your own training plan by discovering exercises, with GIFs and videos showing how to perform each movement.",
    cover: sanity("a295aeca0fefff6278b26debb2afb9af9c2c8ac3-3000x2000.jpg"),
    tags: [
      "React",
      "Material UI",
      "React Router",
      "REST API",
      "ESLint (Airbnb)",
    ],
    category: "React",
    live: "https://black-gym.vercel.app/",
    github: "https://github.com/osama24680/Black-Gym",
  },
  {
    title: "Recipes",
    description:
      "Discover hundreds of dishes with their ingredients and step-by-step instructions.",
    cover: sanity("90d3f6416b344de634cdb9e644e53ac508e0c19f-3000x2229.jpg"),
    tags: [
      "React",
      "React Router",
      "styled-components",
      "Framer Motion",
      "Splide",
      "REST API",
    ],
    category: "React",
    live: "https://recipes-5ia.pages.dev/",
    github: "https://github.com/osama24680/Recipes",
  },
  {
    title: "E-commerce Phones",
    description:
      "A phone store with product browsing and a cart, managed with the Context API.",
    cover: sanity("a98fa2f6ad52e27f3fc870678d7fbefccf3ca7b7-746x497.png"),
    tags: [
      "React",
      "Context API",
      "React Router",
      "styled-components",
      "Bootstrap",
    ],
    category: "React",
    live: "https://reactphone.pages.dev/",
    github: "https://github.com/osama24680/ReactPhone",
  },
  {
    title: "IEEE Quiz App",
    description:
      "Test yourself across many fields with questions from the categories you choose.",
    cover: sanity("0b8a3e33bb356c5c8bdbd57f9b6042d11df191fd-2199x1496.png"),
    tags: [
      "React",
      "Redux Toolkit",
      "React Router",
      "Axios",
      "Framer Motion",
      "Joi",
      "Sass",
    ],
    category: "React",
    live: "https://ieee-quiz2.pages.dev/",
    github: "https://github.com/osama24680/IEEE-Quiz2",
  },
];

const filters = [
  { id: "All", label: "All" },
  { id: "React", label: "React.js" },
  { id: "Next", label: "Next.js" },
];

export default function Projects() {
  const [filter, setFilter] = useState("All");
  const visible =
    filter === "All" ? projects : projects.filter((p) => p.category === filter);

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
              }`}
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
