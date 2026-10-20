interface IProps {}
import CV from "../../assets/cv.pdf";
import {
  MdWorkOutline,
  MdOutlineLocationOn,
  MdOutlineSchool,
  MdTranslate,
} from "react-icons/md";
import "./AsideComponent.css";
import { trackSpotlight } from "../../utils/spotlight";
const AsideComponent = ({}: IProps) => {
  return (
    <>
      <aside className="about_side">
        <div className="code_card lux_card" onMouseMove={trackSpotlight}>
          <div className="code_card_bar">
            <span className="dot red" />
            <span className="dot yellow" />
            <span className="dot green" />
            <span className="code_card_file">osama.ts</span>
          </div>
          <pre className="code_card_body">
            <code>
              <span className="tk_kw">const</span>{" "}
              <span className="tk_var">osama</span> = {"{"}
              {"\n  "}
              <span className="tk_key">role</span>:[{" "}
              <span className="tk_str">"Front-End Developer"</span>,
              <span className="tk_str">"Entrepreneur"</span>],{"\n  "}
              <span className="tk_key">stack</span>: [
              <span className="tk_str">"React"</span>,{" "}
              <span className="tk_str">"Next.js"</span>,
              <span className="tk_str">"TypeScript"</span>],
              {"\n  "}
              <span className="tk_key">graduated</span>:{" "}
              <span className="tk_str">"AAST, 2025"</span>,{"\n  "}
              <span className="tk_key">openTo</span>: [
              <span className="tk_str">"Front-End roles"</span>,{" "}
              <span className="tk_str">"Entrepreneurship"</span>],
              {"\n"}
              {"};"}
            </code>
          </pre>
        </div>

        <div className="profile_card lux_card" onMouseMove={trackSpotlight}>
          <div className="profile_status">
            <span className="pulse_dot" />
            Open to work
          </div>
          <ul className="profile_meta">
            <li>
              <MdWorkOutline /> Front-End Developer (Next.js) | CCNA
            </li>
            <li>
              <MdOutlineLocationOn /> Alexandria, Egypt
            </li>
            <li>
              <MdOutlineSchool /> B.E. Electronics &amp; Communications · AAST
            </li>
            <li>
              <MdTranslate /> Arabic · English
            </li>
          </ul>
          <div className="profile_stats">
            <div>
              <strong>12</strong>
              <small>Team members led</small>
            </div>
            <div>
              <strong>$1K</strong>
              <small>ShoesFit funding</small>
            </div>
            <div>
              <strong>10</strong>
              <small>TMDB endpoints</small>
            </div>
          </div>
          <a href={CV} download="Osama-Megahed-Frontend-CV.pdf" className="outlineBtn profile_cv">
            Download CV
          </a>
        </div>
      </aside>
    </>
  );
};

export default AsideComponent;
