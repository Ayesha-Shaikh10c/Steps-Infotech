import {
  FaBuilding,
  FaRocket,
  FaShieldHalved,
  FaChartLine,
  FaCloud,
  FaUsers,
  FaHeadset,
  FaCode,
} from "react-icons/fa6";

export const SOLUTIONS = [
  {
    slug: "enterprise-solutions",
    icon: FaBuilding,
    title: "Enterprise Solutions",
    desc: "End-to-end IT solutions to help enterprises streamline operations, improve efficiency and scale seamlessly.",
    fullDesc:
      "Our enterprise solutions are built to handle the complexity of large organizations — integrating legacy systems, automating workflows, and giving decision-makers real-time visibility across departments.",
    features: [
      "Custom ERP & workflow automation",
      "Legacy system integration",
      "24/7 dedicated support",
      "Enterprise-grade security & compliance",
    ],
  },
  {
    slug: "startup-solutions",
    icon: FaRocket,
    title: "Startup Solutions",
    desc: "Cost effective and scalable solutions to help startups build, grow and succeed faster.",
    fullDesc:
      "We help startups move fast without breaking things — MVPs, scalable architecture, and lean processes that grow with your team instead of slowing it down.",
    features: [
      "MVP development in weeks, not months",
      "Pay-as-you-grow pricing model",
      "Cloud-native, scalable architecture",
      "Ongoing technical mentorship",
    ],
  },
  {
    slug: "cyber-security-solutions",
    icon: FaShieldHalved,
    title: "Cyber Security Solutions",
    desc: "Protect your business from digital threats with our advanced security solutions and proactive monitoring.",
    fullDesc:
      "From vulnerability assessments to round-the-clock threat monitoring, we help you stay ahead of attackers instead of reacting after the damage is done.",
    features: [
      "Penetration testing & audits",
      "24/7 threat monitoring",
      "Incident response planning",
      "Compliance readiness (ISO, GDPR, etc.)",
    ],
  },
  {
    slug: "data-analytics",
    icon: FaChartLine,
    title: "Data & Analytics",
    desc: "Turn your data into actionable insights and make smarter business decisions.",
    fullDesc:
      "We turn scattered data into a single source of truth — dashboards, predictive models, and reporting pipelines that help you act instead of just observe.",
    features: [
      "Custom BI dashboards",
      "Predictive analytics & ML models",
      "Data pipeline automation",
      "Real-time reporting",
    ],
  },
  {
    slug: "cloud-solutions",
    icon: FaCloud,
    title: "Cloud Solutions",
    desc: "Leverage the power of cloud to reduce costs, increase agility and ensure business continuity.",
    fullDesc:
      "We design and manage cloud infrastructure that scales with demand, cuts unnecessary spend, and keeps your business running even when things go wrong.",
    features: [
      "Cloud migration & architecture",
      "Cost optimization",
      "Disaster recovery planning",
      "Multi-cloud & hybrid support",
    ],
  },
];

// Shown only after "More Solutions" is clicked
export const EXTRA_SOLUTIONS = [
  {
    slug: "hr-consulting",
    icon: FaUsers,
    title: "HR & Consulting",
    desc: "Strategic HR and IT consulting to align your people and technology with business goals.",
    fullDesc:
      "We bridge the gap between people and technology — helping you build processes, structure, and tooling that scale as your team grows.",
    features: [
      "IT strategy consulting",
      "HR tech implementation",
      "Process & workflow design",
      "Change management support",
    ],
  },
  {
    slug: "it-support",
    icon: FaHeadset,
    title: "IT Support & Maintenance",
    desc: "Reliable, round-the-clock IT support to keep your systems running smoothly.",
    fullDesc:
      "Downtime is expensive. Our support team keeps your systems monitored, patched, and running so your team can focus on the actual work.",
    features: [
      "24/7 helpdesk support",
      "Proactive system monitoring",
      "Regular maintenance & patching",
      "SLA-backed response times",
    ],
  },
  {
    slug: "custom-software",
    icon: FaCode,
    title: "Custom Software Development",
    desc: "Tailor-made software built around your exact business processes, not the other way around.",
    fullDesc:
      "Off-the-shelf software makes you adapt to it. We build software that adapts to you — matching your existing processes instead of forcing new ones.",
    features: [
      "Full-cycle custom development",
      "API & third-party integrations",
      "Dedicated project team",
      "Post-launch support & iteration",
    ],
  },
];