import { FiCheck, FiCode, FiLayers, FiDatabase, FiPenTool } from "react-icons/fi";
import { trackSpotlight } from "../../utils/spotlight";
import "./Services.css";

const services = [
  {
    number: "01",
    Icon: FiCode,
    title: "Front-End Development",
    caption: "Modern web apps that feel fast and look sharp.",
    points: [
      "Single-page & server-rendered apps with React.js and Next.js",
      "Responsive, pixel-perfect UI translated from Figma",
      "Reusable component systems built with Atomic Design",
      "Clean, maintainable code with TypeScript",
    ],
  },
  {
    number: "02",
    Icon: FiDatabase,
    title: "API Integration & App Logic",
    caption: "Connecting the interface to real data.",
    points: [
      "REST & GraphQL integration with Axios and TanStack Query",
      "Authentication with JWT and protected routes",
      "Scalable state management with Redux and Context API",
      "Robust forms and validation with Yup and Regex",
    ],
  },
  {
    number: "03",
    Icon: FiLayers,
    title: "Landing Pages & CMS Websites",
    caption: "Sites your team can update without touching code.",
    points: [
      "Content-driven websites powered by Strapi or Sanity",
      "High-converting landing pages for products and startups",
      "Smooth animations and interactions with Framer Motion",
      "SEO-friendly pages with Next.js",
    ],
  },
  {
    number: "04",
    Icon: FiPenTool,
    title: "Graphic Design",
    caption: "Visuals that stop the scroll.",
    points: [
      "Social media ads and product posters",
      "Creative photo manipulation in Photoshop",
      "Visual assets for websites and brands",
    ],
    link: { href: "#gallery", label: "See the gallery" },
    gold: true,
  },
];

const process = [
  { step: "Discover", text: "Understand the problem, the users, and the goal." },
  { step: "Design", text: "Plan the structure and the components before coding." },
  { step: "Build", text: "Write clean, tested, responsive code." },
  { step: "Ship", text: "Deliver, gather feedback, and keep improving." },
];

export default function Services() {
  return (
    <section id="services">
      <h2>Services</h2>
      <h5 className="text_light">What I offer</h5>

      <div className="container">
        <div className="services_grid">
          {services.map(({ number, Icon, title, caption, points, link, gold }) => (
            <article
              key={title}
              className={`lux_card lux_lift service_card ${gold ? "lux_gold gold" : ""}`}
              onMouseMove={trackSpotlight}
            >
              <div className="service_top">
                <span className="service_number">{number}</span>
                <span className="service_icon">
                  <Icon />
                </span>
              </div>

              <h3>{title}</h3>
              <p className="service_caption">{caption}</p>

              <ul className="service_points">
                {points.map((point) => (
                  <li key={point}>
                    <FiCheck />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              {link && (
                <a href={link.href} className="service_link">
                  {link.label} →
                </a>
              )}
            </article>
          ))}
        </div>

        <div className="lux_card process" onMouseMove={trackSpotlight}>
          <span className="about-label">HOW I WORK</span>
          <ol className="process_steps">
            {process.map(({ step, text }, i) => (
              <li key={step}>
                <span className="process_dot">{i + 1}</span>
                <h4>{step}</h4>
                <p>{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
