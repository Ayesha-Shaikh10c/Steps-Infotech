import React, { useState } from "react";
import {
  FaArrowRight,
  FaCode,
  FaRobot,
  FaCloud,
  FaShieldHalved,
} from "react-icons/fa6";

// TODO: swap these for real project data + screenshots once available
const categories = [
  "All",
  "Web Development",
  "AI & Data",
  "Cloud & DevOps",
  "Cybersecurity",
];

const categoryIcon = {
  "Web Development": FaCode,
  "AI & Data": FaRobot,
  "Cloud & DevOps": FaCloud,
  Cybersecurity: FaShieldHalved,
};

const projects = [
  {
    id: 1,
    title: "TechInsights Dashboard",
    client: "Internal Product — Analytics",
    category: "AI & Data",
    description:
      "An AI-powered analytics dashboard that surfaces trending technical topics, threat alerts and engagement metrics in one view for decision-makers.",
    tech: ["React", "Node.js", "MongoDB", "Chart.js"],
    outcome: "40% faster reporting turnaround",
    featured: true,
  },
  {
    id: 2,
    title: "SkillPath AI Advisor",
    client: "EdTech Client",
    category: "AI & Data",
    description:
      "A personalized career roadmap generator that recommends learning paths based on a student's current skills and target role.",
    tech: ["React", "Express", "OpenAI API"],
    outcome: "3,000+ roadmaps generated",
  },
  {
    id: 3,
    title: "CloudSecure Migration",
    client: "Manufacturing Enterprise",
    category: "Cloud & DevOps",
    description:
      "Migrated a legacy on-premise system to scalable cloud infrastructure with a zero-downtime CI/CD pipeline.",
    tech: ["AWS", "Docker", "GitHub Actions"],
    outcome: "99.9% uptime post-migration",
  },
  {
    id: 4,
    title: "ShieldNet Threat Monitor",
    client: "Financial Services Client",
    category: "Cybersecurity",
    description:
      "A real-time threat detection dashboard built for SOC teams to flag and triage anomalies as they happen.",
    tech: ["React", "Node.js", "WebSockets"],
    outcome: "60% faster incident response",
  },
  {
    id: 5,
    title: "EduBridge LMS",
    client: "Education Client",
    category: "Web Development",
    description:
      "A full-stack learning management platform with role-based access for students, instructors and admins.",
    tech: ["MERN Stack", "JWT Auth"],
    outcome: "5,000+ active students",
  },
  {
    id: 6,
    title: "RetailFlow POS",
    client: "Retail Chain",
    category: "Web Development",
    description:
      "A point-of-sale and inventory management web app deployed across 12 store locations.",
    tech: ["React", "Express", "MongoDB"],
    outcome: "12 stores onboarded",
  },
];

function ProjectShowcase() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  const featured =
    activeFilter === "All" ? filtered.find((p) => p.featured) : null;
  const rest = featured ? filtered.filter((p) => !p.featured) : filtered;

  return (
    <section className="bg-brand-navy px-[7%] py-24">
      {/* Header */}
      <div className="mx-auto mb-14 max-w-2xl text-center">
        <p className="mb-3 font-body text-sm font-bold tracking-[3px] text-brand-teal">
          OUR WORK
        </p>
        <h2 className="mb-4 font-heading text-4xl font-bold text-white md:text-5xl">
          Selected Projects
        </h2>
        <p className="font-body text-base leading-relaxed text-white/70">
          A look at how we've partnered with clients across web, AI, cloud
          and security to ship real, working products.
        </p>
      </div>

      {/* Filters */}
      <div className="mx-auto mb-12 flex max-w-4xl flex-wrap items-center justify-center gap-3">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveFilter(cat)}
            className={`rounded-full border px-5 py-2 font-body text-sm font-semibold transition-all duration-300 ${
              activeFilter === cat
                ? "border-brand-teal bg-brand-teal text-white"
                : "border-white/15 bg-transparent text-white/70 hover:border-brand-teal/60 hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="mx-auto max-w-6xl">
        {/* Featured project spotlight — only shown on "All" */}
        {featured && (
          <div className="mb-8 grid overflow-hidden rounded-2xl border border-white/10 bg-[#0c2a32] md:grid-cols-2">
            <div className="relative flex min-h-[260px] items-center justify-center bg-gradient-to-br from-[#0f7c7a] to-[#061d24] p-10">
              <FaRobot className="text-[110px] text-white/15" />
              <span className="absolute left-6 top-6 rounded-full bg-white/10 px-3 py-1 font-body text-xs font-semibold tracking-wide text-white">
                Featured
              </span>
            </div>
            <div className="flex flex-col justify-center p-10">
              <p className="mb-2 font-body text-xs font-semibold uppercase tracking-wider text-brand-teal">
                {featured.category} · {featured.client}
              </p>
              <h3 className="mb-3 font-heading text-2xl font-bold text-white">
                {featured.title}
              </h3>
              <p className="mb-5 font-body text-sm leading-relaxed text-white/70">
                {featured.description}
              </p>
              <div className="mb-5 flex flex-wrap gap-2">
                {featured.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded-md bg-white/5 px-2.5 py-1 font-body text-xs text-white/60"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <p className="mb-6 font-body text-sm font-semibold text-brand-teal">
                {featured.outcome}
              </p>
              
            </div>
          </div>
        )}

        {/* Project grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((project) => {
            const Icon = categoryIcon[project.category] || FaCode;
            return (
              <div
                key={project.id}
                className="group flex flex-col rounded-xl border border-white/10 bg-[#0c2a32] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-teal/50"
              >
                <div className="mb-5 flex h-32 items-center justify-center rounded-lg bg-gradient-to-br from-[#123741] to-[#061d24]">
                  <Icon className="text-4xl text-brand-teal/70" />
                </div>
                <p className="mb-1 font-body text-xs font-semibold uppercase tracking-wider text-brand-teal">
                  {project.category}
                </p>
                <h3 className="mb-2 font-heading text-lg font-bold text-white">
                  {project.title}
                </h3>
                <p className="mb-4 font-body text-sm leading-relaxed text-white/65">
                  {project.description}
                </p>
                <div className="mb-4 flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-md bg-white/5 px-2 py-1 font-body text-[11px] text-white/55"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <p className="mt-auto font-body text-xs font-semibold text-white/70">
                  {project.outcome}
                </p>
              </div>
            );
          })}
        </div>

        {rest.length === 0 && !featured && (
          <p className="text-center font-body text-white/50">
            No projects in this category yet.
          </p>
        )}
      </div>
    </section>
  );
}

export default ProjectShowcase;
