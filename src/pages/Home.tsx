import profilePhoto from "../assets/Pitching_KMITL.jpg";
import { Reveal } from "../components/Reveal";
import {
  aboutParagraphs,
  education,
  highlights,
  nb,
  role,
  skillGroups,
} from "../data/site";
import { useGreeting } from "../hooks/useGreeting";
import { usePageMeta } from "../hooks/usePageMeta";

export function Home() {
  const greeting = useGreeting();
  usePageMeta("Tanachot Jekchatree — Applied Statistics & Data Analytics @KMITL", "/");

  return (
    <>
      {/* Hero */}
      <section className="hero shell">
        <div className="hero-text">
          <p className="greeting">{greeting}</p>
          <h1>Tanachot</h1>
          <p className="role">{role}</p>
          <ul className="mini-list">
            {highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="hero-photo">
          <img className="profile" src={profilePhoto} alt="Tanachot's profile picture" />
        </div>
      </section>

      {/* About */}
      <Reveal id="about" className="section shell">
        <h2 className="section-title">{nb("About Me")}</h2>
        <div className="about-content">
          {aboutParagraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </Reveal>

      {/* Education */}
      <Reveal id="education" className="section shell">
        <h2 className="section-title">{nb("Education")}</h2>
        <div className="education">
          <img className="edu-logo" src={education.logo} alt="KMITL Logo" />
          <div className="edu-info">
            <h3>{education.school}</h3>
            <p className="edu-degree">
              {education.degree} <span className="edu-date">{education.period}</span>
            </p>
            <p className="edu-detail">{education.detail}</p>
          </div>
        </div>
      </Reveal>

      {/* Skills (groups are built from the skillGroups array in data/site.ts) */}
      <Reveal id="skills" className="section shell">
        <h2 className="section-title">{nb("Skills & Languages")}</h2>
        <div className="skill-groups">
          {skillGroups.map((group) => {
            const count = group.items.length;
            const label = count === 1 ? group.singular : group.plural;

            return (
              <div className="skill-group" key={group.title}>
                <div className="card-head">
                  <h3>{group.title}</h3>
                  <span className="badge">
                    {count} {label}
                  </span>
                </div>
                <ul className="tag-list">
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </Reveal>
    </>
  );
}
