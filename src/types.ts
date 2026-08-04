/**
 * Shared TypeScript models.
 *
 * Keeping these shapes in one file lets data and components agree on the same
 * vocabulary. TypeScript reports an error if a required field is omitted or a
 * value uses the wrong type.
 */

/** The two color palettes supported by the CSS variable system. */
export type Theme = "dark" | "light";

/** Route names understood by the intentionally tiny application router. */
export type PageName = "home" | "resume" | "not-found";

/** A portfolio project displayed as one card on the homepage. */
export type Project = {
  number: string;
  title: string;
  summary: string;
  status: string;
  tags: string[];
  accent: "lime" | "blue" | "orange";
};

/** A related group of technologies displayed in the toolkit section. */
export type ToolGroup = {
  label: string;
  heading: string;
  description: string;
  tools: string[];
};

/** One step in the repeatable development method. */
export type Principle = {
  number: string;
  title: string;
  text: string;
};

/** One skill group shown in the résumé's skills column. */
export type ResumeSkillGroup = {
  heading: string;
  skills: string[];
};

/** One project-based experience entry on the résumé timeline. */
export type ResumeEntry = {
  period: string;
  title: string;
  organization: string;
  summary: string;
  achievements: string[];
};
