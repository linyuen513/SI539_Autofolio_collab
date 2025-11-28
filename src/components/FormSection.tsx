import "../styles/FormSection.css";
import { useState } from "react";
import React from "react";
import Button from "../components/Button";
const allSkills = [
  "Figma",
  "React",
  "UI Design",
  "User Research",
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "Node.js",
  "Agile Methodologies",
];

// Add Experience interface
interface Experience {
  id: string;
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
  technologies: string[];
}

function FormSection() {
  const [fullName, setFullName] = useState<string>("");
  const [jobTitle, setJobTitle] = useState<string>("");
  const [aboutMe, setAboutMe] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [github, setGithub] = useState<string>("");
  const [linkedIn, setLinkedIn] = useState<string>("");
  const [inputSkill, setInputSkill] = useState<string>(""); // input skill
  const [skills, setSkills] = useState<string[]>([]); // skill(tag) you choosed
  const filteredSkills = allSkills.filter((skill) =>
    skill.toLowerCase().includes(inputSkill.toLowerCase())
  );

  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [techInputs, setTechInputs] = useState<{ [key: string]: string }>({});

  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  function addSkill(skill: string) {
    if (!skill.trim()) return;

    if (!skills.includes(skill)) {
      setSkills([...skills, skill]);
    }
    setInputSkill(""); // 清空輸入
  }

  function removeSkill(skill: string) {
    setSkills(skills.filter((s) => s !== skill));
  }

  // Experience
  function addExperience() {
    const newExperience: Experience = {
      id: Date.now().toString(),
      title: "",
      company: "",
      startDate: "",
      endDate: "",
      description: "",
      technologies: [],
    };
    setExperiences([...experiences, newExperience]);
  }

  function updateExperience(
    id: string,
    field: keyof Experience,
    value: string | string[]
  ) {
    setExperiences(
      experiences.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    );
  }

  function removeExperience(id: string) {
    setExperiences(experiences.filter((exp) => exp.id !== id));
  }

  // Tech input
  function updateTechInput(expId: string, value: string) {
    setTechInputs((prev) => ({
      ...prev,
      [expId]: value,
    }));
  }
  function getFilteredTechSkills(expId: string) {
    const input = techInputs[expId] || "";
    return allSkills.filter((skill) =>
      skill.toLowerCase().includes(input.toLowerCase())
    );
  }

  function addTechnologyToExperience(expId: string, tech: string) {
    if (!tech.trim()) return;
    setExperiences(
      experiences.map((exp) =>
        exp.id === expId && !exp.technologies.includes(tech)
          ? { ...exp, technologies: [...exp.technologies, tech] }
          : exp
      )
    );
    // 清空該 experience 的技術輸入
    setTechInputs((prev) => ({
      ...prev,
      [expId]: "",
    }));
  }

  function removeTechnologyFromExperience(expId: string, tech: string) {
    setExperiences(
      experiences.map((exp) =>
        exp.id === expId
          ? { ...exp, technologies: exp.technologies.filter((t) => t !== tech) }
          : exp
      )
    );
  }
  function handleGeneratePortfolio() {
    setIsGenerating(true);
    // Simulate portfolio generation
    setTimeout(() => {
      setIsGenerating(false);
      alert("Portfolio generated successfully!");
    }, 2000);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); // don't refresh page
    console.log("Submitted:", fullName);
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="portfolioForm">
        {/* <!-- Section 1: Personal Info --> */}
        <section className="formSection">
          <h2>Personal Information</h2>
          <p>Tell us about yourself</p>
          {/* Full name */}
          <div className="formDiv">
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <input
                id="fullName"
                type="text"
                name="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Anne Lin"
              />
            </div>
            {/* Job Title */}
            <div className="form-group">
              <label htmlFor="jobTitle">Job Title</label>
              <input
                id="jobTitle"
                type="text"
                name="jobTitle"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                placeholder="UI/UX Designer"
              />
            </div>
            {/* About me */}
            <div className="form-group full-row">
              <label htmlFor="aboutMe">About Me</label>
              <textarea
                id="aboutMe"
                name="aboutMe"
                value={aboutMe}
                onChange={(e) => setAboutMe(e.target.value)}
                placeholder="Share your story, experience, and what makes you unique... "
              />
            </div>
          </div>
        </section>
        {/* <!-- Section 2: Contact Details --> */}
        <section className="formSection">
          <h2>Contact Details</h2>
          <p>How can people reach you?</p>
          {/* Email */}
          <div className="formDiv">
            <div className="form-group">
              <label htmlFor="email">Full Name</label>
              <input
                id="email"
                type="text"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Anne Lin"
              />
            </div>
            {/* Phone */}
            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input
                id="phone"
                type="tel"
                name="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 7706269283"
              />
            </div>
            {/* Location */}
            <div className="form-group">
              <label htmlFor="location">Location</label>
              <input
                id="location"
                type="text"
                name="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Ann Arbor, MI"
              />
            </div>
            {/* Github URL */}
            <div className="form-group">
              <label htmlFor="github">Github URL</label>
              <input
                id="github"
                type="url"
                name="github"
                value={github}
                onChange={(e) => setGithub(e.target.value)}
                placeholder="https://github.com/username"
              />
            </div>
            {/* LinkedIn URL */}
            <div className="form-group">
              <label htmlFor="github">LinkedIn URL</label>
              <input
                id="linkedIn"
                type="url"
                name="linkedIn"
                value={linkedIn}
                onChange={(e) => setLinkedIn(e.target.value)}
                placeholder="https://linkedin.com/in/username"
              />
            </div>
          </div>
        </section>
        {/* <!-- Section 3: Skills --> */}
        <section className="formSection">
          <h2>Skills & Expertise</h2>
          <p>What are you great at?</p>
          {/* Skills */}
          <div className="formDiv">
            <div className="form-group full-row">
              <label htmlFor="skill">Skills</label>
              <div className="skill-input-wrapper">
                <input
                  id="skill"
                  type="text"
                  name="skill"
                  value={inputSkill}
                  onChange={(e) => setInputSkill(e.target.value)}
                  placeholder="e.g., Figma, React, Typography"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addSkill(inputSkill);
                    }
                  }}
                />
                {/* filter Dropdown, add skill to skills */}
                {inputSkill && filteredSkills.length > 0 && (
                  <div className="skills-dropdown">
                    {filteredSkills.map((s) => (
                      <div
                        key={s}
                        className="dropdown-item"
                        onClick={() => addSkill(s)}
                      >
                        {s}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {/* add tag, remove btn */}
              <div className="skills-tags">
                {skills.map((s) => (
                  <span className="skill-tag" key={s}>
                    {s}
                    <button
                      className="remove-tag"
                      onClick={() => removeSkill(s)}
                    >
                      ✕
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
        {/* <!-- Section 4: Experiences --> */}
        <section className="formSection ">
          <h2>Professional Experience</h2>
          <p>Share your work history and achievements</p>

          <div className="formDiv">
            <div className="form-group full-row ">
              {experiences.map((exp, index) => (
                <div key={exp.id} className="experience-item experienceSection">
                  <div className="experience-header">
                    <h3>Experience {index + 1}</h3>
                    <button
                      type="button"
                      className="remove-experience"
                      onClick={() => removeExperience(exp.id)}
                    >
                      ✕
                    </button>
                  </div>

                  <div>
                    {/* Job Title */}
                    <div className="form-group">
                      <label htmlFor={`title-${exp.id}`}>Job Title *</label>
                      <input
                        id={`title-${exp.id}`}
                        type="text"
                        value={exp.title}
                        onChange={(e) =>
                          updateExperience(exp.id, "title", e.target.value)
                        }
                        placeholder="Senior UI/UX Designer"
                      />
                    </div>

                    {/* Company */}
                    <div className="form-group">
                      <label htmlFor={`company-${exp.id}`}>Company *</label>
                      <input
                        id={`company-${exp.id}`}
                        type="text"
                        value={exp.company}
                        onChange={(e) =>
                          updateExperience(exp.id, "company", e.target.value)
                        }
                        placeholder="Google"
                      />
                    </div>

                    {/* Start Date */}
                    <div className="form-group">
                      <label htmlFor={`startDate-${exp.id}`}>Start Date</label>
                      <input
                        id={`startDate-${exp.id}`}
                        type="month"
                        value={exp.startDate}
                        onChange={(e) =>
                          updateExperience(exp.id, "startDate", e.target.value)
                        }
                      />
                    </div>

                    {/* End Date */}
                    <div className="form-group">
                      <label htmlFor={`endDate-${exp.id}`}>End Date</label>
                      <input
                        id={`endDate-${exp.id}`}
                        type="month"
                        value={exp.endDate}
                        onChange={(e) =>
                          updateExperience(exp.id, "endDate", e.target.value)
                        }
                        placeholder="Leave blank if current position"
                      />
                    </div>

                    {/* Description */}
                    <div className="form-group full-row">
                      <label htmlFor={`description-${exp.id}`}>
                        Description
                      </label>
                      <textarea
                        id={`description-${exp.id}`}
                        value={exp.description}
                        onChange={(e) =>
                          updateExperience(
                            exp.id,
                            "description",
                            e.target.value
                          )
                        }
                        placeholder="Describe your responsibilities, achievements, and impact..."
                        rows={3}
                      />
                    </div>

                    {/* Technologies Used */}
                    <div className="form-group full-row techSection">
                      <label htmlFor={`tech-${exp.id}`}>
                        Technologies Used
                      </label>
                      <div className="skill-input-wrapper">
                        <input
                          id={`tech-${exp.id}`}
                          type="text"
                          value={techInputs[exp.id] || ""} // 使用獨立的輸入狀態
                          onChange={(e) =>
                            updateTechInput(exp.id, e.target.value)
                          } // 更新獨立狀態
                          placeholder="e.g., Figma, React, TypeScript"
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              addTechnologyToExperience(
                                exp.id,
                                techInputs[exp.id] || ""
                              );
                            }
                          }}
                        />
                        {/* filter Dropdown, add experiencee to experiences */}
                        {techInputs[exp.id] &&
                          getFilteredTechSkills(exp.id).length > 0 && (
                            <div className="skills-dropdown">
                              {getFilteredTechSkills(exp.id).map((skill) => (
                                <div
                                  key={skill}
                                  className="dropdown-item"
                                  onClick={() =>
                                    addTechnologyToExperience(exp.id, skill)
                                  }
                                >
                                  {skill}
                                </div>
                              ))}
                            </div>
                          )}
                      </div>
                      <div className="tech-tags">
                        {exp.technologies.map((tech) => (
                          <span className="tech-tag" key={tech}>
                            {tech}
                            <button
                              type="button"
                              className="remove-tag"
                              onClick={() =>
                                removeTechnologyFromExperience(exp.id, tech)
                              }
                            >
                              ✕
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <button
                type="button"
                className="add-experience-btn"
                onClick={addExperience}
              >
                + Add Experience
              </button>
            </div>
          </div>
        </section>

        {/* <!-- Section 5: Generate Portfolio --> */}
        <section className="formSection generate-section">
          <div className="generate-content">
            <h2>Ready to Create Your Portfolio?</h2>
            <p>
              This will create a personalized portfolio website based on your
              information
            </p>
            <div className="formDiv">
              <div className="full-row generate-btn-wrap">
                <Button
                  type="button"
                  className={`generate-btn ${isGenerating ? "generating" : ""}`}
                  onClick={handleGeneratePortfolio}
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    <>
                      <span className="spinner"></span>
                      Generating Portfolio...
                    </>
                  ) : (
                    <>Generate My Portfolio</>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </section>
      </form>
    </>
  );
}

export default FormSection;
