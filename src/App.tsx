import React, { useEffect } from "react";
import Header from "./Components/Header/Header.jsx";
import Navbar from "./Components/Navbar/Navbar.jsx";
import About from "./Components/About/About.jsx";
import Experience from "./Components/Experience/Experience.jsx";
import Services from "./Components/Services/Services.jsx";
import Projects from "./Components/Projects/Projects.jsx";
import Venture from "./Components/Venture/Venture.jsx";
import Gallery from "./Components/Gallery/Gallery.jsx";
import Testimonial from "./Components/Testimonial/Testimonial.jsx";
import Contact from "./Components/Contact/Contact.jsx";
import Footer from "./Components/Footer/Footer.jsx";
import ScrollProgress from "./Components/ScrollProgress/ScrollProgress.jsx";
import CommandPalette from "./Components/CommandPalette/CommandPalette.jsx";
import Cursor from "./Components/Cursor/Cursor.jsx";
import { useScrollReveal } from "./utils/useScrollReveal";
import { consoleGreeting } from "./utils/consoleGreeting";

function App() {
  useScrollReveal();
  useEffect(consoleGreeting, []);

  return (
    <div>
      <ScrollProgress />
      <Cursor />
      <CommandPalette />
      <Header />
      <Navbar />
      <About />
      <Venture />
      <Experience />
      <Projects />
      <Services />
      <Gallery />
      <Testimonial />
      <Contact />
      <Footer />
    </div>
  );
}
export default App;
