/**
 * Résumé content.
 *
 * This starter résumé uses only project and learning claims represented in this
 * workspace; it deliberately avoids inventing employers, degrees, or contact
 * details. Replace these exported values as Gavin's public information grows.
 */

import type { ResumeEntry, ResumeSkillGroup } from "../types";

/** A concise professional introduction used at the top of the résumé. */
export const resumeSummary =
  "Developer and systems learner building across native Windows, modern C++, graphics, and the web. Focused on understanding each layer, keeping dependencies intentional, and documenting software so the next person can run and extend it.";

/** Skills grouped by the kind of work they support. */
export const resumeSkills: ResumeSkillGroup[] = [
  {
    heading: "Languages",
    skills: ["C++", "C", "TypeScript", "JavaScript", "HTML", "CSS", "Assembly fundamentals"],
  },
  {
    heading: "Native & graphics",
    skills: ["Win32", "OpenGL", "WGL", "Procedural terrain", "Real-time input", "Resource ownership"],
  },
  {
    heading: "Web",
    skills: ["React", "Node.js", "Vite", "Responsive UI", "Accessibility", "Static serving"],
  },
  {
    heading: "Build & verification",
    skills: ["CMake", "Ninja", "Git", "GCC", "Clang", "MSVC", "Technical documentation"],
  },
];

/** Project-based experience, intentionally described without fictional jobs. */
export const resumeEntries: ResumeEntry[] = [
  {
    period: "Current",
    title: "Independent Software Developer",
    organization: "Personal systems and interface projects",
    summary:
      "Builds complete learning projects that connect low-level behavior to clear interfaces and reproducible instructions.",
    achievements: [
      "Created a native OpenGL terrain engine with streamed procedural chunks, walking collision, and a free-fly camera.",
      "Built a responsive React and TypeScript portfolio with a dependency-free Node.js production server.",
      "Developed runnable references for the C++ standard library, Win32 APIs, and graphics ecosystems.",
    ],
  },
  {
    period: "Ongoing",
    title: "Systems Programming Study",
    organization: "Independent technical development",
    summary:
      "Studies software from language-level abstractions down through operating-system and graphics APIs.",
    achievements: [
      "Practices defensive ownership of files, memory, handles, threads, and GPU resources.",
      "Uses multiple compilers and warning levels to catch portability and correctness issues early.",
      "Documents build steps, controls, architecture, and extension points alongside the source.",
    ],
  },
];
