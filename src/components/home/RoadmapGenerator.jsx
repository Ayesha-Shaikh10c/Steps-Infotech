import React, { useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  Check,
  ChevronDown,
  ChevronUp,
  Download,
  Laptop,
  Brain,
  Target,
  User,
  ListChecks,
  ShieldCheck,
  Users,
  Award,
  Briefcase,
  Code2,
  Smartphone,
  Palette,
  Cloud,
  Database,
  BarChart3,
  Server,
  Lock,
  Rocket,
  BookOpen,
  Lightbulb,
  FileText,
} from "lucide-react";

import jsPDF from "jspdf";

/* =========================================================
   ROADMAP DATA
========================================================= */

const roadmapData = {
  "Web Development": {
    icon: Code2,
    description:
      "Build modern, responsive and production-ready websites using frontend and backend technologies.",

    Beginner: [
      {
        title: "HTML & CSS Fundamentals",
        overview:
          "Learn the building blocks of websites and understand how webpages are structured and styled.",
        learn: [
          "HTML document structure",
          "Semantic HTML",
          "CSS selectors",
          "Box model",
          "Typography and colors",
        ],
        practical:
          "Build a personal profile webpage using semantic HTML and modern CSS.",
        outcome:
          "You will be able to create properly structured and styled static webpages.",
      },
      {
        title: "JavaScript Basics",
        overview:
          "Understand JavaScript fundamentals and learn how to make webpages interactive.",
        learn: [
          "Variables",
          "Data types",
          "Functions",
          "Conditions",
          "Loops",
          "Arrays and objects",
        ],
        practical:
          "Create a small interactive calculator or to-do application.",
        outcome:
          "You will understand JavaScript fundamentals and basic browser interactions.",
      },
      {
        title: "Responsive Web Design",
        overview:
          "Learn how to make websites work properly on mobile, tablet and desktop screens.",
        learn: [
          "Media queries",
          "Flexbox",
          "CSS Grid",
          "Responsive units",
          "Mobile-first design",
        ],
        practical:
          "Convert a desktop webpage into a fully responsive website.",
        outcome:
          "You will be able to build responsive layouts for different screen sizes.",
      },
      {
        title: "Git & GitHub",
        overview:
          "Learn version control and how developers manage and collaborate on projects.",
        learn: [
          "Git basics",
          "Repositories",
          "Commits",
          "Branches",
          "Pull requests",
          "GitHub workflow",
        ],
        practical:
          "Create a GitHub repository and push your website project to it.",
        outcome:
          "You will understand basic professional version-control workflows.",
      },
      {
        title: "React Fundamentals",
        overview:
          "Learn the fundamentals of React and component-based frontend development.",
        learn: [
          "Components",
          "Props",
          "State",
          "Events",
          "Lists",
          "Conditional rendering",
        ],
        practical:
          "Build a small React dashboard or task-management application.",
        outcome:
          "You will be able to create reusable React components.",
      },
      {
        title: "API Integration",
        overview:
          "Learn how frontend applications communicate with backend services.",
        learn: [
          "REST APIs",
          "HTTP methods",
          "fetch",
          "JSON",
          "Loading states",
          "Error handling",
        ],
        practical:
          "Create a React application that fetches and displays API data.",
        outcome:
          "You will understand how real-world frontend applications consume APIs.",
      },
      {
        title: "Backend Fundamentals",
        overview:
          "Understand how servers process requests and provide data to applications.",
        learn: [
          "Client-server architecture",
          "Node.js basics",
          "Express",
          "Routes",
          "Middleware",
        ],
        practical:
          "Create a basic REST API using Node.js and Express.",
        outcome:
          "You will understand the basic structure of backend applications.",
      },
      {
        title: "Database Fundamentals",
        overview:
          "Learn how application data is stored, retrieved and managed.",
        learn: [
          "Tables",
          "Documents",
          "CRUD",
          "Relationships",
          "Queries",
        ],
        practical:
          "Create a small database for a student-management application.",
        outcome:
          "You will understand how applications store and retrieve persistent data.",
      },
      {
        title: "Authentication",
        overview:
          "Learn how applications identify users and protect private resources.",
        learn: [
          "Login systems",
          "Passwords",
          "Sessions",
          "JWT basics",
          "Protected routes",
        ],
        practical:
          "Build a simple login and registration system.",
        outcome:
          "You will understand the basic architecture of authentication systems.",
      },
      {
        title: "Build a Full-Stack Project",
        overview:
          "Combine everything you have learned into a complete real-world project.",
        learn: [
          "Frontend",
          "Backend",
          "Database",
          "Authentication",
          "Deployment",
        ],
        practical:
          "Build and deploy a complete full-stack application.",
        outcome:
          "You will have a portfolio-ready project demonstrating full-stack skills.",
      },
    ],

    Intermediate: [
      {
        title: "Advanced React",
        overview:
          "Improve React skills by learning advanced component and application patterns.",
        learn: [
          "Hooks",
          "Custom hooks",
          "Context",
          "Component architecture",
        ],
        practical: "Build a multi-page React dashboard.",
        outcome: "Create scalable React applications.",
      },
      {
        title: "Advanced JavaScript",
        overview:
          "Deepen your understanding of modern JavaScript.",
        learn: [
          "Closures",
          "Promises",
          "Async/Await",
          "Modules",
          "Event loop",
        ],
        practical: "Build an asynchronous API-driven application.",
        outcome: "Write cleaner and more reliable JavaScript.",
      },
      {
        title: "TypeScript",
        overview:
          "Add strong typing and improved developer tooling to JavaScript projects.",
        learn: [
          "Types",
          "Interfaces",
          "Generics",
          "Type narrowing",
        ],
        practical: "Convert a React project from JavaScript to TypeScript.",
        outcome: "Build safer and maintainable applications.",
      },
      {
        title: "State Management",
        overview:
          "Learn techniques for managing complex application state.",
        learn: [
          "Global state",
          "Context",
          "Redux concepts",
          "Async state",
        ],
        practical: "Build a shopping cart with centralized state.",
        outcome: "Manage application-wide data efficiently.",
      },
      {
        title: "Backend Architecture",
        overview:
          "Learn how to structure maintainable backend applications.",
        learn: [
          "Controllers",
          "Services",
          "Middleware",
          "Validation",
        ],
        practical: "Create a structured REST API.",
        outcome: "Design cleaner backend systems.",
      },
      {
        title: "Database Design",
        overview:
          "Learn efficient database modeling and query design.",
        learn: [
          "Indexes",
          "Relationships",
          "Normalization",
          "Query optimization",
        ],
        practical: "Design a database for an e-commerce application.",
        outcome: "Create efficient data models.",
      },
      {
        title: "Authentication & Authorization",
        overview:
          "Implement secure user access systems.",
        learn: [
          "JWT",
          "Roles",
          "Permissions",
          "Protected APIs",
        ],
        practical: "Build role-based authentication.",
        outcome: "Create secure application access control.",
      },
      {
        title: "Testing",
        overview:
          "Learn how to verify application functionality automatically.",
        learn: [
          "Unit testing",
          "Integration testing",
          "Component testing",
        ],
        practical: "Add tests to a React application.",
        outcome: "Improve application reliability.",
      },
      {
        title: "Performance Optimization",
        overview:
          "Learn how to improve frontend and backend performance.",
        learn: [
          "Lazy loading",
          "Caching",
          "Code splitting",
          "Optimization",
        ],
        practical: "Optimize a slow React application.",
        outcome: "Build faster applications.",
      },
      {
        title: "Production Deployment",
        overview:
          "Learn how applications are deployed and maintained in production.",
        learn: [
          "Environment variables",
          "Build process",
          "Hosting",
          "Monitoring",
        ],
        practical: "Deploy a full-stack application.",
        outcome: "Understand the production deployment lifecycle.",
      },
    ],

    Advanced: [
      {
        title: "Frontend Architecture",
        overview:
          "Design scalable frontend systems for large applications.",
        learn: [
          "Architecture patterns",
          "Reusable systems",
          "Design systems",
        ],
        practical: "Design a scalable enterprise dashboard.",
        outcome: "Create maintainable frontend architecture.",
      },
      {
        title: "Advanced React Patterns",
        overview:
          "Master advanced React application patterns.",
        learn: [
          "Compound components",
          "Render patterns",
          "Custom hooks",
        ],
        practical: "Create a reusable component library.",
        outcome: "Build advanced reusable interfaces.",
      },
      {
        title: "System Design",
        overview:
          "Understand how large-scale web systems are designed.",
        learn: [
          "Scalability",
          "Load balancing",
          "Caching",
          "Queues",
        ],
        practical: "Design a scalable web platform.",
        outcome: "Understand large-scale application architecture.",
      },
      {
        title: "Microservices",
        overview:
          "Learn how large systems can be divided into independent services.",
        learn: [
          "Service architecture",
          "API communication",
          "Service discovery",
        ],
        practical: "Design a small microservice system.",
        outcome: "Understand distributed application architecture.",
      },
      {
        title: "Advanced Database Systems",
        overview:
          "Improve database performance and reliability.",
        learn: [
          "Indexes",
          "Transactions",
          "Replication",
          "Optimization",
        ],
        practical: "Optimize a high-traffic database.",
        outcome: "Design efficient database systems.",
      },
      {
        title: "Cloud Deployment",
        overview:
          "Learn to deploy applications using modern cloud infrastructure.",
        learn: [
          "Cloud services",
          "Containers",
          "Networking",
          "Deployment",
        ],
        practical: "Deploy a containerized web application.",
        outcome: "Understand cloud-based deployment.",
      },
      {
        title: "Application Security",
        overview:
          "Learn how to identify and prevent common web vulnerabilities.",
        learn: [
          "Authentication security",
          "Input validation",
          "OWASP concepts",
          "Secure APIs",
        ],
        practical: "Perform a security review of a demo application.",
        outcome: "Build more secure web applications.",
      },
      {
        title: "Performance Engineering",
        overview:
          "Optimize applications for high traffic and demanding workloads.",
        learn: [
          "Caching",
          "CDN",
          "Profiling",
          "Load testing",
        ],
        practical: "Improve performance of a production-style application.",
        outcome: "Understand performance engineering.",
      },
      {
        title: "CI/CD",
        overview:
          "Automate testing and deployment workflows.",
        learn: [
          "Pipelines",
          "Automated testing",
          "Deployment automation",
        ],
        practical: "Create a CI/CD pipeline for your project.",
        outcome: "Automate software delivery.",
      },
      {
        title: "Production-Ready Full Stack System",
        overview:
          "Bring architecture, security, performance and deployment together.",
        learn: [
          "Architecture",
          "Security",
          "Scaling",
          "Monitoring",
          "Deployment",
        ],
        practical:
          "Build and deploy a production-style full-stack platform.",
        outcome:
          "Demonstrate advanced full-stack engineering skills.",
      },
    ],
  },

  "App Development": {
    icon: Smartphone,
    description:
      "Learn modern mobile application development and build production-ready Android and iOS applications.",

    Beginner: [
      {
        title: "Mobile Development Fundamentals",
        overview:
          "Understand how mobile applications work and how mobile development differs from web development.",
        learn: [
          "Mobile application architecture",
          "Android and iOS basics",
          "Development tools",
          "Application lifecycle",
        ],
        practical: "Create your first basic mobile application.",
        outcome: "Understand the mobile development environment.",
      },
      {
        title: "Programming Fundamentals",
        overview:
          "Build a strong programming foundation required for application development.",
        learn: [
          "Variables",
          "Conditions",
          "Loops",
          "Functions",
          "Collections",
        ],
        practical: "Create small programming exercises.",
        outcome: "Build confidence with programming fundamentals.",
      },
      {
        title: "UI Development",
        overview:
          "Learn how to create attractive and usable mobile interfaces.",
        learn: [
          "Layouts",
          "Components",
          "Typography",
          "Colors",
          "Navigation",
        ],
        practical: "Design a multi-screen mobile interface.",
        outcome: "Create clean mobile user interfaces.",
      },
      {
        title: "Navigation & Screens",
        overview:
          "Learn how users move between different parts of an application.",
        learn: [
          "Navigation",
          "Screens",
          "Routes",
          "Navigation state",
        ],
        practical: "Build a multi-screen application.",
        outcome: "Understand mobile navigation architecture.",
      },
      {
        title: "State Management",
        overview:
          "Learn how application data changes and updates the interface.",
        learn: [
          "Local state",
          "Global state",
          "State updates",
          "Data flow",
        ],
        practical: "Create a shopping cart application.",
        outcome: "Manage dynamic application state.",
      },
      {
        title: "API Integration",
        overview:
          "Connect mobile applications with external services.",
        learn: [
          "HTTP",
          "REST APIs",
          "JSON",
          "Async operations",
        ],
        practical: "Build an API-powered mobile application.",
        outcome: "Connect mobile apps with backend services.",
      },
      {
        title: "Local Storage",
        overview:
          "Learn how mobile applications store information locally.",
        learn: [
          "Preferences",
          "Local databases",
          "Offline data",
        ],
        practical: "Build an offline notes application.",
        outcome: "Store and retrieve local application data.",
      },
      {
        title: "Authentication",
        overview:
          "Implement secure user registration and login.",
        learn: [
          "Login",
          "Registration",
          "Tokens",
          "Protected screens",
        ],
        practical: "Build a login-based mobile application.",
        outcome: "Understand mobile authentication.",
      },
      {
        title: "App Testing",
        overview:
          "Learn how to test mobile applications before release.",
        learn: [
          "Functional testing",
          "UI testing",
          "Debugging",
        ],
        practical: "Test and debug your application.",
        outcome: "Improve mobile application quality.",
      },
      {
        title: "Publish Production Application",
        overview:
          "Learn how applications are prepared and published for users.",
        learn: [
          "Build configuration",
          "Release builds",
          "App signing",
          "Store submission",
        ],
        practical: "Prepare your application for production release.",
        outcome: "Understand the mobile application release process.",
      },
    ],

    Intermediate: [
      {
        title: "Advanced UI Architecture",
        overview: "Build scalable and reusable mobile interfaces.",
        learn: ["Reusable components", "Design systems", "UI architecture"],
        practical: "Create a reusable mobile UI system.",
        outcome: "Build maintainable interfaces.",
      },
      {
        title: "Advanced State Management",
        overview: "Manage complex application state.",
        learn: ["Global state", "Async state", "State architecture"],
        practical: "Build a complex state-driven application.",
        outcome: "Handle large application state.",
      },
      {
        title: "Advanced Networking",
        overview: "Build reliable network communication.",
        learn: ["Caching", "Retries", "Error handling", "API clients"],
        practical: "Create a robust API client.",
        outcome: "Build reliable network features.",
      },
      {
        title: "Database Architecture",
        overview: "Design efficient mobile data storage.",
        learn: ["Database models", "Queries", "Indexes"],
        practical: "Build a local database-backed application.",
        outcome: "Design efficient data storage.",
      },
      {
        title: "Push Notifications",
        overview: "Add real-time notifications to applications.",
        learn: ["Notification systems", "Tokens", "Deep links"],
        practical: "Implement notification functionality.",
        outcome: "Build notification-driven experiences.",
      },
      {
        title: "Offline-First Applications",
        overview: "Build apps that remain useful without internet connectivity.",
        learn: ["Local caching", "Synchronization", "Offline state"],
        practical: "Create an offline-first notes application.",
        outcome: "Build resilient mobile applications.",
      },
      {
        title: "App Performance",
        overview: "Optimize mobile applications for better performance.",
        learn: ["Rendering", "Memory", "Network optimization"],
        practical: "Profile and optimize an application.",
        outcome: "Create faster applications.",
      },
      {
        title: "Automated Testing",
        overview: "Automate application testing.",
        learn: ["Unit tests", "Integration tests", "UI tests"],
        practical: "Create automated tests for an application.",
        outcome: "Improve application reliability.",
      },
      {
        title: "Security Fundamentals",
        overview: "Protect mobile applications and user data.",
        learn: ["Secure storage", "Authentication", "API security"],
        practical: "Perform a security review of a demo app.",
        outcome: "Understand mobile application security.",
      },
      {
        title: "Production Deployment",
        overview: "Prepare applications for production environments.",
        learn: ["Release builds", "Signing", "Monitoring"],
        practical: "Create a production release.",
        outcome: "Understand the deployment process.",
      },
    ],

    Advanced: [
      {
        title: "Advanced Android Architecture",
        overview:
          "Design scalable Android applications using modern architectural patterns.",
        learn: [
          "Clean Architecture",
          "MVVM",
          "Dependency injection",
          "Modularization",
        ],
        practical: "Design a production-ready Android architecture.",
        outcome: "Build scalable Android applications.",
      },
      {
        title: "Clean Architecture",
        overview:
          "Separate application responsibilities into maintainable layers.",
        learn: [
          "Presentation layer",
          "Domain layer",
          "Data layer",
          "Dependency inversion",
        ],
        practical: "Refactor an application using Clean Architecture.",
        outcome: "Create maintainable application architecture.",
      },
      {
        title: "Jetpack Compose",
        overview:
          "Build modern Android interfaces using declarative UI development.",
        learn: [
          "Composable functions",
          "Layouts",
          "State",
          "Navigation",
        ],
        practical: "Create a complete Compose-based application.",
        outcome: "Build modern Android interfaces.",
      },
      {
        title: "Advanced State Management",
        overview:
          "Handle complex state and asynchronous application workflows.",
        learn: [
          "State holders",
          "Reactive state",
          "Async operations",
          "Architecture patterns",
        ],
        practical: "Build a complex state-driven application.",
        outcome: "Manage advanced application state.",
      },
      {
        title: "Performance Optimization",
        overview:
          "Optimize application rendering, memory usage and network operations.",
        learn: [
          "Profiling",
          "Memory optimization",
          "Rendering performance",
          "Network optimization",
        ],
        practical: "Profile and optimize a slow application.",
        outcome: "Build high-performance mobile applications.",
      },
      {
        title: "App Security",
        overview:
          "Protect mobile applications, APIs and sensitive user information.",
        learn: [
          "Secure storage",
          "Authentication",
          "Encryption concepts",
          "API security",
        ],
        practical: "Perform a security assessment of a demo application.",
        outcome: "Build safer mobile applications.",
      },
      {
        title: "Offline-First Applications",
        overview:
          "Create applications capable of working reliably with poor connectivity.",
        learn: [
          "Local data",
          "Synchronization",
          "Conflict handling",
          "Caching",
        ],
        practical: "Build an offline-first productivity application.",
        outcome: "Create resilient applications.",
      },
      {
        title: "Automated Testing",
        overview:
          "Create reliable automated tests for application functionality.",
        learn: [
          "Unit testing",
          "Integration testing",
          "UI testing",
          "Test automation",
        ],
        practical: "Build a complete automated testing suite.",
        outcome: "Improve application quality.",
      },
      {
        title: "CI/CD for Mobile",
        overview:
          "Automate application testing and release workflows.",
        learn: [
          "Build pipelines",
          "Automated testing",
          "Release automation",
          "Versioning",
        ],
        practical: "Create a CI/CD pipeline for your mobile project.",
        outcome: "Automate mobile application delivery.",
      },
      {
        title: "Publish Production Application",
        overview:
          "Prepare, sign and release a professional mobile application.",
        learn: [
          "Production builds",
          "App signing",
          "Store metadata",
          "Release management",
        ],
        practical: "Prepare your application for production publishing.",
        outcome: "Understand professional mobile app release.",
      },
    ],
  },

  "UI/UX Design": {
    icon: Palette,
    description:
      "Learn user research, interface design and modern UX principles to create intuitive digital products.",

    Beginner: [
      {
        title: "Design Fundamentals",
        overview: "Understand the basic principles of visual design.",
        learn: ["Color", "Typography", "Spacing", "Contrast"],
        practical: "Create a simple landing page design.",
        outcome: "Understand fundamental design principles.",
      },
      {
        title: "UX Fundamentals",
        overview: "Understand how users interact with digital products.",
        learn: ["User needs", "Usability", "User journeys"],
        practical: "Create a basic user journey.",
        outcome: "Understand UX thinking.",
      },
      {
        title: "Figma Fundamentals",
        overview: "Learn the essential tools used to create digital designs.",
        learn: ["Frames", "Components", "Auto layout", "Prototyping"],
        practical: "Design a mobile application screen.",
        outcome: "Create digital designs in Figma.",
      },
      {
        title: "Wireframing",
        overview: "Plan interfaces before creating visual designs.",
        learn: ["Low-fidelity wireframes", "Layouts", "Navigation"],
        practical: "Create wireframes for a website.",
        outcome: "Plan product interfaces effectively.",
      },
      {
        title: "User Research",
        overview: "Learn how to understand user needs.",
        learn: ["Interviews", "Surveys", "Personas"],
        practical: "Create personas for a sample product.",
        outcome: "Understand users before designing.",
      },
      {
        title: "Design Systems",
        overview: "Create consistent visual systems.",
        learn: ["Components", "Colors", "Typography", "Spacing"],
        practical: "Create a mini design system.",
        outcome: "Design consistent interfaces.",
      },
      {
        title: "Responsive Design",
        overview: "Design interfaces for different screen sizes.",
        learn: ["Desktop", "Tablet", "Mobile"],
        practical: "Create responsive designs.",
        outcome: "Understand responsive UI design.",
      },
      {
        title: "Prototyping",
        overview: "Create interactive prototypes.",
        learn: ["Interactions", "Transitions", "User flows"],
        practical: "Build a clickable app prototype.",
        outcome: "Demonstrate product interactions.",
      },
      {
        title: "Usability Testing",
        overview: "Test designs with users.",
        learn: ["Testing", "Feedback", "Iteration"],
        practical: "Conduct a usability test.",
        outcome: "Improve designs based on feedback.",
      },
      {
        title: "Portfolio Project",
        overview: "Combine your design skills into a complete case study.",
        learn: ["Research", "Design", "Prototype", "Case study"],
        practical: "Create a complete UX case study.",
        outcome: "Build a portfolio-ready project.",
      },
    ],

    Intermediate: [
      {
        title: "Advanced User Research",
        overview: "Conduct deeper user research.",
        learn: ["Research methods", "Analysis", "Insights"],
        practical: "Conduct structured user research.",
        outcome: "Make evidence-based design decisions.",
      },
      {
        title: "Information Architecture",
        overview: "Organize complex digital products.",
        learn: ["Navigation", "Content hierarchy", "Taxonomy"],
        practical: "Design information architecture for a platform.",
        outcome: "Structure complex interfaces.",
      },
      {
        title: "Advanced Prototyping",
        overview: "Create realistic product prototypes.",
        learn: ["Micro-interactions", "Animations", "Flows"],
        practical: "Build a high-fidelity prototype.",
        outcome: "Create realistic product experiences.",
      },
      {
        title: "Design Systems",
        overview: "Build scalable design systems.",
        learn: ["Tokens", "Components", "Variants"],
        practical: "Build a complete design system.",
        outcome: "Create scalable UI systems.",
      },
      {
        title: "Accessibility",
        overview: "Design interfaces usable by a wider audience.",
        learn: ["Contrast", "Keyboard navigation", "Inclusive design"],
        practical: "Audit an interface for accessibility.",
        outcome: "Create more accessible products.",
      },
      {
        title: "UX Writing",
        overview: "Create clear and useful product communication.",
        learn: ["Microcopy", "Error messages", "Onboarding"],
        practical: "Improve UX copy for an application.",
        outcome: "Create clearer product experiences.",
      },
      {
        title: "Product Thinking",
        overview: "Connect design decisions with business and user goals.",
        learn: ["Product goals", "Metrics", "User problems"],
        practical: "Create a product improvement proposal.",
        outcome: "Think like a product designer.",
      },
      {
        title: "Usability Research",
        overview: "Analyze user behavior and product usability.",
        learn: ["Testing", "Analysis", "Iteration"],
        practical: "Conduct a usability study.",
        outcome: "Improve products through research.",
      },
      {
        title: "Mobile UX",
        overview: "Design effective mobile experiences.",
        learn: ["Touch interaction", "Mobile patterns", "Navigation"],
        practical: "Design a complete mobile flow.",
        outcome: "Create mobile-first experiences.",
      },
      {
        title: "Professional Case Study",
        overview: "Present your design process professionally.",
        learn: ["Problem", "Research", "Solution", "Results"],
        practical: "Create a professional portfolio case study.",
        outcome: "Build a strong design portfolio.",
      },
    ],

    Advanced: [
      {
        title: "UX Strategy",
        overview: "Create design strategies aligned with product goals.",
        learn: ["Product strategy", "Research", "Metrics"],
        practical: "Create a UX strategy document.",
        outcome: "Think strategically about UX.",
      },
      {
        title: "Enterprise UX",
        overview: "Design complex enterprise applications.",
        learn: ["Complex workflows", "Roles", "Permissions"],
        practical: "Design an enterprise dashboard.",
        outcome: "Handle complex product experiences.",
      },
      {
        title: "Design System Architecture",
        overview: "Create scalable design systems.",
        learn: ["Tokens", "Components", "Governance"],
        practical: "Build a large design system.",
        outcome: "Manage scalable UI systems.",
      },
      {
        title: "Advanced Prototyping",
        overview: "Create highly realistic interactive prototypes.",
        learn: ["Motion", "Interactions", "Advanced flows"],
        practical: "Create a production-style prototype.",
        outcome: "Communicate complex product behavior.",
      },
      {
        title: "UX Analytics",
        overview: "Use product data to improve experiences.",
        learn: ["Metrics", "Funnels", "User behavior"],
        practical: "Analyze a product funnel.",
        outcome: "Make data-informed design decisions.",
      },
      {
        title: "Accessibility Strategy",
        overview: "Integrate accessibility into product design.",
        learn: ["Inclusive design", "Accessibility standards"],
        practical: "Create an accessibility audit.",
        outcome: "Design inclusive products.",
      },
      {
        title: "Design Leadership",
        overview: "Learn how design teams and projects are managed.",
        learn: ["Feedback", "Planning", "Design critique"],
        practical: "Lead a design review.",
        outcome: "Develop design leadership skills.",
      },
      {
        title: "Product Design",
        overview: "Combine UX, UI and product thinking.",
        learn: ["Product discovery", "Design", "Validation"],
        practical: "Design a complete digital product.",
        outcome: "Develop product-level design skills.",
      },
      {
        title: "Design Operations",
        overview: "Improve the processes used by design teams.",
        learn: ["Workflows", "Documentation", "Collaboration"],
        practical: "Create a design team workflow.",
        outcome: "Understand design operations.",
      },
      {
        title: "Professional Product Case Study",
        overview: "Create a complete professional product design case study.",
        learn: ["Research", "Strategy", "Design", "Testing", "Results"],
        practical: "Create a complete portfolio project.",
        outcome: "Demonstrate advanced product design skills.",
      },
    ],
  },

  "Cyber Security": {
    icon: ShieldCheck,
    description:
      "Build cybersecurity fundamentals and learn how to protect systems, networks and digital assets.",

    Beginner: [
      {
        title: "Computer Fundamentals",
        overview: "Understand the basic components of computers.",
        learn: ["CPU", "RAM", "Storage", "Processes"],
        practical: "Analyze your computer architecture.",
        outcome: "Understand computer fundamentals.",
      },
      {
        title: "Operating Systems",
        overview: "Learn how operating systems manage resources.",
        learn: ["Kernel", "Processes", "Memory", "File systems"],
        practical: "Explore processes and permissions on Linux.",
        outcome: "Understand OS security concepts.",
      },
      {
        title: "Linux Fundamentals",
        overview: "Build practical Linux skills.",
        learn: ["Commands", "Files", "Permissions", "Users"],
        practical: "Complete Linux command-line exercises.",
        outcome: "Become comfortable with Linux.",
      },
      {
        title: "Networking Fundamentals",
        overview: "Understand how computers communicate.",
        learn: ["OSI", "TCP/IP", "IP", "Ports", "Protocols"],
        practical: "Analyze network traffic in a lab.",
        outcome: "Understand networking foundations.",
      },
      {
        title: "Cybersecurity Fundamentals",
        overview: "Understand core security principles.",
        learn: ["CIA triad", "Threats", "Vulnerabilities", "Risk"],
        practical: "Create a basic threat model.",
        outcome: "Understand security concepts.",
      },
      {
        title: "Web Security",
        overview: "Learn common web application security concepts.",
        learn: ["Authentication", "Input validation", "OWASP concepts"],
        practical: "Practice against intentionally vulnerable labs.",
        outcome: "Understand common web vulnerabilities.",
      },
      {
        title: "Nmap Fundamentals",
        overview: "Learn network discovery and service enumeration in authorized labs.",
        learn: ["Hosts", "Ports", "Services", "Basic scanning"],
        practical: "Scan your own lab environment.",
        outcome: "Understand network enumeration.",
      },
      {
        title: "Burp Suite Fundamentals",
        overview: "Learn how web requests can be inspected in authorized environments.",
        learn: ["Proxy", "Requests", "Responses", "Repeater"],
        practical: "Analyze requests against a local lab.",
        outcome: "Understand web testing workflows.",
      },
      {
        title: "Security Labs",
        overview: "Apply concepts using intentionally vulnerable environments.",
        learn: ["Enumeration", "Analysis", "Documentation"],
        practical: "Complete beginner security labs.",
        outcome: "Gain practical security experience.",
      },
      {
        title: "Security Portfolio Project",
        overview: "Document your cybersecurity learning in a professional project.",
        learn: ["Recon", "Analysis", "Reporting", "Remediation"],
        practical: "Create a security assessment report for your own lab.",
        outcome: "Build a cybersecurity portfolio project.",
      },
    ],

    Intermediate: [
      {
        title: "Advanced Linux",
        overview: "Improve Linux administration and security skills.",
        learn: ["Services", "Logs", "Permissions", "Processes"],
        practical: "Harden a Linux lab machine.",
        outcome: "Manage Linux systems securely.",
      },
      {
        title: "Network Security",
        overview: "Understand how networks are protected.",
        learn: ["Firewalls", "Segmentation", "IDS", "VPN"],
        practical: "Design a secure lab network.",
        outcome: "Understand network defense.",
      },
      {
        title: "Web Application Security",
        overview: "Study common web application vulnerabilities.",
        learn: ["OWASP concepts", "Authentication", "Access control"],
        practical: "Practice on legal vulnerable labs.",
        outcome: "Develop web security testing skills.",
      },
      {
        title: "Enumeration",
        overview: "Learn systematic information gathering in authorized environments.",
        learn: ["Services", "Directories", "Technology identification"],
        practical: "Enumerate a local lab target.",
        outcome: "Improve assessment methodology.",
      },
      {
        title: "Privilege Management",
        overview: "Understand privilege and access control.",
        learn: ["Users", "Groups", "Permissions", "Sudo"],
        practical: "Audit permissions in a lab.",
        outcome: "Understand privilege boundaries.",
      },
      {
        title: "Active Directory Fundamentals",
        overview: "Understand enterprise identity environments.",
        learn: ["Domains", "Users", "Groups", "Policies"],
        practical: "Create an AD lab.",
        outcome: "Understand enterprise identity systems.",
      },
      {
        title: "Security Monitoring",
        overview: "Learn how suspicious activity can be detected.",
        learn: ["Logs", "Events", "Indicators", "Monitoring"],
        practical: "Analyze logs from a lab.",
        outcome: "Understand detection workflows.",
      },
      {
        title: "Vulnerability Assessment",
        overview: "Learn how vulnerabilities are identified and documented.",
        learn: ["Scanning", "Validation", "Risk rating"],
        practical: "Perform an authorized lab assessment.",
        outcome: "Create structured vulnerability reports.",
      },
      {
        title: "Security Automation",
        overview: "Use scripting to automate repetitive security tasks.",
        learn: ["Python", "Bash", "Automation"],
        practical: "Create a basic security automation script.",
        outcome: "Improve security workflow efficiency.",
      },
      {
        title: "Professional Security Report",
        overview: "Learn how to document technical findings professionally.",
        learn: ["Evidence", "Impact", "Risk", "Remediation"],
        practical: "Create a complete lab security report.",
        outcome: "Develop professional reporting skills.",
      },
    ],

    Advanced: [
      {
        title: "Advanced Network Security",
        overview: "Study enterprise network security architecture.",
        learn: ["Segmentation", "Firewalls", "Monitoring"],
        practical: "Design a secure enterprise lab.",
        outcome: "Understand advanced network defense.",
      },
      {
        title: "Advanced Web Security",
        overview: "Study complex web application security issues.",
        learn: ["Access control", "API security", "Business logic"],
        practical: "Assess intentionally vulnerable applications.",
        outcome: "Develop advanced web assessment skills.",
      },
      {
        title: "Active Directory Security",
        overview: "Understand enterprise identity security.",
        learn: ["Trusts", "Policies", "Delegation", "Security controls"],
        practical: "Build and audit an AD lab.",
        outcome: "Understand AD security architecture.",
      },
      {
        title: "Cloud Security",
        overview: "Learn security concepts for cloud environments.",
        learn: ["IAM", "Networks", "Storage", "Logging"],
        practical: "Design a secure cloud lab environment.",
        outcome: "Understand cloud security fundamentals.",
      },
      {
        title: "Threat Detection",
        overview: "Learn how attacks can be detected and investigated.",
        learn: ["Indicators", "Logs", "Detection rules"],
        practical: "Analyze simulated security events.",
        outcome: "Understand threat detection workflows.",
      },
      {
        title: "Incident Response",
        overview: "Learn how security incidents are investigated and handled.",
        learn: ["Containment", "Evidence", "Recovery"],
        practical: "Perform a simulated incident investigation.",
        outcome: "Understand incident response.",
      },
      {
        title: "Security Automation",
        overview: "Automate security analysis and repetitive tasks.",
        learn: ["Python", "APIs", "Automation"],
        practical: "Build a security automation tool.",
        outcome: "Automate security workflows.",
      },
      {
        title: "Security Architecture",
        overview: "Design security controls for complex systems.",
        learn: ["Defense in depth", "Zero trust", "Segmentation"],
        practical: "Design a secure application architecture.",
        outcome: "Understand security architecture.",
      },
      {
        title: "Security Assessment",
        overview: "Perform structured security assessments in authorized environments.",
        learn: ["Planning", "Testing", "Evidence", "Reporting"],
        practical: "Perform an end-to-end lab assessment.",
        outcome: "Develop professional assessment skills.",
      },
      {
        title: "Advanced Security Portfolio",
        overview: "Combine technical and reporting skills into a professional project.",
        learn: ["Assessment", "Evidence", "Risk", "Remediation"],
        practical: "Create a complete security assessment portfolio.",
        outcome: "Demonstrate advanced cybersecurity skills.",
      },
    ],
  },

  "Cloud Computing": {
    icon: Cloud,
    description:
      "Learn cloud infrastructure, deployment, security and scalable application architecture.",

    Beginner: [
      {
        title: "Cloud Fundamentals",
        overview: "Understand what cloud computing is and how it works.",
        learn: ["IaaS", "PaaS", "SaaS", "Cloud models"],
        practical: "Create a basic cloud account and explore services.",
        outcome: "Understand cloud computing concepts.",
      },
      {
        title: "Linux for Cloud",
        overview: "Learn Linux administration required for cloud environments.",
        learn: ["Commands", "Services", "Permissions"],
        practical: "Configure a Linux server.",
        outcome: "Manage basic cloud servers.",
      },
      {
        title: "Networking",
        overview: "Understand networking in cloud environments.",
        learn: ["IP", "Subnets", "DNS", "Ports"],
        practical: "Create a simple cloud network.",
        outcome: "Understand cloud networking.",
      },
      {
        title: "Virtual Machines",
        overview: "Learn how virtual machines are created and managed.",
        learn: ["Instances", "Images", "Storage"],
        practical: "Deploy a virtual machine.",
        outcome: "Manage basic cloud compute resources.",
      },
      {
        title: "Cloud Storage",
        overview: "Understand cloud-based data storage.",
        learn: ["Objects", "Buckets", "Permissions"],
        practical: "Create and secure cloud storage.",
        outcome: "Understand cloud storage.",
      },
      {
        title: "Databases",
        overview: "Learn managed database services.",
        learn: ["SQL", "NoSQL", "Managed databases"],
        practical: "Create a cloud database.",
        outcome: "Use managed cloud databases.",
      },
      {
        title: "IAM",
        overview: "Understand identity and access management.",
        learn: ["Users", "Roles", "Policies"],
        practical: "Create least-privilege access.",
        outcome: "Understand cloud identity security.",
      },
      {
        title: "Containers",
        overview: "Learn the basics of application containers.",
        learn: ["Images", "Containers", "Docker"],
        practical: "Containerize a small application.",
        outcome: "Understand container deployment.",
      },
      {
        title: "Cloud Monitoring",
        overview: "Learn how cloud resources are monitored.",
        learn: ["Metrics", "Logs", "Alerts"],
        practical: "Create basic monitoring alerts.",
        outcome: "Understand cloud monitoring.",
      },
      {
        title: "Deploy a Cloud Project",
        overview: "Combine your cloud skills into one project.",
        learn: ["Compute", "Networking", "Storage", "Deployment"],
        practical: "Deploy a complete web application.",
        outcome: "Build a cloud portfolio project.",
      },
    ],

    Intermediate: [
      {
        title: "Cloud Architecture",
        overview: "Design scalable cloud architectures.",
        learn: ["Architecture", "Availability", "Scalability"],
        practical: "Design a scalable cloud application.",
        outcome: "Understand cloud architecture.",
      },
      {
        title: "Advanced Networking",
        overview: "Learn advanced cloud networking.",
        learn: ["VPC", "Routing", "Security groups"],
        practical: "Build a segmented cloud network.",
        outcome: "Design secure cloud networks.",
      },
      {
        title: "Infrastructure as Code",
        overview: "Automate infrastructure provisioning.",
        learn: ["Terraform concepts", "Configuration", "State"],
        practical: "Provision cloud infrastructure using IaC.",
        outcome: "Automate infrastructure.",
      },
      {
        title: "Docker",
        overview: "Learn production container workflows.",
        learn: ["Images", "Volumes", "Networks"],
        practical: "Containerize a multi-service application.",
        outcome: "Build containerized applications.",
      },
      {
        title: "Kubernetes Fundamentals",
        overview: "Understand container orchestration.",
        learn: ["Pods", "Services", "Deployments"],
        practical: "Deploy an application to a local cluster.",
        outcome: "Understand Kubernetes.",
      },
      {
        title: "Cloud Security",
        overview: "Protect cloud resources and identities.",
        learn: ["IAM", "Encryption", "Security monitoring"],
        practical: "Perform a cloud security review.",
        outcome: "Understand cloud security.",
      },
      {
        title: "Serverless",
        overview: "Learn event-driven application architecture.",
        learn: ["Functions", "Events", "APIs"],
        practical: "Build a serverless API.",
        outcome: "Understand serverless applications.",
      },
      {
        title: "CI/CD",
        overview: "Automate cloud application delivery.",
        learn: ["Pipelines", "Testing", "Deployment"],
        practical: "Create a deployment pipeline.",
        outcome: "Automate cloud deployments.",
      },
      {
        title: "Monitoring",
        overview: "Monitor production cloud systems.",
        learn: ["Logs", "Metrics", "Alerts"],
        practical: "Create a monitoring dashboard.",
        outcome: "Operate cloud applications.",
      },
      {
        title: "Production Cloud Project",
        overview: "Build a complete cloud-based system.",
        learn: ["Architecture", "Security", "Deployment"],
        practical: "Deploy a production-style application.",
        outcome: "Create a cloud portfolio project.",
      },
    ],

    Advanced: [
      {
        title: "Advanced Cloud Architecture",
        overview: "Design enterprise-grade cloud systems.",
        learn: ["Scalability", "Reliability", "Architecture"],
        practical: "Design a highly available application.",
        outcome: "Understand advanced architecture.",
      },
      {
        title: "Multi-Region Systems",
        overview: "Design systems that operate across multiple regions.",
        learn: ["Replication", "Failover", "Latency"],
        practical: "Design a multi-region architecture.",
        outcome: "Understand global cloud systems.",
      },
      {
        title: "Kubernetes Architecture",
        overview: "Understand advanced Kubernetes concepts.",
        learn: ["Clusters", "Networking", "Scaling"],
        practical: "Design a Kubernetes architecture.",
        outcome: "Understand container orchestration.",
      },
      {
        title: "Cloud Security Architecture",
        overview: "Design security controls for cloud systems.",
        learn: ["IAM", "Network security", "Encryption"],
        practical: "Design a secure cloud environment.",
        outcome: "Build secure cloud architectures.",
      },
      {
        title: "Infrastructure Automation",
        overview: "Automate infrastructure at scale.",
        learn: ["IaC", "Modules", "Automation"],
        practical: "Automate a complete environment.",
        outcome: "Manage infrastructure programmatically.",
      },
      {
        title: "Serverless Architecture",
        overview: "Design scalable event-driven systems.",
        learn: ["Events", "Functions", "Queues"],
        practical: "Design a serverless platform.",
        outcome: "Understand event-driven architecture.",
      },
      {
        title: "Cloud Observability",
        overview: "Monitor and analyze complex cloud systems.",
        learn: ["Logs", "Metrics", "Tracing"],
        practical: "Build an observability dashboard.",
        outcome: "Understand production observability.",
      },
      {
        title: "Cloud Cost Optimization",
        overview: "Optimize cloud infrastructure and resource usage.",
        learn: ["Resource management", "Scaling", "Cost analysis"],
        practical: "Optimize a sample cloud environment.",
        outcome: "Understand cloud cost management.",
      },
      {
        title: "Disaster Recovery",
        overview: "Design systems capable of recovering from failures.",
        learn: ["Backups", "Failover", "Recovery"],
        practical: "Create a disaster recovery plan.",
        outcome: "Understand resilience planning.",
      },
      {
        title: "Enterprise Cloud Project",
        overview: "Combine advanced cloud concepts into one system.",
        learn: ["Architecture", "Security", "Automation", "Monitoring"],
        practical: "Design a complete enterprise cloud platform.",
        outcome: "Demonstrate advanced cloud skills.",
      },
    ],
  },

  "Data Science": {
    icon: BarChart3,
    description:
      "Learn data analysis, statistics, machine learning and data-driven decision making.",

    Beginner: [
      {
        title: "Python Fundamentals",
        overview: "Learn Python programming for data work.",
        learn: ["Variables", "Functions", "Loops", "Collections"],
        practical: "Solve beginner Python exercises.",
        outcome: "Build Python programming fundamentals.",
      },
      {
        title: "NumPy",
        overview: "Learn numerical computing with Python.",
        learn: ["Arrays", "Operations", "Indexing"],
        practical: "Perform numerical analysis using NumPy.",
        outcome: "Work with numerical datasets.",
      },
      {
        title: "Pandas",
        overview: "Learn how to manipulate and analyze data.",
        learn: ["DataFrames", "Filtering", "Grouping", "Cleaning"],
        practical: "Analyze a real dataset.",
        outcome: "Perform basic data analysis.",
      },
      {
        title: "Data Visualization",
        overview: "Learn how to communicate insights visually.",
        learn: ["Charts", "Plots", "Dashboards"],
        practical: "Create a data visualization report.",
        outcome: "Communicate data insights.",
      },
      {
        title: "Statistics",
        overview: "Understand statistical concepts used in data science.",
        learn: ["Mean", "Median", "Probability", "Distribution"],
        practical: "Analyze a dataset statistically.",
        outcome: "Understand basic statistics.",
      },
      {
        title: "SQL",
        overview: "Learn how to retrieve and analyze structured data.",
        learn: ["SELECT", "JOIN", "GROUP BY", "Filtering"],
        practical: "Analyze a sample database.",
        outcome: "Query databases confidently.",
      },
      {
        title: "Data Cleaning",
        overview: "Learn how to prepare raw data for analysis.",
        learn: ["Missing data", "Duplicates", "Formatting"],
        practical: "Clean a messy dataset.",
        outcome: "Prepare datasets for analysis.",
      },
      {
        title: "Exploratory Data Analysis",
        overview: "Discover patterns and relationships in data.",
        learn: ["EDA", "Correlations", "Patterns"],
        practical: "Perform EDA on a dataset.",
        outcome: "Extract meaningful insights.",
      },
      {
        title: "Machine Learning Basics",
        overview: "Understand fundamental machine learning concepts.",
        learn: ["Features", "Labels", "Training", "Testing"],
        practical: "Build a simple ML model.",
        outcome: "Understand ML fundamentals.",
      },
      {
        title: "Data Science Project",
        overview: "Combine your skills into a complete project.",
        learn: ["Data collection", "Cleaning", "Analysis", "Visualization"],
        practical: "Create an end-to-end data project.",
        outcome: "Build a portfolio-ready project.",
      },
    ],

    Intermediate: [
      {
        title: "Advanced Python",
        overview: "Improve Python skills for data science.",
        learn: ["Functions", "Modules", "OOP", "Libraries"],
        practical: "Create a reusable data analysis package.",
        outcome: "Write maintainable Python code.",
      },
      {
        title: "Advanced Statistics",
        overview: "Develop stronger statistical reasoning.",
        learn: ["Hypothesis testing", "Confidence intervals"],
        practical: "Perform statistical analysis.",
        outcome: "Make data-driven conclusions.",
      },
      {
        title: "Advanced SQL",
        overview: "Write complex analytical queries.",
        learn: ["CTEs", "Window functions", "Subqueries"],
        practical: "Analyze a large relational dataset.",
        outcome: "Perform advanced data analysis.",
      },
      {
        title: "Feature Engineering",
        overview: "Prepare better inputs for machine learning.",
        learn: ["Transformations", "Encoding", "Scaling"],
        practical: "Engineer features for an ML dataset.",
        outcome: "Prepare stronger ML datasets.",
      },
      {
        title: "Supervised Learning",
        overview: "Learn models that predict known outcomes.",
        learn: ["Regression", "Classification", "Evaluation"],
        practical: "Build a prediction model.",
        outcome: "Build supervised ML models.",
      },
      {
        title: "Unsupervised Learning",
        overview: "Discover hidden patterns in data.",
        learn: ["Clustering", "Dimensionality reduction"],
        practical: "Cluster a real dataset.",
        outcome: "Discover patterns without labels.",
      },
      {
        title: "Model Evaluation",
        overview: "Learn how to evaluate machine learning systems.",
        learn: ["Metrics", "Validation", "Overfitting"],
        practical: "Compare multiple models.",
        outcome: "Evaluate models properly.",
      },
      {
        title: "Data Pipelines",
        overview: "Understand how data moves through systems.",
        learn: ["ETL", "Data processing", "Automation"],
        practical: "Build a simple data pipeline.",
        outcome: "Understand data workflows.",
      },
      {
        title: "Machine Learning Project",
        overview: "Build a complete ML solution.",
        learn: ["Data", "Features", "Model", "Evaluation"],
        practical: "Build an end-to-end ML project.",
        outcome: "Create a portfolio-ready ML system.",
      },
      {
        title: "Professional Data Portfolio",
        overview: "Present data projects professionally.",
        learn: ["Documentation", "Visualization", "Insights"],
        practical: "Create a complete portfolio project.",
        outcome: "Demonstrate practical data skills.",
      },
    ],

    Advanced: [
      {
        title: "Advanced Machine Learning",
        overview: "Study advanced machine learning techniques.",
        learn: ["Ensemble models", "Optimization", "Validation"],
        practical: "Build an advanced prediction system.",
        outcome: "Develop advanced ML skills.",
      },
      {
        title: "Deep Learning",
        overview: "Understand neural networks and deep learning.",
        learn: ["Neurons", "Layers", "Training", "Optimization"],
        practical: "Build a neural network project.",
        outcome: "Understand deep learning.",
      },
      {
        title: "Natural Language Processing",
        overview: "Work with text and language data.",
        learn: ["Text processing", "Embeddings", "Classification"],
        practical: "Build a text classification system.",
        outcome: "Work with NLP applications.",
      },
      {
        title: "Computer Vision",
        overview: "Analyze and understand images using ML.",
        learn: ["Images", "Features", "Classification"],
        practical: "Build an image classification project.",
        outcome: "Understand computer vision.",
      },
      {
        title: "MLOps",
        overview: "Learn how machine learning systems are deployed and maintained.",
        learn: ["Deployment", "Monitoring", "Pipelines"],
        practical: "Deploy a machine learning model.",
        outcome: "Understand production ML workflows.",
      },
      {
        title: "Model Optimization",
        overview: "Improve model performance and efficiency.",
        learn: ["Optimization", "Tuning", "Evaluation"],
        practical: "Optimize a machine learning model.",
        outcome: "Build efficient ML systems.",
      },
      {
        title: "Data Engineering",
        overview: "Understand large-scale data processing.",
        learn: ["Pipelines", "Storage", "Processing"],
        practical: "Build a scalable data pipeline.",
        outcome: "Understand data engineering.",
      },
      {
        title: "Responsible AI",
        overview: "Understand responsible and reliable AI development.",
        learn: ["Bias", "Fairness", "Transparency"],
        practical: "Analyze a model for potential bias.",
        outcome: "Build more responsible AI systems.",
      },
      {
        title: "Production ML",
        overview: "Build machine learning systems for real-world use.",
        learn: ["Serving", "Monitoring", "Scaling"],
        practical: "Deploy a production-style ML model.",
        outcome: "Understand production ML.",
      },
      {
        title: "Advanced Data Science Project",
        overview: "Combine advanced data science skills.",
        learn: ["Data", "ML", "Deployment", "Monitoring"],
        practical: "Build a complete production-style ML system.",
        outcome: "Demonstrate advanced data science skills.",
      },
    ],
  },

  "AI / Machine Learning": {
    icon: Brain,
    description:
      "Learn artificial intelligence, machine learning, model development and intelligent application design.",

    Beginner: [
      {
        title: "Python for AI",
        overview: "Learn Python programming required for AI development.",
        learn: ["Python", "Functions", "Collections", "OOP"],
        practical: "Build Python mini projects.",
        outcome: "Develop programming foundations for AI.",
      },
      {
        title: "Mathematics for AI",
        overview: "Understand the mathematical concepts behind AI.",
        learn: ["Algebra", "Statistics", "Probability"],
        practical: "Solve basic AI mathematics exercises.",
        outcome: "Understand AI mathematical foundations.",
      },
      {
        title: "Data Handling",
        overview: "Learn how AI systems work with data.",
        learn: ["Cleaning", "Transformation", "Visualization"],
        practical: "Prepare a dataset for ML.",
        outcome: "Prepare data for AI systems.",
      },
      {
        title: "Machine Learning Fundamentals",
        overview: "Understand how machine learning models learn patterns.",
        learn: ["Features", "Labels", "Training", "Testing"],
        practical: "Build a simple ML model.",
        outcome: "Understand machine learning.",
      },
      {
        title: "Regression",
        overview: "Learn models used for numerical prediction.",
        learn: ["Linear regression", "Metrics", "Prediction"],
        practical: "Build a prediction model.",
        outcome: "Understand regression.",
      },
      {
        title: "Classification",
        overview: "Learn how models categorize data.",
        learn: ["Classification", "Labels", "Evaluation"],
        practical: "Build a classification model.",
        outcome: "Understand classification.",
      },
      {
        title: "Neural Networks",
        overview: "Understand the basics of neural networks.",
        learn: ["Neurons", "Layers", "Activation"],
        practical: "Build a basic neural network.",
        outcome: "Understand neural networks.",
      },
      {
        title: "Model Evaluation",
        overview: "Learn how AI models are evaluated.",
        learn: ["Accuracy", "Precision", "Recall", "Validation"],
        practical: "Evaluate multiple models.",
        outcome: "Compare AI models correctly.",
      },
      {
        title: "AI Application Development",
        overview: "Use AI models inside applications.",
        learn: ["APIs", "Model inference", "Application integration"],
        practical: "Build an AI-powered application.",
        outcome: "Integrate AI into applications.",
      },
      {
        title: "AI Portfolio Project",
        overview: "Build a complete AI project.",
        learn: ["Data", "Model", "Application", "Documentation"],
        practical: "Create an end-to-end AI application.",
        outcome: "Build a portfolio-ready AI project.",
      },
    ],

    Intermediate: [
      {
        title: "Advanced Machine Learning",
        overview: "Study more powerful machine learning techniques.",
        learn: ["Ensemble methods", "Optimization", "Validation"],
        practical: "Build an advanced ML model.",
        outcome: "Improve ML performance.",
      },
      {
        title: "Feature Engineering",
        overview: "Create better features for machine learning.",
        learn: ["Transformation", "Encoding", "Selection"],
        practical: "Engineer features for a dataset.",
        outcome: "Improve model inputs.",
      },
      {
        title: "Model Tuning",
        overview: "Improve model performance through tuning.",
        learn: ["Hyperparameters", "Validation", "Optimization"],
        practical: "Tune a machine learning model.",
        outcome: "Build optimized models.",
      },
      {
        title: "Deep Learning Fundamentals",
        overview: "Learn modern neural network concepts.",
        learn: ["Deep networks", "Training", "Optimization"],
        practical: "Build a neural network.",
        outcome: "Understand deep learning.",
      },
      {
        title: "Computer Vision",
        overview: "Build applications that understand images.",
        learn: ["Image processing", "Classification"],
        practical: "Build an image classifier.",
        outcome: "Understand computer vision.",
      },
      {
        title: "NLP Fundamentals",
        overview: "Build systems that process text.",
        learn: ["Text processing", "Embeddings", "Classification"],
        practical: "Build a text classification system.",
        outcome: "Understand NLP.",
      },
      {
        title: "Model Deployment",
        overview: "Deploy machine learning models into applications.",
        learn: ["APIs", "Serving", "Monitoring"],
        practical: "Deploy a trained model.",
        outcome: "Understand model deployment.",
      },
      {
        title: "MLOps Fundamentals",
        overview: "Understand production ML workflows.",
        learn: ["Pipelines", "Versioning", "Monitoring"],
        practical: "Create a basic ML pipeline.",
        outcome: "Understand MLOps.",
      },
      {
        title: "AI Application",
        overview: "Build an AI-powered product.",
        learn: ["Models", "Backend", "Frontend", "Deployment"],
        practical: "Build an AI application.",
        outcome: "Create an AI product.",
      },
      {
        title: "AI Portfolio",
        overview: "Document and present your AI projects.",
        learn: ["Documentation", "Results", "Architecture"],
        practical: "Create an AI case study.",
        outcome: "Build an AI portfolio.",
      },
    ],

    Advanced: [
      {
        title: "Advanced Deep Learning",
        overview: "Study advanced neural network architectures.",
        learn: ["Architectures", "Optimization", "Training"],
        practical: "Build an advanced deep learning model.",
        outcome: "Develop advanced AI skills.",
      },
      {
        title: "Transformers",
        overview: "Understand modern transformer-based AI systems.",
        learn: ["Attention", "Embeddings", "Transformer architecture"],
        practical: "Build a small transformer-based experiment.",
        outcome: "Understand modern AI architectures.",
      },
      {
        title: "Large Language Models",
        overview: "Understand the architecture and application of language models.",
        learn: ["Tokens", "Embeddings", "Inference", "Fine-tuning concepts"],
        practical: "Build an application using a language model API.",
        outcome: "Understand LLM applications.",
      },
      {
        title: "RAG Systems",
        overview: "Learn how AI applications can use external knowledge.",
        learn: ["Retrieval", "Embeddings", "Vector search"],
        practical: "Build a document-based AI assistant.",
        outcome: "Understand retrieval-augmented generation.",
      },
      {
        title: "AI Agents",
        overview: "Understand systems that use AI models with tools and workflows.",
        learn: ["Tools", "Planning", "Workflows", "Memory concepts"],
        practical: "Build a controlled AI workflow.",
        outcome: "Understand agentic AI systems.",
      },
      {
        title: "Model Evaluation",
        overview: "Evaluate AI systems systematically.",
        learn: ["Benchmarks", "Quality", "Safety", "Evaluation"],
        practical: "Create an AI evaluation framework.",
        outcome: "Measure AI system quality.",
      },
      {
        title: "AI Security",
        overview: "Understand security concerns in AI applications.",
        learn: ["Input validation", "Data protection", "Access control"],
        practical: "Perform a security review of a demo AI application.",
        outcome: "Build safer AI applications.",
      },
      {
        title: "MLOps",
        overview: "Deploy and maintain machine learning systems.",
        learn: ["Pipelines", "Monitoring", "Model versioning"],
        practical: "Create an ML deployment workflow.",
        outcome: "Operate ML systems.",
      },
      {
        title: "Production AI",
        overview: "Design AI systems for real-world applications.",
        learn: ["Scaling", "Monitoring", "Cost", "Reliability"],
        practical: "Design a production AI architecture.",
        outcome: "Understand production AI engineering.",
      },
      {
        title: "Advanced AI Project",
        overview: "Combine modern AI techniques into a complete system.",
        learn: ["AI architecture", "Models", "RAG", "Deployment"],
        practical: "Build a production-style AI application.",
        outcome: "Demonstrate advanced AI engineering skills.",
      },
    ],
  },
};

