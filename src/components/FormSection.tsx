import "../styles/FormSection.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Experience } from "../lib/types";
import { allSkills } from "../lib/contents";

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

  const navigate = useNavigate();

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

  function isFormValid() {
    return (
      // List of required fields
      fullName &&
      jobTitle &&
      aboutMe &&
      email &&
      phone &&
      location &&
      // Skills and experiences must have at least one item
      skills.length > 0 &&
      experiences.length > 0 &&
      // For each experience,
      // title, company, startDate, and description must not be empty
      experiences.every(
        (exp) => exp.title && exp.company && exp.startDate && exp.description
      )
    );
  }

  function handleGeneratePortfolio() {
    navigate("/portfolio", {
      state: {
        fullName,
        jobTitle,
        aboutMe,
        email,
        phone,
        location,
        github,
        linkedIn,
        skills,
        experiences,
      },
    });
  }

  return (
    <form className="portfolioForm">
      {/* <!-- Section 1: Personal Info --> */}
      <section className="formSection">
        <h2>Personal Information</h2>
        <p>Tell us about yourself</p>
        {/* Full name */}
        <div className="formDiv">
          <div className="form-group">
            <label htmlFor="fullName">Full Name *</label>
            <input
              id="fullName"
              type="text"
              name="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Your Name"
              required
            />
          </div>
          {/* Job Title */}
          <div className="form-group">
            <label htmlFor="jobTitle">Job Title *</label>
            <input
              id="jobTitle"
              type="text"
              name="jobTitle"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              placeholder="UI/UX Designer"
              required
            />
          </div>
          {/* About me */}
          <div className="form-group full-row">
            <label htmlFor="aboutMe">About Me *</label>
            <textarea
              id="aboutMe"
              name="aboutMe"
              value={aboutMe}
              onChange={(e) => setAboutMe(e.target.value)}
              placeholder="Share your story, experience, and what makes you unique... "
              required
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
            <label htmlFor="email">Email *</label>
            <input
              id="email"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your Email"
              required
            />
          </div>
          {/* Phone */}
          <div className="form-group">
            <label htmlFor="phone">Phone *</label>
            <input
              id="phone"
              type="tel"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+1 7706269283"
              required
            />
          </div>
          {/* Location */}
          <div className="form-group">
            <label htmlFor="location">Location *</label>
            <input
              id="location"
              type="text"
              name="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Ann Arbor, MI"
              required
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
                  <button className="remove-tag" onClick={() => removeSkill(s)}>
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
                      required
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
                      required
                    />
                  </div>

                  {/* Start Date */}
                  <div className="form-group">
                    <label htmlFor={`startDate-${exp.id}`}>Start Date *</label>
                    <input
                      id={`startDate-${exp.id}`}
                      type="month"
                      value={exp.startDate}
                      onChange={(e) =>
                        updateExperience(exp.id, "startDate", e.target.value)
                      }
                      required
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
                      Description *
                    </label>
                    <textarea
                      id={`description-${exp.id}`}
                      value={exp.description}
                      onChange={(e) =>
                        updateExperience(exp.id, "description", e.target.value)
                      }
                      placeholder="Describe your responsibilities, achievements, and impact..."
                      rows={3}
                      required
                    />
                  </div>

                  {/* Technologies Used */}
                  <div className="form-group full-row techSection">
                    <label htmlFor={`tech-${exp.id}`}>Technologies Used</label>
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
              <button
                type="button"
                className="generate-btn"
                onClick={handleGeneratePortfolio}
                disabled={!isFormValid()}
              >
                Generate My Portfolio
              </button>
            </div>
          </div>
        </div>
      </section>
    </form>
  );
}

export default FormSection;
