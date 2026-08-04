/**
 * Homepage content.
 *
 * Components should describe presentation, not bury editable prose in markup.
 * Keeping repeated content here makes adding a card as simple as adding an
 * object with the fields required by the shared TypeScript types.
 */

import type { Principle, Project, ToolGroup } from "../types";

/** Projects currently highlighted on the homepage. */
export const projects: Project[] = [
  {
    number: "01",
    title: "Standard Library Atlas",
    summary:
      "A runnable C++ reference that turns containers, algorithms, streams, memory, and concurrency into small experiments.",
    status: "Learning system",
    tags: ["C++20", "STL", "Documentation"],
    accent: "lime",
  },
  {
    number: "02",
    title: "Win32 Foundations",
    summary:
      "A practical field guide to Unicode, handles, windows, messages, files, threads, COM, and defensive resource ownership.",
    status: "Native platform",
    tags: ["Windows", "C++", "Systems"],
    accent: "blue",
  },
  {
    number: "03",
    title: "OpenGL Terrain Engine",
    summary:
      "A dependency-light native renderer with free-camera controls, terrain collision, and deterministic chunks generated around the player.",
    status: "Visual computing",
    tags: ["OpenGL", "C++", "Procedural terrain"],
    accent: "orange",
  },
];

/** Technology groups that summarize the layers used across the projects. */
export const toolGroups: ToolGroup[] = [
  {
    label: "01 / Core",
    heading: "Systems & native",
    description: "Understanding the machine, not just the abstraction above it.",
    tools: ["C++", "C", "Assembly", "Win32", "CMake", "QEMU"],
  },
  {
    label: "02 / Interface",
    heading: "Web & interaction",
    description: "Fast, readable interfaces built with a small dependency surface.",
    tools: ["TypeScript", "React", "Node.js", "HTML", "CSS", "Vite"],
  },
  {
    label: "03 / Method",
    heading: "Build & verify",
    description: "Tight feedback loops: compile, inspect, test, and document.",
    tools: ["Git", "Ninja", "GCC", "Clang", "MSVC", "VS Code"],
  },
];

/** Ordered principles used to render the numbered method list. */
export const principles: Principle[] = [
  {
    number: "01",
    title: "Understand the layer",
    text: "Learn what an abstraction owns, what it hides, and what happens when it fails.",
  },
  {
    number: "02",
    title: "Build the smallest complete thing",
    text: "A working loop teaches more than a folder full of disconnected fragments.",
  },
  {
    number: "03",
    title: "Verify the result",
    text: "Compile with warnings, exercise the real path, and leave instructions for the next run.",
  },
];

/** The ticker repeats this compact list to form a continuous visual strip. */
export const tickerItems = [
  "C++",
  "TypeScript",
  "React",
  "Node.js",
  "Win32",
  "OpenGL",
  "CMake",
  "QEMU",
];
