import { useEffect, useState } from "react";
import { AiOutlineHome, AiOutlineUser } from "react-icons/ai";
import { BiBook, BiMessageSquareDetail } from "react-icons/bi";
import { RiServiceLine } from "react-icons/ri";
import { FiFolder, FiImage, FiZap } from "react-icons/fi";
import "./Navbar.css";

const links = [
  { id: "header", label: "Home", Icon: AiOutlineHome },
  { id: "about", label: "About", Icon: AiOutlineUser },
  { id: "venture", label: "Venture", Icon: FiZap },
  { id: "experience", label: "Skills", Icon: BiBook },
  { id: "projects", label: "Projects", Icon: FiFolder },
  { id: "services", label: "Services", Icon: RiServiceLine },
  { id: "gallery", label: "Gallery", Icon: FiImage },
  { id: "contact", label: "Contact", Icon: BiMessageSquareDetail },
];

// sections without their own icon light up a neighbour instead
// (testimonial has none, so it keeps whatever was active before it)
const aliases = { footer: "contact" };

export default function Navbar() {
  const [active, setActive] = useState("header");

  // scroll spy: whichever section crosses the middle of the screen is active
  useEffect(() => {
    const ids = [...links.map((l) => l.id), ...Object.keys(aliases)];
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = entry.target.id;
          setActive(aliases[id] || id);
        });
      },
      // a thin horizontal band at 45% of the viewport height
      { rootMargin: "-45% 0px -54% 0px" }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <nav aria-label="Sections">
      {links.map(({ id, label, Icon }) => (
        <a
          key={id}
          href={`#${id}`}
          aria-label={label}
          title={label}
          aria-current={active === id ? "true" : undefined}
          className={active === id ? "active" : ""}
          onClick={() => {
            setActive(id);
            // the case study is collapsed by default — the ⚡ icon opens it
            if (id === "venture") window.dispatchEvent(new Event("open-venture"));
          }}
        >
          <Icon />
        </a>
      ))}
    </nav>
  );
}
