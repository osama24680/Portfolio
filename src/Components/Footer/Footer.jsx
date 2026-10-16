import { useEffect, useState } from "react";
import { BsLinkedin, BsGithub, BsFacebook, BsInstagram } from "react-icons/bs";
import { SiUpwork } from "react-icons/si";
import { FiArrowUp, FiArrowUpRight, FiMail } from "react-icons/fi";
import { trackSpotlight } from "../../utils/spotlight";
import "./Footer.css";

const links = [
  { href: "#about", label: "About" },
  { href: "#venture", label: "Venture" },
  { href: "#experience", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#services", label: "Services" },
  { href: "#gallery", label: "Gallery" },
  { href: "#testimonial", label: "Testimonial" },
  { href: "#contact", label: "Contact" },
];

const socials = [
  { href: "https://www.linkedin.com/in/osama-megahed-887b76201/", label: "LinkedIn", Icon: BsLinkedin, color: "#0A66C2" },
  { href: "https://github.com/osama24680", label: "GitHub", Icon: BsGithub, color: "#ffffff" },
  { href: "https://www.upwork.com/freelancers/~01cce0d0675a271639", label: "Upwork", Icon: SiUpwork, color: "#14a800" },
  { href: "https://www.facebook.com/share/1FAUnYc5V9/", label: "Facebook", Icon: BsFacebook, color: "#1877F2" },
  { href: "https://www.instagram.com/osamamegahed12", label: "Instagram", Icon: BsInstagram, color: "#E4405F" },
];

// live local time in Alexandria, whatever the visitor's timezone is
function useAlexandriaTime() {
  const format = () =>
    new Intl.DateTimeFormat("en-GB", {
      timeZone: "Africa/Cairo",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date());
  const [time, setTime] = useState(format);
  useEffect(() => {
    const id = setInterval(() => setTime(format()), 15000);
    return () => clearInterval(id);
  }, []);
  return time;
}

export default function Footer() {
  const time = useAlexandriaTime();

  return (
    <footer id="footer">
      <div className="container">
        <div className="lux_card footer_card" onMouseMove={trackSpotlight}>
          <div className="footer_cta">
            <div>
              <span className="about-label">AVAILABLE FOR NEW PROJECTS</span>
              <h3>Let's build something meaningful together.</h3>
            </div>
            <a href="#contact" className="footer_cta_btn">
              Start a conversation <FiArrowUpRight />
            </a>
          </div>

          <div className="footer_grid">
            <div className="footer_brand">
              <a href="#header" className="footer_logo">
                Osama Megahed<span>.</span>
              </a>
              <p>
                Front-End Developer (React.js) · CCNA. I turn ideas into working
                products, from the circuit board to the browser.
              </p>
              <a href="mailto:osamamegahed2468@gmail.com" className="footer_mail">
                <FiMail /> osamamegahed2468@gmail.com
              </a>
            </div>

            <div className="footer_col" role="navigation" aria-label="Footer">
              <h4>Navigate</h4>
              <ul className="footer_links">
                {links.map(({ href, label }) => (
                  <li key={href}>
                    <a href={href}>{label}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer_col">
              <h4>Connect</h4>
              <ul className="footer_socials">
                {socials.map(({ href, label, Icon, color }) => (
                  <li key={label}>
                    <a href={href} target="_blank" rel="noreferrer" style={{ "--brand": color }}>
                      <span className="footer_social_icon">
                        <Icon />
                      </span>
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="footer_build">
            <span>
              <i className="build_dot" /> build: passing
            </span>
            <span>React 19 · Vite · hand-written CSS — zero UI kits</span>
            <span>Alexandria, EG · {time}</span>
          </div>

          <div className="footer_bottom">
            <small>© {new Date().getFullYear()} Osama Megahed. All rights reserved.</small>
            <a href="#header" className="footer_top" aria-label="Back to top">
              Back to top <FiArrowUp />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
