import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import type { Experience } from "../lib/types";
import "../styles/Portfolio.css";

// Code for later usage
// function generateWhatICanDo(
//   jobTitle: string,
//   skills: string[],
//   experiences: any[]
// ) {
//   const topSkills = skills.slice(0, 3).join(", ");

//   const role = jobTitle || "designer / developer";

//   const projectCount = experiences.length;

//   return `
//     As a ${role}, I specialize in turning ideas into clear, intuitive, and high-impact digital experiences.
//     I work with tools like ${topSkills} to design, iterate, and deliver solutions that make products easier
//     and more enjoyable to use.

//     With hands-on experience from ${projectCount} project${
//     projectCount > 1 ? "s" : ""
//   },
//     I bridge design and development to bring both clarity and execution to any team.
//   `;
// }

function Portfolio() {
  const { state } = useLocation();
  const [activeSection, setActiveSection] = useState("home");

  // Ensure the portfolio page starts at the top when navigated to
  useEffect(() => {
    window.scrollTo(0, 0);
    console.log(state);
  }, []);

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
      </nav>

      {/* Main Content */}
      <main className="portfolio-main">
        {/* Hero Section */}
        <section id="home" className="hero-section">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">
                <p className="name">
                  Hi there, my name is <strong>{state.fullName}</strong>.
                </p>
                <p className="role-1"> I am a </p>
                <p className="role-2">{state.jobTitle}</p>
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
                <p>Different Work Experiences</p>
              </div>
              <div className="stat">
                <h3>{state.experiences.length}</h3>
                <p>Completed Projects</p>
              </div>
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
          <h2 className="section-title">Skills</h2>

          <div className="skills-content">
            <div className="skills-grid">
              {(state.skills && state.skills.length ? state.skills : []).map(
                (skill: string, i: number) => {
                  return (
                    <div className="skill-card" key={skill + i}>
                      <div className="skill-name">{skill}</div>
                    </div>
                  );
                }
              )}
            </div>
          </div>
        </section>

        {/* Service Section */}
        {/* <section id="skills" className="skills-section">
          <h2 className="section-title">WHAT I CAN DO FOR YOU</h2>
          <div className="skills-content">
            <p className="skills-description">
              {generateWhatICanDo(
                state.jobTitle,
                state.skills,
                state.experiences
              )}
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
        </section> */}

        {/* Featured Projects Section */}
        <section id="experience" className="projects-section">
          <h2 className="section-title">Experiences</h2>
          {/* <p className="section-description">
            These selected projects showcase my process-driven approach to
            design — using research, visual storytelling, and frontend
            implementation to solve real-world problems across public service
            and commercial domains.
          </p> */}

          <div className="projects-grid">
            {state.experiences.map((exp: Experience) => (
              <div key={exp.id} className="project-card">
                {/* Card overlay */}
                <div className="project-image">
                  <div className="project-overlay">
                    <h3 className="project-title">{exp.company}</h3>
                  </div>
                </div>
                {/* Card hover info */}
                <div className="project-hover-info">
                  <h4>
                    {exp.title} @ {exp.company}
                  </h4>
                  <p className="project-dates">
                    {exp.startDate} ~ {exp.endDate}
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
      <footer className="footer">
        &copy; {new Date().getFullYear()} {state.fullName}. All rights reserved.
      </footer>
    </div>
  );
}

export default Portfolio;
