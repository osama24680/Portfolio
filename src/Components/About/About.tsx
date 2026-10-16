import { useState } from "react";

import { FaAward } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { VscFolderLibrary } from "react-icons/vsc";
import { MdWorkOutline } from "react-icons/md";
import "./About.css";
import { trackSpotlight } from "../../utils/spotlight.ts";
import MeComponents from "./MeComponents.tsx";
import EducationComponent from "./EducationComponent.tsx";
import VolunteeringComponent from "./VolunteeringComponent.tsx";
import AsideComponent from "./AsideComponent.tsx";
import WorkExperienceComponent from "./WorkExperienceComponent.tsx";

export default function About() {
  const [aboutData, setAboutData] = useState("EducationComponent");
  return (
    <section id="about">
      <h2>About Me</h2>
      <h5 className="text_light">Get to Know </h5>

      <div className="container about_container">
        {<AsideComponent />}
        <div className="about_content">
          <div className="about_cards">
            <article
              className={`about_card lux_card ${aboutData === "MeComponents" ? "active" : ""}`}
              onMouseMove={trackSpotlight}
              onClick={() => {
                setAboutData("MeComponents");
              }}
            >
              <FaAward className="about_icon" />
              <h5>Me</h5>
            </article>

            <article
              className={`about_card lux_card ${aboutData === "WorkExperienceComponent" ? "active" : ""}`}
              onMouseMove={trackSpotlight}
              onClick={() => {
                setAboutData("WorkExperienceComponent");
              }}
            >
              <MdWorkOutline className="about_icon" />
              <h5>Experience</h5>
            </article>

            <article
              className={`about_card lux_card ${aboutData === "EducationComponent" ? "active" : ""}`}
              onMouseMove={trackSpotlight}
              onClick={() => {
                setAboutData("EducationComponent");
              }}
            >
              <FiUsers className="about_icon" />
              <h5>Education</h5>
            </article>

            <article
              className={`about_card lux_card ${aboutData === "VolunteeringComponent" ? "active" : ""}`}
              onMouseMove={trackSpotlight}
              onClick={() => {
                setAboutData("VolunteeringComponent");
              }}
            >
              <VscFolderLibrary className="about_icon" />
              <h5>Volunteering</h5>
            </article>
          </div>
          {aboutData == "MeComponents" && <MeComponents />}
          {aboutData == "WorkExperienceComponent" && (
            <WorkExperienceComponent />
          )}
          {aboutData == "EducationComponent" && <EducationComponent />}
          {aboutData == "VolunteeringComponent" && <VolunteeringComponent />}
        </div>
      </div>
    </section>
  );
}
