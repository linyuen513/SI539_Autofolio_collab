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
      </form>
    </>
  );
}

export default FormSection;
