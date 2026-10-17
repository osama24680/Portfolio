import { trackSpotlight } from "../../utils/spotlight";

interface IProps {}
const MeComponents = ({}: IProps) => {
  return (
    <div className="about-description lux_card" onMouseMove={trackSpotlight}>
      <div className="about-intro">
        <span className="about-label">ABOUT ME</span>

        <h3>
          I turn ideas into working products, from the circuit board to the
          browser.
        </h3>

        <p>
          I’m a <span className="highlight">Front-End Developer</span> who
          enjoys turning ideas into interactive, user-focused web experiences. I
          care about writing clean code, building intuitive interfaces, and
          creating products that solve real problems.
        </p>

        <p>
          My engineering background led me into software development, where I
          found my passion for{" "}
          <span className="highlight">
            Front-End Development, product building, and startups.
          </span>
        </p>
      </div>

      <div className="about-experience featured-experience">
        <div className="section-heading">
          <span className="section-icon">💼</span>

          <h4>Professional Experience</h4>
        </div>

        <div className="experience-header">
          <div>
            <h5>Front-End Developer · Intern</h5>

            <span className="company-name">iFikra</span>
          </div>

          <span className="experience-badge">Oct 2026 – Present</span>
        </div>

        <p>
          I'm currently a{" "}
          <span className="highlight">Front-End Developer at iFikra</span>,
          building a bilingual (English / Arabic) dental platform with{" "}
          <span className="highlight">Next.js, TypeScript, and Tailwind</span>{" "}
          — from the patient-facing website to the clinic dashboard — alongside
          medical websites in WordPress.
        </p>

        <p>
          Working on a real product with a team means{" "}
          <span className="highlight">
            shipping through pull requests, building RTL-ready, localized
            pages, and turning requirements into features people actually use.
          </span>
        </p>

        <p>
          Before that, my time at{" "}
          <span className="highlight">Arabia IT</span> moved me beyond
          academic projects and taught me to approach development with a
          professional mindset — maintainable code, clear communication, and
          taking ownership of my work.
        </p>
      </div>

      <div className="about-project">
        <div className="section-heading">
          <span className="section-icon">🚀</span>

          <h4>Building Products & Startups</h4>
        </div>

        <p>
          One of my most meaningful experiences was building{" "}
          <span className="highlight">ShoesFit</span>, our graduation project —
          smart shoes combining embedded systems, IoT, AI, and a web platform.
        </p>

        <p>
          The project received{" "}
          <span className="highlight">$1,000 in funding</span> and gave me the
          opportunity to experience the journey of turning an idea from a
          concept into a real product that people are willing to support.
        </p>

        <p>
          Today the project lives on as{" "}
          <span className="highlight">Vectos</span> — I'm growing it into a
          startup and working through the challenges of turning technology into
          a product with real users and business value.
        </p>
      </div>

      <div className="about-skills">
        <div className="section-heading">
          <span className="section-icon">💡</span>

          <h4>What I Bring</h4>
        </div>

        <div className="about-item featured-item">
          <div className="item-title">
            <span>💻</span>

            <h5>Front-End Development</h5>
          </div>

          <p>
            My main focus is building modern web applications using{" "}
            <span className="highlight">
              React.js, Next.js, JavaScript, TypeScript, Redux, Sass, and
              Material UI.
            </span>{" "}
            I enjoy transforming designs and ideas into responsive, scalable,
            and polished user experiences.
          </p>
        </div>

        <div className="about-item">
          <div className="item-title">
            <span>🧩</span>

            <h5>Product Mindset</h5>
          </div>

          <p>
            I don’t just focus on writing code. I enjoy understanding the
            problem, thinking about the user, and building solutions that can
            grow into useful products.
          </p>
        </div>

        <div className="about-item">
          <div className="item-title">
            <span>🤝</span>

            <h5>Leadership & Teamwork</h5>
          </div>

          <p>
            I led a <span className="highlight">12-person team at SEEF</span> to
            build a React.js mentorship website, bringing together beginners and
            experienced developers to deliver a working product.
          </p>
        </div>
      </div>

      <div className="supporting-skills">
        <div className="section-heading">
          <span className="section-icon">⚡</span>

          <h4>Beyond Front-End</h4>
        </div>

        <p className="supporting-intro">
          My background also gives me experience across different areas of
          technology, allowing me to understand products from more than just the
          software side.
        </p>

        <div className="supporting-grid">
          <div className="supporting-item">
            <span>🌐</span>

            <div>
              <h5>Networking</h5>

              <p>
                CCNA-trained with a foundation in Electronics & Communications
                Engineering.
              </p>
            </div>
          </div>

          <div className="supporting-item">
            <span>🤖</span>

            <div>
              <h5>AI & Data</h5>

              <p>
                Experience with Python, EDA, and Machine Learning through DEPI
                and AI internships.
              </p>
            </div>
          </div>

          <div className="supporting-item">
            <span>🔌</span>

            <div>
              <h5>Embedded & IoT</h5>

              <p>
                Hands-on experience through ShoesFit and hardware-software
                integration.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="about-personality">
        <p>
          I learn fast, communicate clearly, and enjoy turning ideas into
          products while helping teammates grow.
        </p>

        <p>
          <span className="highlight">Currently open to:</span> Front-End
          Developer roles, freelance projects, startup collaborations, and
          conversations with people interested in building and supporting new
          products.
        </p>
      </div>

      <div className="about-connect">
        <p>Let's build something meaningful together.</p>
      </div>
    </div>
  );
};

export default MeComponents;
