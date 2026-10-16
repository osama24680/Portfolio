import "./VolunteeringComponent.css";
import OrgLogo, { LogoKey } from "./OrgLogo";

import { trackSpotlight } from "../../utils/spotlight";

interface IProps {}

interface IActivity {
  icon: string;
  logo?: LogoKey;
  title: string;
  role?: string;
  tag: string;
  achievement?: string;
}

interface IYear {
  year: string;
  label: string;
  activities: IActivity[];
}

const years: IYear[] = [
  {
    year: "Year 1",
    label: "Foundations",
    activities: [
      {
        icon: "📖",
        title: "Memorized the Holy Quran",
        tag: "Personal",
        achievement: "Full memorization",
      },
      {
        icon: "✍️",
        logo: "aast",
        title: "AAST E-Magazine",
        role: "Story Writer & Content Creator",
        tag: "Media",
      },
    ],
  },
  {
    year: "Year 2",
    label: "Problem Solving",
    activities: [
      {
        icon: "🧠",
        title: "ACPC",
        role: "Contestant — Arab Collegiate Programming Contest",
        tag: "Competition",
      },
    ],
  },
  {
    year: "Year 3",
    label: "Building & Exploring",
    activities: [
      {
        icon: "💻",
        title: "IEEE AAST Student Branch",
        role: "Web Developer & Graphic Designer",
        tag: "Tech",
      },
      {
        icon: "🏁",
        logo: "rally",
        title: "Rally Entrepreneurship Competition",
        role: "Participant",
        tag: "Entrepreneurship",
      },
      {
        icon: "🌍",
        title: "Upwork",
        role: "Joined as a freelancer",
        tag: "Freelance",
      },
    ],
  },
  {
    year: "Year 4",
    label: "Impact",
    activities: [
      {
        icon: "🚀",
        logo: "plan",
        title: "Plan International — Entrepreneurship",
        role: "With ShoesFit — our graduation project",
        tag: "Entrepreneurship",
        achievement: "Top 10 · $1,000 funding",
      },
      {
        icon: "🏆",
        logo: "rally",
        title: "Rally Entrepreneurship Competition",
        role: "With ShoesFit — our graduation project",
        tag: "Entrepreneurship",
        achievement: "7th place",
      },
      {
        icon: "🤖",
        title: "IEEE Alexandria Section",
        role: "Machine Learning Member",
        tag: "Tech",
      },
      {
        icon: "💼",
        title: "Upwork",
        role: "Started working with clients",
        tag: "Freelance",
      },
    ],
  },
];

const VolunteeringComponent = ({}: IProps) => {
  return (
    <div className="volunteering lux_card" onMouseMove={trackSpotlight}>
      <div className="volunteering_intro">
        <span className="about-label">VOLUNTEERING & ACTIVITIES</span>
        <h3>Beyond the classroom.</h3>
        <p>
          Every year at university I pushed myself into something new — from
          writing and competitive programming to tech communities,
          entrepreneurship, and freelancing.
        </p>
      </div>

      <ol className="vol_timeline">
        {years.map((y) => (
          <li className="vol_year" key={y.year}>
            <div className="vol_year_head">
              <span className="vol_year_badge">{y.year}</span>
              <span className="vol_year_label">{y.label}</span>
            </div>

            <div className="vol_activities">
              {y.activities.map((a) => (
                <article className="vol_activity" key={a.title + y.year}>
                  <OrgLogo
                    logo={a.logo}
                    fallback={a.icon}
                    className="vol_activity_icon"
                  />
                  <div className="vol_activity_body">
                    <div className="vol_activity_top">
                      <h5>{a.title}</h5>
                      <span className="vol_tag">{a.tag}</span>
                    </div>
                    {a.role && <p>{a.role}</p>}
                    {a.achievement && (
                      <span className="vol_achievement">
                        ★ {a.achievement}
                      </span>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default VolunteeringComponent;
