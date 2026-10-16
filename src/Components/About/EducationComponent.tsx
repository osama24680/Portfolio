import "./EducationComponent.css";
import OrgLogo, { LogoKey } from "./OrgLogo";

import { trackSpotlight } from "../../utils/spotlight";

interface IProps {}

interface ITraining {
  icon: string;
  logo?: LogoKey;
  title: string;
  period?: string;
  description: string;
}

const trainings: ITraining[] = [
  {
    icon: "🤖",
    logo: "imperious",
    title: "AI Intern — Imperious University of America",
    period: "Jul 2024 – Feb 2025",
    description: "Python, data analysis, data science, ML, and deep learning.",
  },
  {
    icon: "🧪",
    logo: "instant",
    title: "AI Diploma — Instant Software Solutions",
    period: "Aug 2024 – Jan 2025",
    description: "Data Science, Machine Learning, and Deep Learning.",
  },
  {
    icon: "📊",
    logo: "depi",
    title: "Data Science — DEPI ",
    period: "Apr – Oct 2024",
    description: "Python, EDA, and Machine Learning through multiple projects.",
  },

  {
    icon: "⚛️",
    logo: "route",
    title: "Front-End Diploma — Route",
    period: "Feb – Jun 2021",
    description: "Front-End development with React.js.",
  },
  {
    icon: "🌐",
    logo: "ccna",
    title: "CCNA",
    description: "Networking fundamentals, routing, and switching.",
  },
];

const EducationComponent = ({}: IProps) => {
  return (
    <div className="education lux_card" onMouseMove={trackSpotlight}>
      <div className="education_intro">
        <span className="about-label">EDUCATION</span>
        <h3>From Engineering to Digital Experiences.</h3>
      </div>

      <article className="edu_degree">
        <OrgLogo logo="aast" fallback="🎓" className="edu_degree_icon" />
        <div className="edu_degree_body">
          <span className="edu_degree_type">B.Sc. in Engineering</span>
          <h4>Electronics &amp; Communications Engineering</h4>
          <span className="edu_school">
            Arab Academy for Science, Technology &amp; Maritime Transport (AAST)
          </span>
          <span className="edu_period">Sep 2019 – Feb 2025</span>
        </div>
      </article>

      <article className="edu_project">
        <div className="edu_project_head">
          <span className="edu_project_label">Graduation Project</span>
          <span className="edu_project_badge">★ $1,000 funded</span>
        </div>
        <h4>ShoesFit</h4>
        <p>
          Smart shoes that combine embedded systems, IoT, AI, and a web
          platform. Ranked in the top 10 at Plan International's
          entrepreneurship program and placed 7th at the Rally competition.
        </p>
        <div className="edu_recognitions">
          <div className="edu_recognition">
            <OrgLogo
              logo="plan"
              fallback="🚀"
              className="edu_recognition_logo"
            />
            <div>
              <strong>Top 10 · $1,000</strong>
              <small>Plan International</small>
            </div>
          </div>
          <div className="edu_recognition">
            <OrgLogo
              logo="rally"
              fallback="🏆"
              className="edu_recognition_logo"
            />
            <div>
              <strong>7th place</strong>
              <small>Rally Competition</small>
            </div>
          </div>
        </div>
        <div className="edu_chips">
          <span>Embedded Systems</span>
          <span>IoT</span>
          <span>AI</span>
          <span>Web Platform</span>
        </div>
      </article>

      <div className="edu_trainings">
        <h4 className="edu_section_title">
          Diplomas, Training &amp; Internships
        </h4>
        <div className="edu_trainings_grid">
          {trainings.map((t) => (
            <div className="edu_training" key={t.title}>
              <OrgLogo
                logo={t.logo}
                fallback={t.icon}
                className="edu_training_icon"
              />
              <div>
                <h5>{t.title}</h5>
                {t.period && <span className="edu_period">{t.period}</span>}
                <p>{t.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EducationComponent;
