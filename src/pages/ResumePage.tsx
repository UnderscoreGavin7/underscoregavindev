/**
 * Dedicated résumé page available at /resume.
 *
 * The page uses semantic sections and print-specific CSS, so the same source can
 * be read on screen or saved as a clean PDF from the browser's Print dialog.
 */

import { resumeEntries, resumeSkills, resumeSummary } from "../data/resume";

/** Opens the browser's native print dialog; users can print or choose Save as PDF. */
function printResume() {
  window.print();
}

/** Renders the résumé as a two-column document on wide screens and one column on mobile. */
export function ResumePage() {
  return (
    <article className="resume-page">
      {/* Introductory band contains identity, summary, and résumé actions. */}
      <header className="resume-hero">
        <div className="resume-hero-copy">
          <p className="section-kicker">Résumé / 2026</p>
          <h1>Gavin</h1>
          <p className="resume-role">Systems & software developer</p>
          <p className="resume-summary">{resumeSummary}</p>
        </div>

        {/* d-flex demonstrates a Bootstrap utility while resume-actions retains
            the project's original responsive direction and gap rules. */}
        <div className="resume-actions d-flex" aria-label="Résumé actions">
          <button className="button button-primary" type="button" onClick={printResume}>
            Print / Save PDF
          </button>
          <a className="button button-secondary" href="/">
            Return to portfolio
          </a>
        </div>
      </header>

      <div className="resume-layout">
        {/* The sidebar puts scannable facts before the longer experience timeline. */}
        <aside className="resume-sidebar" aria-label="Skills and details">
          <section className="resume-block">
            <p className="resume-label">Contact</p>
            <h2>Connect</h2>
            <dl className="resume-contact">
              <div>
                <dt>Website</dt>
                <dd><a href="/">underscoregavin.dev</a></dd>
              </div>
              <div>
                <dt>Location</dt>
                <dd>United States</dd>
              </div>
              <div>
                <dt>Availability</dt>
                <dd>Project collaboration</dd>
              </div>
            </dl>
          </section>

          <section className="resume-block">
            <p className="resume-label">Capabilities</p>
            <h2>Technical skills</h2>
            <div className="resume-skill-groups">
              {resumeSkills.map((group) => (
                <div className="resume-skill-group" key={group.heading}>
                  <h3>{group.heading}</h3>
                  <ul>
                    {group.skills.map((skill) => <li key={skill}>{skill}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        </aside>

        {/* Main column describes evidence of the skills listed in the sidebar. */}
        <div className="resume-main">
          <section className="resume-block">
            <p className="resume-label">Experience</p>
            <h2>Project-based development</h2>
            <div className="resume-timeline">
              {resumeEntries.map((entry) => (
                <article className="resume-entry" key={`${entry.period}-${entry.title}`}>
                  <p className="resume-period">{entry.period}</p>
                  <h3>{entry.title}</h3>
                  <p className="resume-organization">{entry.organization}</p>
                  <p>{entry.summary}</p>
                  <ul>
                    {entry.achievements.map((achievement) => (
                      <li key={achievement}>{achievement}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          <section className="resume-block resume-learning">
            <p className="resume-label">Development</p>
            <h2>Learning approach</h2>
            <p>
              Independent, build-first study across systems programming, native Windows development,
              real-time graphics, web interfaces, build systems, and software verification.
            </p>
            <p>
              Each project is treated as a complete path: define the layer, implement the smallest
              useful system, compile with strong warnings, exercise the actual runtime, and document
              how another developer can continue the work.
            </p>
          </section>
        </div>
      </div>

      {/* This note is useful during editing but print CSS removes it from exported copies. */}
      <p className="resume-editor-note">
        This résumé intentionally contains no invented employer, degree, email, or social profile.
        Update <code>src/data/resume.ts</code> when verified personal details are ready to publish.
      </p>
    </article>
  );
}
