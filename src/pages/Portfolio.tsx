import { useLocation } from "react-router-dom";

function Portfolio() {
  const { state } = useLocation();

  if (!state) {
    return <p>No portfolio data found.</p>;
  }

  return (
    <div className="portfolioPage">
      <h1>{state.fullName}</h1>
      <h2>{state.jobTitle}</h2>

      <section>
        <h3>About Me</h3>
        <p>{state.aboutMe}</p>
      </section>

      <section>
        <h3>Skills</h3>
        <ul>
          {state.skills.map((s: string) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </section>

      <section>
        <h3>Experience</h3>
        {state.experiences.map((exp: any) => (
          <div key={exp.id}>
            <h4>{exp.title} @ {exp.company}</h4>
            <p>{exp.startDate} — {exp.endDate}</p>
            <p>{exp.description}</p>
            <strong>Technologies:</strong>
            <ul>
              {exp.technologies.map((t: string) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </div>
  );
}

export default Portfolio;