/* =========================================================
   HELPERS
========================================================= */

const defaultDomains = [
  "Web Development",
  "App Development",
  "UI/UX Design",
  "Cyber Security",
  "Cloud Computing",
  "Data Science",
  "AI / Machine Learning",
];

const levels = ["Beginner", "Intermediate", "Advanced"];

/* =========================================================
   COMPONENT
========================================================= */

export default function RoadmapGenerator() {
  const [selectedGoal, setSelectedGoal] = useState("Web Development");
  const [selectedLevel, setSelectedLevel] = useState("Beginner");

  const [roadmap, setRoadmap] = useState([]);
  const [generated, setGenerated] = useState(false);

  const [openMilestones, setOpenMilestones] = useState([]);

  /* -------------------------------------------------------
     Generate Roadmap
  ------------------------------------------------------- */

  const generateRoadmap = () => {
    const selectedRoadmap =
      roadmapData[selectedGoal]?.[selectedLevel] || [];

    setRoadmap(selectedRoadmap);
    setGenerated(true);
    setOpenMilestones([]);
  };

  /* -------------------------------------------------------
     Toggle milestone details
  ------------------------------------------------------- */

  const toggleMilestone = (index) => {
    setOpenMilestones((prev) => {
      if (prev.includes(index)) {
        return prev.filter((item) => item !== index);
      }

      return [...prev, index];
    });
  };

  /* -------------------------------------------------------
     Download PDF
  ------------------------------------------------------- */

  const downloadPDF = () => {
    if (!roadmap.length) return;

    const doc = new jsPDF();

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    let y = 20;

    const addWrappedText = (
      text,
      x,
      startY,
      maxWidth,
      fontSize = 11,
      lineHeight = 6
    ) => {
      doc.setFontSize(fontSize);

      const lines = doc.splitTextToSize(text, maxWidth);

      lines.forEach((line) => {
        if (startY > pageHeight - 20) {
          doc.addPage();
          startY = 20;
        }

        doc.text(line, x, startY);
        startY += lineHeight;
      });

      return startY;
    };

    /* Header */

    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text("YOUR AI GENERATED ROADMAP", 20, y);

    y += 12;

    doc.setFontSize(20);
    doc.text(selectedGoal, 20, y);

    y += 9;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text(`Level: ${selectedLevel}`, 20, y);

    y += 15;

    /* Intro */

    y = addWrappedText(
      roadmapData[selectedGoal]?.description ||
        "Personalized learning roadmap.",
      20,
      y,
      pageWidth - 40,
      11,
      6
    );

    y += 8;

    /* 10 Milestones */

    roadmap.forEach((item, index) => {
      if (y > pageHeight - 45) {
        doc.addPage();
        y = 20;
      }

      doc.setFont("helvetica", "bold");
      doc.setFontSize(15);

      y = addWrappedText(
        `${index + 1}. ${item.title}`,
        20,
        y,
        pageWidth - 40,
        15,
        7
      );

      y += 2;

      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.text("Overview", 20, y);

      y += 6;

      doc.setFont("helvetica", "normal");

      y = addWrappedText(
        item.overview,
        20,
        y,
        pageWidth - 40,
        10,
        5
      );

      y += 4;

      doc.setFont("helvetica", "bold");
      doc.text("What you will learn", 20, y);

      y += 6;

      doc.setFont("helvetica", "normal");

      item.learn.forEach((point) => {
        y = addWrappedText(
          `• ${point}`,
          24,
          y,
          pageWidth - 44,
          10,
          5
        );
      });

      y += 3;

      doc.setFont("helvetica", "bold");
      doc.text("Practical Task", 20, y);

      y += 6;

      doc.setFont("helvetica", "normal");

      y = addWrappedText(
        item.practical,
        20,
        y,
        pageWidth - 40,
        10,
        5
      );

      y += 3;

      doc.setFont("helvetica", "bold");
      doc.text("Expected Outcome", 20, y);

      y += 6;

      doc.setFont("helvetica", "normal");

      y = addWrappedText(
        item.outcome,
        20,
        y,
        pageWidth - 40,
        10,
        5
      );

      y += 10;
    });

    /* Footer */

    doc.setFontSize(9);
    doc.setFont("helvetica", "italic");

    doc.text(
      "Generated by Steps Infotech AI Roadmap Generator",
      20,
      pageHeight - 10
    );

    const safeGoal = selectedGoal.replace(/[^a-zA-Z0-9]/g, "-");

    doc.save(`${safeGoal}-${selectedLevel}-Roadmap.pdf`);
  };

  /* =======================================================
     UI
  ======================================================= */

  return (
    <section className="min-h-screen bg-[#003f46] px-4 py-8 md:px-8">
      <div className="mx-auto max-w-7xl">

        {/* =================================================
            MAIN GENERATOR
        ================================================= */}

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

          {/* LEFT SIDE */}

          <div className="rounded-3xl border border-cyan-400/30 bg-[#004c54] p-6 shadow-2xl md:p-8">

            {/* Badge */}

            <div className="mb-6 inline-flex items-center gap-2 rounded-xl border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm font-bold text-cyan-300">
              <Rocket className="h-5 w-5" />
              New & Powered by AI
            </div>

            {/* Heading */}

            <h1 className="text-3xl font-extrabold leading-tight md:text-5xl">
              <span className="text-cyan-400">
                AI Roadmap
              </span>{" "}
              <span className="text-white">
                Generator
              </span>
            </h1>

            <p className="mt-4 max-w-xl text-base leading-7 text-white/85 md:text-lg">
              Unlock your potential with a personalized
              learning roadmap generated according to your
              career goal and current skill level.
            </p>

            {/* Steps */}

            <div className="mt-8 space-y-5">

              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cyan-400 text-black">
                  <Check className="h-5 w-5" />
                </div>

                <p className="font-semibold text-white">
                  Choose your career goal
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cyan-400 text-black">
                  <Check className="h-5 w-5" />
                </div>

                <p className="font-semibold text-white">
                  Tell us your current level
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cyan-400 text-black">
                  <Check className="h-5 w-5" />
                </div>

                <p className="font-semibold text-white">
                  Get a detailed 10-step learning plan
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cyan-400 text-black">
                  <Check className="h-5 w-5" />
                </div>

                <p className="font-semibold text-white">
                  Download your complete roadmap PDF
                </p>
              </div>

            </div>

            {/* Branding */}

            <div className="mt-10 flex items-center gap-4">

              <div className="flex h-24 w-24 items-center justify-center rounded-full border border-cyan-400/50 bg-[#003f46]">
                <Brain className="h-12 w-12 text-cyan-300" />
              </div>

              <div>
                <p className="text-lg font-semibold text-white">
                  All with
                </p>

                <p className="text-2xl font-extrabold tracking-wide text-white">
                  STEPS
                </p>

                <p className="text-sm tracking-[0.3em] text-cyan-300">
                  INFOTECH
                </p>
              </div>

            </div>

          </div>

          {/* RIGHT FORM */}

          <div className="rounded-3xl border-2 border-white/20 bg-[#0b7780] p-6 shadow-2xl md:p-8">

            <div className="mb-7 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white">
                <Target className="h-6 w-6 text-[#00616a]" />
              </div>

              <div>
                <h2 className="text-2xl font-extrabold text-white">
                  Create Your Roadmap
                </h2>

                <p className="text-sm text-white/80">
                  Select your goal and current level
                </p>
              </div>
            </div>

            {/* GOAL */}

            <label className="mb-3 block text-lg font-bold text-black">
              Select your Goal
            </label>

            <div className="relative mb-7">

              <Laptop className="pointer-events-none absolute left-4 top-1/2 h-6 w-6 -translate-y-1/2 text-black" />

              <select
                value={selectedGoal}
                onChange={(e) =>
                  setSelectedGoal(e.target.value)
                }
                className="w-full appearance-none rounded-xl bg-white py-4 pl-14 pr-12 text-base font-semibold text-black outline-none focus:ring-4 focus:ring-cyan-300/40"
              >
                {defaultDomains.map((domain) => (
                  <option key={domain} value={domain}>
                    {domain}
                  </option>
                ))}
              </select>

              <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-black" />

            </div>

            {/* LEVEL */}

            <label className="mb-3 block text-lg font-bold text-black">
              Your current level
            </label>

            <div className="relative mb-8">

              <BarChart3 className="pointer-events-none absolute left-4 top-1/2 h-6 w-6 -translate-y-1/2 text-black" />

              <select
                value={selectedLevel}
                onChange={(e) =>
                  setSelectedLevel(e.target.value)
                }
                className="w-full appearance-none rounded-xl bg-white py-4 pl-14 pr-12 text-base font-semibold text-black outline-none focus:ring-4 focus:ring-cyan-300/40"
              >
                {levels.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>

              <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-black" />

            </div>

            {/* GENERATE BUTTON */}

            <button
              onClick={generateRoadmap}
              className="flex w-full items-center justify-center gap-3 rounded-xl bg-[#20ef4b] px-5 py-4 text-lg font-extrabold text-black shadow-lg transition duration-300 hover:-translate-y-1 hover:bg-[#18db42] hover:shadow-xl"
            >
              <Rocket className="h-6 w-6" />
              Generate Roadmap
            </button>

            {/* Extra information */}

            <div className="mt-8 grid grid-cols-2 gap-4">

              <div className="rounded-xl border border-white/20 bg-black/10 p-4 text-center">
                <BookOpen className="mx-auto mb-2 h-7 w-7 text-cyan-200" />
                <p className="text-sm font-bold text-white">
                  10 Milestones
                </p>
                <p className="mt-1 text-xs text-white/70">
                  Detailed learning path
                </p>
              </div>

              <div className="rounded-xl border border-white/20 bg-black/10 p-4 text-center">
                <Award className="mx-auto mb-2 h-7 w-7 text-cyan-200" />
                <p className="text-sm font-bold text-white">
                  PDF Ready
                </p>
                <p className="mt-1 text-xs text-white/70">
                  Download anytime
                </p>
              </div>

            </div>

          </div>

        </div>

        {/* =================================================
            GENERATED ROADMAP
        ================================================= */}

        {generated && roadmap.length > 0 && (

          <div className="mt-8 rounded-3xl border border-cyan-400/30 bg-[#003f46] p-5 shadow-2xl md:p-8">

            {/* Header */}

            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

              <div>
                <p className="text-sm font-bold uppercase tracking-widest text-cyan-400">
                  Your AI Generated Roadmap
                </p>

                <h2 className="mt-2 text-3xl font-extrabold text-white md:text-4xl">
                  {selectedGoal}
                </h2>

                <p className="mt-1 text-lg text-white/80">
                  Level: {selectedLevel}
                </p>
              </div>

              {/* PDF BUTTON */}

              <button
                onClick={downloadPDF}
                className="flex items-center justify-center gap-3 rounded-xl bg-cyan-400 px-5 py-4 text-base font-extrabold text-black transition hover:bg-cyan-300"
              >
                <Download className="h-5 w-5" />
                Download PDF
              </button>

            </div>

            {/* Description */}

            <p className="mt-5 max-w-4xl text-base leading-7 text-white/75">
              {roadmapData[selectedGoal]?.description}
            </p>

            {/* =================================================
                10 ROADMAP CARDS
            ================================================= */}

            <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">

              {roadmap.map((item, index) => {

                const isOpen =
                  openMilestones.includes(index);

                return (
                  <div
                    key={index}
                    className={`overflow-hidden rounded-2xl border transition-all duration-300 ${
                      isOpen
                        ? "border-cyan-400 bg-[#075862] shadow-xl shadow-cyan-950/30 md:col-span-2"
                        : "border-cyan-400/30 bg-[#075862]"
                    }`}
                  >

                    {/* CARD HEADER */}

                    <button
                      onClick={() =>
                        toggleMilestone(index)
                      }
                      className="flex w-full items-center gap-4 p-5 text-left md:p-6"
                    >

                      {/* Number */}

                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-cyan-400 text-xl font-extrabold text-black">
                        {index + 1}
                      </div>

                      {/* Title */}

                      <div className="min-w-0 flex-1">

                        <h3 className="text-xl font-extrabold text-white md:text-2xl">
                          {item.title}
                        </h3>

                        <p className="mt-1 text-sm text-white/75">
                          Recommended learning milestone
                        </p>

                      </div>

                      {/* Arrow */}

                      <div className="shrink-0 text-cyan-300">

                        {isOpen ? (
                          <ChevronUp className="h-6 w-6" />
                        ) : (
                          <ChevronDown className="h-6 w-6" />
                        )}

                      </div>

                    </button>

                    {/* =================================================
                        DETAILED DESCRIPTION
                    ================================================= */}

                    {isOpen && (

                      <div className="border-t border-cyan-400/20 px-5 pb-6 pt-5 md:px-6">

                        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">

                          {/* OVERVIEW */}

                          <div className="rounded-xl border border-white/10 bg-black/10 p-5">

                            <div className="mb-3 flex items-center gap-2">
                              <FileText className="h-5 w-5 text-cyan-300" />

                              <h4 className="font-bold text-white">
                                Overview
                              </h4>
                            </div>

                            <p className="text-sm leading-6 text-white/75">
                              {item.overview}
                            </p>

                          </div>

                          {/* LEARN */}

                          <div className="rounded-xl border border-white/10 bg-black/10 p-5">

                            <div className="mb-3 flex items-center gap-2">
                              <ListChecks className="h-5 w-5 text-cyan-300" />

                              <h4 className="font-bold text-white">
                                What You Will Learn
                              </h4>
                            </div>

                            <ul className="space-y-2">

                              {item.learn.map(
                                (point, pointIndex) => (
                                  <li
                                    key={pointIndex}
                                    className="flex gap-2 text-sm text-white/75"
                                  >
                                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300" />

                                    <span>
                                      {point}
                                    </span>
                                  </li>
                                )
                              )}

                            </ul>

                          </div>

                          {/* PRACTICAL */}

                          <div className="rounded-xl border border-white/10 bg-black/10 p-5">

                            <div className="mb-3 flex items-center gap-2">
                              <Briefcase className="h-5 w-5 text-cyan-300" />

                              <h4 className="font-bold text-white">
                                Practical Task
                              </h4>
                            </div>

                            <p className="text-sm leading-6 text-white/75">
                              {item.practical}
                            </p>

                          </div>

                        </div>

                        {/* OUTCOME */}

                        <div className="mt-5 rounded-xl border border-cyan-400/20 bg-cyan-400/10 p-5">

                          <div className="flex gap-3">

                            <Award className="mt-1 h-6 w-6 shrink-0 text-cyan-300" />

                            <div>

                              <h4 className="font-bold text-white">
                                Expected Outcome
                              </h4>

                              <p className="mt-1 text-sm leading-6 text-white/75">
                                {item.outcome}
                              </p>

                            </div>

                          </div>

                        </div>

                      </div>

                    )}

                  </div>
                );
              })}

            </div>

            {/* Bottom note */}

            <div className="mt-8 flex flex-col gap-4 rounded-2xl border border-cyan-400/20 bg-[#075862] p-5 md:flex-row md:items-center">

              <Lightbulb className="h-8 w-8 shrink-0 text-cyan-300" />

              <div>
                <h3 className="font-bold text-white">
                  How to use this roadmap
                </h3>

                <p className="mt-1 text-sm leading-6 text-white/70">
                  Click any milestone above to understand what
                  you need to learn, practice and achieve before
                  moving to the next stage. Complete the milestones
                  step-by-step instead of trying to learn everything
                  at once.
                </p>
              </div>

            </div>

          </div>

        )}

        {/* =================================================
            BOTTOM FEATURES
        ================================================= */}

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">

          <Feature
            icon={Brain}
            title="AI-Powered Personalization"
            text="Roadmap designed around your goal."
          />

          <Feature
            icon={Target}
            title="Goal-Oriented Learning"
            text="Focused path for career growth."
          />

          <Feature
            icon={BookOpen}
            title="Detailed Milestones"
            text="Every step explained clearly."
          />

          <Feature
            icon={Rocket}
            title="Career Growth"
            text="Build practical skills and projects."
          />

          <Feature
            icon={ShieldCheck}
            title="Secure Platform"
            text="Your learning journey stays protected."
          />

        </div>

      </div>
    </section>
  );
}

/* =========================================================
   FEATURE COMPONENT
========================================================= */

function Feature({ icon: Icon, title, text }) {
  return (
    <div className="rounded-2xl border border-cyan-400/20 bg-[#003f46] p-5 text-center transition hover:-translate-y-1 hover:border-cyan-400/50">

      <Icon className="mx-auto mb-3 h-8 w-8 text-cyan-300" />

      <h3 className="text-sm font-bold text-white">
        {title}
      </h3>

      <p className="mt-2 text-xs leading-5 text-white/60">
        {text}
      </p>

    </div>
  );
}