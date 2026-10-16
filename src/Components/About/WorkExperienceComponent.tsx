import "./WorkExperienceComponent.css";

import { trackSpotlight } from "../../utils/spotlight";

interface IProps {}

interface IJob {
  company: string;
  role: string;
  period: string;
  location: string;
  type: "Front-End" | "AI & Data";
  points: string[];
}

const jobs: IJob[] = [
  {
    company: "Imperious University of America",
    role: "AI Intern",
    period: "Jul 2024 – Feb 2025",
    location: "Alexandria, Egypt",
    type: "AI & Data",
    points: [
      "Training in Python, data analysis, data science, ML, and deep learning.",
      "Applied data science and ML concepts across multiple course projects.",
    ],
  },
  {
    company: "Digital Egypt Pioneers Initiative (DEPI)",
    role: "Data Science Intern",
    period: "Apr – Oct 2024",
    location: "Alexandria, Egypt",
    type: "AI & Data",
    points: [
      "Six months of intensive data science and ML with hands-on projects.",
      "Graduation project: Stroke Risk Prediction — analyzing the key factors behind stroke risk.",
    ],
  },
  {
    company: "Arabia IT",
    role: "Front-End Developer",
    period: "Sep – Nov 2023",
    location: "Egypt",
    type: "Front-End",
    points: [
      "Recommended for the role by my mentor and team leader.",
      "Solved real problems and shipped features in a professional team.",
    ],
  },
  {
    company: "SEEF",
    role: "Front-End Developer · Team Leader",
    period: "Jul – Sep 2023",
    location: "Egypt",
    type: "Front-End",
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
        <h3>Where I've worked and learned.</h3>
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
                  job.type === "Front-End" ? "frontend" : "ai"
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
          </li>
        ))}
      </ol>
    </div>
  );
};

export default WorkExperienceComponent;
