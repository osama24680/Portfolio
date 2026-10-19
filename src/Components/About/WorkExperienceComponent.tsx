import "./WorkExperienceComponent.css";

import { trackSpotlight } from "../../utils/spotlight";

interface IProps {}

interface IJob {
  company: string;
  role: string;
  period: string;
  location: string;
  type: "Full-Time" | "Internship" | "Part-Time";
  points: string[];
  stack?: string[];
}

const jobs: IJob[] = [
  {
    company: "iFikra",
    role: "Front-End Developer",
    period: "Oct 2026 – Present",
    location: "Alexandria",
    type: "Internship",
    points: [
      "Referred by a friend, then successfully passed the interview and technical assessment.",
      "Building a bilingual (English / Arabic, RTL) dental platform — a patient-facing website and a clinic dashboard — with Next.js.",
      "Shipped the Blog, Pricing, Testimonials and Appointment pages, fully localized with next-intl.",
      "Building medical websites in WordPress with Elementor.",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind", "next-intl", "TanStack Query", "WordPress", "Elementor"],
  },
  {
    company: "Arabia IT",
    role: "Front-End Developer",
    period: "Sep – Nov 2023",
    location: "Remotely",
    type: "Full-Time",
    points: [
      "Recommended for the role by my mentor and team leader.",
      "Solved real problems and shipped features in a professional team.",
    ],
  },
  {
    company: "Sidi Kerir Petrochemicals (SIDPEC)",
    role: "Engineering Intern",
    period: "Sep 2023",
    location: "Alexandria",
    type: "Internship",
    points: [
      "Industrial internship at SIDPEC facilities during my 3rd year of engineering.",
      "Certified for exemplary performance in the program.",
    ],
  },
  {
    company: "SEFF — Software Engineering For Future",
    role: "Front-End Developer · Team Leader",
    period: "Jul – Sep 2023",
    location: "Remotely",
    type: "Internship",
    points: [
      "Chosen as team leader after a four-month Front-End track.",
      "Led a 12-person team of mixed levels to deliver a React.js mentorship website.",
    ],
  },
];

const WorkExperienceComponent = ({}: IProps) => {
  return (
    <div className="work lux_card" onMouseMove={trackSpotlight}>
      <div className="work_intro">
        <span className="about-label">EXPERIENCE</span>
        <h3>Where I've Worked.</h3>
      </div>

      <ol className="work_timeline">
        {jobs.map((job) => (
          <li className="work_item" key={job.company + job.period}>
            <div className="work_item_head">
              <div>
                <h4>{job.role}</h4>
                <span className="work_company">{job.company}</span>
              </div>
              <span
                className={`work_type ${
                  job.type === "Full-Time" ? "frontend" : "ai"
                }`}
              >
                {job.type}
              </span>
            </div>

            <div className="work_meta">
              <span>{job.period}</span>
              <span>·</span>
              <span>{job.location}</span>
            </div>

            {job.points.length > 0 && (
              <ul className="work_points">
                {job.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            )}

            {job.stack && (
              <div className="work_stack">
                {job.stack.map((tech) => (
                  <span key={tech}>{tech}</span>
                ))}
              </div>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default WorkExperienceComponent;
