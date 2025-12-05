import { useState } from "react";
import { useLocation } from "react-router-dom";
import "../styles/Portfolio.css";

interface Experience {
  id: string;
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
  technologies: string[];
}

function Portfolio() {
  const { state } = useLocation();
  const [activeSection, setActiveSection] = useState("home");

  if (!state) {
    return <p>No portfolio data found.</p>;
  }

  // Scroll to section function
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(sectionId);
    }
  };

  return (
    <div className="portfolio-container">
      {/* Navigation Bar */}
      <nav className="portfolio-nav">
        <ul className="nav-links">
          <li>
            <button
              onClick={() => scrollToSection("home")}
              className={activeSection === "home" ? "active" : ""}
            >
              Home
            </button>
          </li>
          <li>
            <button
              onClick={() => scrollToSection("about")}
              className={activeSection === "about" ? "active" : ""}
            >
              About
            </button>
          </li>
          <li>
            <button
              onClick={() => scrollToSection("skills")}
              className={activeSection === "skills" ? "active" : ""}
            >
              Skills
            </button>
          </li>
          <li>
            <button
              onClick={() => scrollToSection("experience")}
              className={activeSection === "experience" ? "active" : ""}
            >
              Experience
            </button>
          </li>
        </ul>
        <button className="contact-btn">Contact</button>
      </nav>

      {/* Main Content */}
      <main className="portfolio-main">
        {/* Hero Section */}
        <section id="home" className="hero-section">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">
                <span className="name">
                  Hi there, my name is {state.fullName}.
                </span>
                <br />
                <span className="role-1"> I am a </span>
                <br />
                <span className="role-2">{state.jobTitle}</span>
              </h1>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="about-section">
          <h2 className="section-title">ABOUT ME</h2>
          <div className="about-content">
            <div className="about-text">
              <p>{state.aboutMe}</p>
            </div>

            <div className="about-stats">
              <div className="stat">
                <h3>{state.experiences.length}</h3>
                <p>Years of Experience</p>
              </div>
              <div className="stat">
                <h3>{state.experiences.length}</h3>
                <p>Completed Projects</p>
              </div>
            </div>
            <div className="contact-info">
              <div className="contact-item">
                <strong>Call Today :</strong>
                <span>{state.phone}</span>
              </div>
              <div className="contact-item">
                <strong>Email :</strong>
                <span>{state.email}</span>
              </div>
            </div>
            {/* <button className="story-btn">MY STORY</button> */}
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="skills-section">
          <div className="section-badge">●</div>
          <h2 className="section-title">WHAT I CAN DO FOR YOU</h2>
          <div className="skills-content">
            <p className="skills-description">
              As a digital designer with a technical edge, I bring together user
              research, interface design, and frontend development to turn
              complex ideas into intuitive, engaging products.
            </p>
            <div className="skills-list">
              {state.skills.map((skill: string, index: number) => (
                <div key={skill} className="skill-item">
                  <span className="skill-number">{index + 1}.</span>
                  <span className="skill-name">{skill.toUpperCase()}</span>
                  <button className="skill-toggle">⌄</button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Projects Section */}
        <section id="experience" className="projects-section">
          <div className="section-badge">●</div>
          <h2 className="section-title">FEATURED PROJECTS</h2>
          <p className="section-description">
            These selected projects showcase my process-driven approach to
            design — using research, visual storytelling, and frontend
            implementation to solve real-world problems across public service
            and commercial domains.
          </p>

          <div className="projects-grid">
            {state.experiences.map((exp: Experience) => (
              <div key={exp.id} className="project-card">
                <div className="project-image">
                  <div className="project-mockups">
                    {/* Placeholder for project images */}
                    <div className="mockup-phone">📱</div>
                    <div className="mockup-phone">📱</div>
                    <div className="mockup-phone">📱</div>
                    <div className="mockup-phone">📱</div>
                    <div className="mockup-phone">📱</div>
                  </div>
                  <div className="project-overlay">
                    <h3 className="project-title">{exp.title}</h3>
                    <p className="project-subtitle">REDESIGN</p>
                    {/* <div className="project-arrow">↗</div> */}
                  </div>
                </div>
                <div className="project-hover-info">
                  <h4>
                    {exp.title} @ {exp.company}
                  </h4>
                  <p className="project-dates">
                    {exp.startDate} — {exp.endDate}
                  </p>
                  <p className="project-description">{exp.description}</p>
                  <div className="project-tech">
                    <strong>Technologies:</strong>
                    <div className="tech-tags">
                      {exp.technologies.map((tech: string) => (
                        <span key={tech} className="tech-tag">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default Portfolio;
