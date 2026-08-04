/**
 * Portfolio homepage.
 *
 * Static arrays live in data/portfolio.ts, while this component maps each array
 * into semantic HTML. React's map calls remove duplicated card markup and keep
 * the data-to-interface relationship easy to follow.
 */

import { ArrowIcon } from "../components/Icons";
import { principles, projects, tickerItems, toolGroups } from "../data/portfolio";

/** Chooses the compact symbol displayed inside a project card. */
function projectSymbol(projectNumber: string) {
  if (projectNumber === "01") return "< >";
  if (projectNumber === "02") return "▦";
  return "◉";
}

/** Renders the landing page sections inside App's shared layout. */
export function HomePage() {
  return (
    <>
      {/* The hero introduces the person, focus areas, and primary actions. */}
      <section className="hero" id="top">
        {/* Decorative grid is hidden from screen readers because it conveys no content. */}
        <div className="hero-grid" aria-hidden="true" />

        <div className="hero-copy">
          <p className="eyebrow">
            <span className="status-dot" /> Developer / systems learner
          </p>
          <h1>
            Building from the
            <span>interface down.</span>
          </h1>
          <p className="hero-intro">
            I’m Gavin. I explore the layers between polished interfaces and the machinery beneath
            them—then turn what I learn into working software.
          </p>
          {/* Bootstrap supplies the display/wrapping utilities; styles.css owns
              the custom button appearance and spacing. */}
          <div className="hero-actions d-flex flex-wrap">
            <a className="button button-primary" href="#work">
              Explore the work <ArrowIcon />
            </a>
            <a className="button button-secondary" href="/resume">
              View résumé
            </a>
          </div>
        </div>

        {/* A code sample communicates the same introduction in a developer-native form. */}
        <div className="code-card" aria-label="Developer profile represented as TypeScript">
          <div className="window-bar">
            <span className="window-dot red" />
            <span className="window-dot amber" />
            <span className="window-dot green" />
            <span className="window-name">profile.ts</span>
          </div>
          <pre>
            <code>
              <span className="token-muted">01</span>{" "}
              <span className="token-keyword">const</span> developer = {"{"}
              {"\n"}<span className="token-muted">02</span> name:{" "}
              <span className="token-string">&quot;Gavin&quot;</span>,
              {"\n"}<span className="token-muted">03</span> focus: [
              {"\n"}<span className="token-muted">04</span>{"   "}
              <span className="token-string">&quot;systems&quot;</span>,
              {"\n"}<span className="token-muted">05</span>{"   "}
              <span className="token-string">&quot;interfaces&quot;</span>,
              {"\n"}<span className="token-muted">06</span>{"   "}
              <span className="token-string">&quot;graphics&quot;</span>,
              {"\n"}<span className="token-muted">07</span> ],
              {"\n"}<span className="token-muted">08</span> approach:{" "}
              <span className="token-string">&quot;learn_by_building&quot;</span>,
              {"\n"}<span className="token-muted">09</span> status:{" "}
              <span className="token-lime">&quot;shipping&quot;</span>,
              {"\n"}<span className="token-muted">10</span> {"}"}{" "}
              <span className="token-muted">as const</span>;
            </code>
          </pre>
          <div className="code-footer">
            <span>TypeScript</span>
            <span className="code-ready"><i /> Ready</span>
          </div>
        </div>

        {/* These facts remain compact enough to scan at the bottom of the hero. */}
        <div className="hero-facts" aria-label="Current focus">
          <div><span>Focus</span><strong>Systems + web</strong></div>
          <div><span>Platform</span><strong>Windows / native</strong></div>
          <div><span>Mode</span><strong>Learn by building</strong></div>
        </div>
      </section>

      {/* The ticker is visual context; the label still identifies it accessibly. */}
      <div className="ticker" aria-label="Technology list">
        <div>
          {tickerItems.map((item) => (
            <span key={item}>{item}<i>✦</i></span>
          ))}
        </div>
      </div>

      {/* Project data becomes one article per item for meaningful document structure. */}
      <section className="section work-section" id="work">
        <div className="section-heading">
          <div>
            <p className="section-kicker">Selected work</p>
            <h2>Learning made tangible.</h2>
          </div>
          <p>
            Focused projects that turn difficult APIs and systems concepts into something concrete,
            inspectable, and reusable.
          </p>
        </div>

        <div className="project-grid">
          {projects.map((project) => (
            <article className={`project-card accent-${project.accent}`} key={project.number}>
              <div className="project-topline">
                <span>{project.number}</span>
                <span>{project.status}</span>
              </div>
              <div className="project-symbol" aria-hidden="true">
                {projectSymbol(project.number)}
              </div>
              <h3>{project.title}</h3>
              <p>{project.summary}</p>
              <ul aria-label={`${project.title} technologies`}>
                {project.tags.map((tag) => <li key={tag}>{tag}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {/* Toolkit cards group individual technologies by the role they play. */}
      <section className="section toolkit-section" id="toolkit">
        <div className="section-heading compact">
          <div>
            <p className="section-kicker">Working toolkit</p>
            <h2>Broad enough to connect the layers.</h2>
          </div>
        </div>

        <div className="tool-grid">
          {toolGroups.map((group) => (
            <article className="tool-card" key={group.label}>
              <span className="tool-label">{group.label}</span>
              <h3>{group.heading}</h3>
              <p>{group.description}</p>
              <div className="tool-list">
                {group.tools.map((tool) => <span key={tool}>{tool}</span>)}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* The ordered list communicates that these principles form a sequence. */}
      <section className="section method-section" id="method">
        <div className="method-copy">
          <p className="section-kicker">The method</p>
          <h2>Curiosity, constrained into a repeatable loop.</h2>
          <p>
            Good software starts before the first line of code: clarify the layer, build one complete
            path, and verify the behavior you actually depend on.
          </p>
        </div>

        <ol className="principle-list">
          {principles.map((principle) => (
            <li key={principle.number}>
              <span>{principle.number}</span>
              <div>
                <h3>{principle.title}</h3>
                <p>{principle.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* The final call-to-action creates a clear transition to the résumé. */}
      <section className="closing-section">
        <div>
          <p className="section-kicker">Current status</p>
          <h2>Still learning. Already building.</h2>
        </div>
        <a className="button button-primary" href="/resume">
          Read the résumé <ArrowIcon />
        </a>
      </section>
    </>
  );
}
