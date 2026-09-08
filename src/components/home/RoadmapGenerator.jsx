import React, { useState, useRef, useEffect } from "react";
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
          "HTML document structure — Core concepts and terminology",
          "HTML document structure — Common patterns and real-world use cases",
          "HTML document structure — Setup and project structure",
          "HTML document structure — Syntax, configuration and conventions",
          "HTML document structure — Input/output and data flow",
          "HTML document structure — Error handling and debugging",
          "HTML document structure — Best practices and maintainability"
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
          "Variables — Core concepts and terminology",
          "Variables — Common patterns and real-world use cases",
          "Variables — Setup and project structure",
          "Variables — Syntax, configuration and conventions",
          "Variables — Input/output and data flow",
          "Variables — Error handling and debugging"
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
          "Media queries — Core concepts and terminology",
          "Media queries — Common patterns and real-world use cases",
          "Media queries — Setup and project structure",
          "Media queries — Syntax, configuration and conventions",
          "Media queries — Input/output and data flow",
          "Media queries — Error handling and debugging",
          "Media queries — Best practices and maintainability"
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
          "Git basics — Core concepts and terminology",
          "Git basics — Common patterns and real-world use cases",
          "Git basics — Setup and project structure",
          "Git basics — Syntax, configuration and conventions",
          "Git basics — Input/output and data flow",
          "Git basics — Error handling and debugging"
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
          "Components — Core concepts and terminology",
          "Components — Common patterns and real-world use cases",
          "Components — Setup and project structure",
          "Components — Syntax, configuration and conventions",
          "Components — Input/output and data flow",
          "Components — Error handling and debugging"
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
          "REST APIs — Core concepts and terminology",
          "REST APIs — Common patterns and real-world use cases",
          "REST APIs — Setup and project structure",
          "REST APIs — Syntax, configuration and conventions",
          "REST APIs — Input/output and data flow",
          "REST APIs — Error handling and debugging"
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
          "Client-server architecture — Core concepts and terminology",
          "Client-server architecture — Common patterns and real-world use cases",
          "Client-server architecture — Setup and project structure",
          "Client-server architecture — Syntax, configuration and conventions",
          "Client-server architecture — Input/output and data flow",
          "Client-server architecture — Error handling and debugging",
          "Client-server architecture — Best practices and maintainability"
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
          "Tables — Core concepts and terminology",
          "Tables — Common patterns and real-world use cases",
          "Tables — Setup and project structure",
          "Tables — Syntax, configuration and conventions",
          "Tables — Input/output and data flow",
          "Tables — Error handling and debugging",
          "Tables — Best practices and maintainability"
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
          "Login systems — Core concepts and terminology",
          "Login systems — Common patterns and real-world use cases",
          "Login systems — Setup and project structure",
          "Login systems — Syntax, configuration and conventions",
          "Login systems — Input/output and data flow",
          "Login systems — Error handling and debugging",
          "Login systems — Best practices and maintainability"
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
          "Frontend — Core concepts and terminology",
          "Frontend — Common patterns and real-world use cases",
          "Frontend — Setup and project structure",
          "Frontend — Syntax, configuration and conventions",
          "Frontend — Input/output and data flow",
          "Frontend — Error handling and debugging",
          "Frontend — Best practices and maintainability"
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
          "Hooks — Core concepts and terminology",
          "Hooks — Common patterns and real-world use cases",
          "Hooks — Setup and project structure",
          "Hooks — Syntax, configuration and conventions",
          "Hooks — Input/output and data flow",
          "Hooks — Error handling and debugging",
          "Hooks — Best practices and maintainability",
          "Hooks — Performance considerations"
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
          "Closures — Core concepts and terminology",
          "Closures — Common patterns and real-world use cases",
          "Closures — Setup and project structure",
          "Closures — Syntax, configuration and conventions",
          "Closures — Input/output and data flow",
          "Closures — Error handling and debugging",
          "Closures — Best practices and maintainability"
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
          "Types — Core concepts and terminology",
          "Types — Common patterns and real-world use cases",
          "Types — Setup and project structure",
          "Types — Syntax, configuration and conventions",
          "Types — Input/output and data flow",
          "Types — Error handling and debugging",
          "Types — Best practices and maintainability",
          "Types — Performance considerations"
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
          "Global state — Core concepts and terminology",
          "Global state — Common patterns and real-world use cases",
          "Global state — Setup and project structure",
          "Global state — Syntax, configuration and conventions",
          "Global state — Input/output and data flow",
          "Global state — Error handling and debugging",
          "Global state — Best practices and maintainability",
          "Global state — Performance considerations"
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
          "Controllers — Core concepts and terminology",
          "Controllers — Common patterns and real-world use cases",
          "Controllers — Setup and project structure",
          "Controllers — Syntax, configuration and conventions",
          "Controllers — Input/output and data flow",
          "Controllers — Error handling and debugging",
          "Controllers — Best practices and maintainability",
          "Controllers — Performance considerations"
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
          "Indexes — Core concepts and terminology",
          "Indexes — Common patterns and real-world use cases",
          "Indexes — Setup and project structure",
          "Indexes — Syntax, configuration and conventions",
          "Indexes — Input/output and data flow",
          "Indexes — Error handling and debugging",
          "Indexes — Best practices and maintainability",
          "Indexes — Performance considerations"
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
          "JWT — Core concepts and terminology",
          "JWT — Common patterns and real-world use cases",
          "JWT — Setup and project structure",
          "JWT — Syntax, configuration and conventions",
          "JWT — Input/output and data flow",
          "JWT — Error handling and debugging",
          "JWT — Best practices and maintainability",
          "JWT — Performance considerations"
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
          "Unit testing — Core concepts and terminology",
          "Unit testing — Common patterns and real-world use cases",
          "Unit testing — Setup and project structure",
          "Unit testing — Syntax, configuration and conventions",
          "Unit testing — Input/output and data flow",
          "Unit testing — Error handling and debugging",
          "Unit testing — Best practices and maintainability",
          "Unit testing — Performance considerations",
          "Unit testing — Security and reliability considerations"
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
          "Lazy loading — Core concepts and terminology",
          "Lazy loading — Common patterns and real-world use cases",
          "Lazy loading — Setup and project structure",
          "Lazy loading — Syntax, configuration and conventions",
          "Lazy loading — Input/output and data flow",
          "Lazy loading — Error handling and debugging",
          "Lazy loading — Best practices and maintainability",
          "Lazy loading — Performance considerations"
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
          "Environment variables — Core concepts and terminology",
          "Environment variables — Common patterns and real-world use cases",
          "Environment variables — Setup and project structure",
          "Environment variables — Syntax, configuration and conventions",
          "Environment variables — Input/output and data flow",
          "Environment variables — Error handling and debugging",
          "Environment variables — Best practices and maintainability",
          "Environment variables — Performance considerations"
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
          "Architecture patterns — Core concepts and terminology",
          "Architecture patterns — Common patterns and real-world use cases",
          "Architecture patterns — Setup and project structure",
          "Architecture patterns — Syntax, configuration and conventions",
          "Architecture patterns — Input/output and data flow",
          "Architecture patterns — Error handling and debugging",
          "Architecture patterns — Best practices and maintainability",
          "Architecture patterns — Performance considerations",
          "Architecture patterns — Security and reliability considerations"
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
          "Compound components — Core concepts and terminology",
          "Compound components — Common patterns and real-world use cases",
          "Compound components — Setup and project structure",
          "Compound components — Syntax, configuration and conventions",
          "Compound components — Input/output and data flow",
          "Compound components — Error handling and debugging",
          "Compound components — Best practices and maintainability",
          "Compound components — Performance considerations",
          "Compound components — Security and reliability considerations"
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
          "Scalability — Core concepts and terminology",
          "Scalability — Common patterns and real-world use cases",
          "Scalability — Setup and project structure",
          "Scalability — Syntax, configuration and conventions",
          "Scalability — Input/output and data flow",
          "Scalability — Error handling and debugging",
          "Scalability — Best practices and maintainability",
          "Scalability — Performance considerations"
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
          "Service architecture — Core concepts and terminology",
          "Service architecture — Common patterns and real-world use cases",
          "Service architecture — Setup and project structure",
          "Service architecture — Syntax, configuration and conventions",
          "Service architecture — Input/output and data flow",
          "Service architecture — Error handling and debugging",
          "Service architecture — Best practices and maintainability",
          "Service architecture — Performance considerations",
          "Service architecture — Security and reliability considerations"
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
          "Indexes — Core concepts and terminology",
          "Indexes — Common patterns and real-world use cases",
          "Indexes — Setup and project structure",
          "Indexes — Syntax, configuration and conventions",
          "Indexes — Input/output and data flow",
          "Indexes — Error handling and debugging",
          "Indexes — Best practices and maintainability",
          "Indexes — Performance considerations"
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
          "Cloud services — Core concepts and terminology",
          "Cloud services — Common patterns and real-world use cases",
          "Cloud services — Setup and project structure",
          "Cloud services — Syntax, configuration and conventions",
          "Cloud services — Input/output and data flow",
          "Cloud services — Error handling and debugging",
          "Cloud services — Best practices and maintainability",
          "Cloud services — Performance considerations"
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
          "Authentication security — Core concepts and terminology",
          "Authentication security — Common patterns and real-world use cases",
          "Authentication security — Setup and project structure",
          "Authentication security — Syntax, configuration and conventions",
          "Authentication security — Input/output and data flow",
          "Authentication security — Error handling and debugging",
          "Authentication security — Best practices and maintainability",
          "Authentication security — Performance considerations"
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
          "Caching — Core concepts and terminology",
          "Caching — Common patterns and real-world use cases",
          "Caching — Setup and project structure",
          "Caching — Syntax, configuration and conventions",
          "Caching — Input/output and data flow",
          "Caching — Error handling and debugging",
          "Caching — Best practices and maintainability",
          "Caching — Performance considerations"
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
          "Pipelines — Core concepts and terminology",
          "Pipelines — Common patterns and real-world use cases",
          "Pipelines — Setup and project structure",
          "Pipelines — Syntax, configuration and conventions",
          "Pipelines — Input/output and data flow",
          "Pipelines — Error handling and debugging",
          "Pipelines — Best practices and maintainability",
          "Pipelines — Performance considerations",
          "Pipelines — Security and reliability considerations"
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
          "Architecture — Core concepts and terminology",
          "Architecture — Common patterns and real-world use cases",
          "Architecture — Setup and project structure",
          "Architecture — Syntax, configuration and conventions",
          "Architecture — Input/output and data flow",
          "Architecture — Error handling and debugging",
          "Architecture — Best practices and maintainability"
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
          "Mobile application architecture — Core concepts and terminology",
          "Mobile application architecture — Common patterns and real-world use cases",
          "Mobile application architecture — Setup and project structure",
          "Mobile application architecture — Syntax, configuration and conventions",
          "Mobile application architecture — Input/output and data flow",
          "Mobile application architecture — Error handling and debugging",
          "Mobile application architecture — Best practices and maintainability",
          "Mobile application architecture — Performance considerations"
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
          "Variables — Core concepts and terminology",
          "Variables — Common patterns and real-world use cases",
          "Variables — Setup and project structure",
          "Variables — Syntax, configuration and conventions",
          "Variables — Input/output and data flow",
          "Variables — Error handling and debugging",
          "Variables — Best practices and maintainability"
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
          "Layouts — Core concepts and terminology",
          "Layouts — Common patterns and real-world use cases",
          "Layouts — Setup and project structure",
          "Layouts — Syntax, configuration and conventions",
          "Layouts — Input/output and data flow",
          "Layouts — Error handling and debugging",
          "Layouts — Best practices and maintainability"
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
          "Navigation — Core concepts and terminology",
          "Navigation — Common patterns and real-world use cases",
          "Navigation — Setup and project structure",
          "Navigation — Syntax, configuration and conventions",
          "Navigation — Input/output and data flow",
          "Navigation — Error handling and debugging",
          "Navigation — Best practices and maintainability",
          "Navigation — Performance considerations"
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
          "Local state — Core concepts and terminology",
          "Local state — Common patterns and real-world use cases",
          "Local state — Setup and project structure",
          "Local state — Syntax, configuration and conventions",
          "Local state — Input/output and data flow",
          "Local state — Error handling and debugging",
          "Local state — Best practices and maintainability",
          "Local state — Performance considerations"
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
          "HTTP — Core concepts and terminology",
          "HTTP — Common patterns and real-world use cases",
          "HTTP — Setup and project structure",
          "HTTP — Syntax, configuration and conventions",
          "HTTP — Input/output and data flow",
          "HTTP — Error handling and debugging",
          "HTTP — Best practices and maintainability",
          "HTTP — Performance considerations"
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
          "Preferences — Core concepts and terminology",
          "Preferences — Common patterns and real-world use cases",
          "Preferences — Setup and project structure",
          "Preferences — Syntax, configuration and conventions",
          "Preferences — Input/output and data flow",
          "Preferences — Error handling and debugging",
          "Preferences — Best practices and maintainability",
          "Preferences — Performance considerations",
          "Preferences — Security and reliability considerations"
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
          "Login — Core concepts and terminology",
          "Login — Common patterns and real-world use cases",
          "Login — Setup and project structure",
          "Login — Syntax, configuration and conventions",
          "Login — Input/output and data flow",
          "Login — Error handling and debugging",
          "Login — Best practices and maintainability",
          "Login — Performance considerations"
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
          "Functional testing — Core concepts and terminology",
          "Functional testing — Common patterns and real-world use cases",
          "Functional testing — Setup and project structure",
          "Functional testing — Syntax, configuration and conventions",
          "Functional testing — Input/output and data flow",
          "Functional testing — Error handling and debugging",
          "Functional testing — Best practices and maintainability",
          "Functional testing — Performance considerations",
          "Functional testing — Security and reliability considerations"
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
          "Build configuration — Core concepts and terminology",
          "Build configuration — Common patterns and real-world use cases",
          "Build configuration — Setup and project structure",
          "Build configuration — Syntax, configuration and conventions",
          "Build configuration — Input/output and data flow",
          "Build configuration — Error handling and debugging",
          "Build configuration — Best practices and maintainability",
          "Build configuration — Performance considerations"
        ],
        practical: "Prepare your application for production release.",
        outcome: "Understand the mobile application release process.",
      },
    ],

    Intermediate: [
      {
        title: "Advanced UI Architecture",
        overview: "Build scalable and reusable mobile interfaces.",
        learn: [
          "Reusable components",
          "Design systems",
          "UI architecture",
          "Reusable components — Core concepts and terminology",
          "Reusable components — Common patterns and real-world use cases",
          "Reusable components — Setup and project structure",
          "Reusable components — Syntax, configuration and conventions",
          "Reusable components — Input/output and data flow",
          "Reusable components — Error handling and debugging",
          "Reusable components — Best practices and maintainability",
          "Reusable components — Performance considerations",
          "Reusable components — Security and reliability considerations"
        ],
        practical: "Create a reusable mobile UI system.",
        outcome: "Build maintainable interfaces.",
      },
      {
        title: "Advanced State Management",
        overview: "Manage complex application state.",
        learn: [
          "Global state",
          "Async state",
          "State architecture",
          "Global state — Core concepts and terminology",
          "Global state — Common patterns and real-world use cases",
          "Global state — Setup and project structure",
          "Global state — Syntax, configuration and conventions",
          "Global state — Input/output and data flow",
          "Global state — Error handling and debugging",
          "Global state — Best practices and maintainability",
          "Global state — Performance considerations",
          "Global state — Security and reliability considerations"
        ],
        practical: "Build a complex state-driven application.",
        outcome: "Handle large application state.",
      },
      {
        title: "Advanced Networking",
        overview: "Build reliable network communication.",
        learn: [
          "Caching",
          "Retries",
          "Error handling",
          "API clients",
          "Caching — Core concepts and terminology",
          "Caching — Common patterns and real-world use cases",
          "Caching — Setup and project structure",
          "Caching — Syntax, configuration and conventions",
          "Caching — Input/output and data flow",
          "Caching — Error handling and debugging",
          "Caching — Best practices and maintainability",
          "Caching — Performance considerations"
        ],
        practical: "Create a robust API client.",
        outcome: "Build reliable network features.",
      },
      {
        title: "Database Architecture",
        overview: "Design efficient mobile data storage.",
        learn: [
          "Database models",
          "Queries",
          "Indexes",
          "Database models — Core concepts and terminology",
          "Database models — Common patterns and real-world use cases",
          "Database models — Setup and project structure",
          "Database models — Syntax, configuration and conventions",
          "Database models — Input/output and data flow",
          "Database models — Error handling and debugging",
          "Database models — Best practices and maintainability",
          "Database models — Performance considerations",
          "Database models — Security and reliability considerations"
        ],
        practical: "Build a local database-backed application.",
        outcome: "Design efficient data storage.",
      },
      {
        title: "Push Notifications",
        overview: "Add real-time notifications to applications.",
        learn: [
          "Notification systems",
          "Tokens",
          "Deep links",
          "Notification systems — Core concepts and terminology",
          "Notification systems — Common patterns and real-world use cases",
          "Notification systems — Setup and project structure",
          "Notification systems — Syntax, configuration and conventions",
          "Notification systems — Input/output and data flow",
          "Notification systems — Error handling and debugging",
          "Notification systems — Best practices and maintainability",
          "Notification systems — Performance considerations",
          "Notification systems — Security and reliability considerations"
        ],
        practical: "Implement notification functionality.",
        outcome: "Build notification-driven experiences.",
      },
      {
        title: "Offline-First Applications",
        overview: "Build apps that remain useful without internet connectivity.",
        learn: [
          "Local caching",
          "Synchronization",
          "Offline state",
          "Local caching — Core concepts and terminology",
          "Local caching — Common patterns and real-world use cases",
          "Local caching — Setup and project structure",
          "Local caching — Syntax, configuration and conventions",
          "Local caching — Input/output and data flow",
          "Local caching — Error handling and debugging",
          "Local caching — Best practices and maintainability",
          "Local caching — Performance considerations",
          "Local caching — Security and reliability considerations"
        ],
        practical: "Create an offline-first notes application.",
        outcome: "Build resilient mobile applications.",
      },
      {
        title: "App Performance",
        overview: "Optimize mobile applications for better performance.",
        learn: [
          "Rendering",
          "Memory",
          "Network optimization",
          "Rendering — Core concepts and terminology",
          "Rendering — Common patterns and real-world use cases",
          "Rendering — Setup and project structure",
          "Rendering — Syntax, configuration and conventions",
          "Rendering — Input/output and data flow",
          "Rendering — Error handling and debugging",
          "Rendering — Best practices and maintainability",
          "Rendering — Performance considerations",
          "Rendering — Security and reliability considerations"
        ],
        practical: "Profile and optimize an application.",
        outcome: "Create faster applications.",
      },
      {
        title: "Automated Testing",
        overview: "Automate application testing.",
        learn: [
          "Unit tests",
          "Integration tests",
          "UI tests",
          "Unit tests — Core concepts and terminology",
          "Unit tests — Common patterns and real-world use cases",
          "Unit tests — Setup and project structure",
          "Unit tests — Syntax, configuration and conventions",
          "Unit tests — Input/output and data flow",
          "Unit tests — Error handling and debugging",
          "Unit tests — Best practices and maintainability",
          "Unit tests — Performance considerations",
          "Unit tests — Security and reliability considerations"
        ],
        practical: "Create automated tests for an application.",
        outcome: "Improve application reliability.",
      },
      {
        title: "Security Fundamentals",
        overview: "Protect mobile applications and user data.",
        learn: [
          "Secure storage",
          "Authentication",
          "API security",
          "Secure storage — Core concepts and terminology",
          "Secure storage — Common patterns and real-world use cases",
          "Secure storage — Setup and project structure",
          "Secure storage — Syntax, configuration and conventions",
          "Secure storage — Input/output and data flow",
          "Secure storage — Error handling and debugging",
          "Secure storage — Best practices and maintainability",
          "Secure storage — Performance considerations",
          "Secure storage — Security and reliability considerations"
        ],
        practical: "Perform a security review of a demo app.",
        outcome: "Understand mobile application security.",
      },
      {
        title: "Production Deployment",
        overview: "Prepare applications for production environments.",
        learn: [
          "Release builds",
          "Signing",
          "Monitoring",
          "Release builds — Core concepts and terminology",
          "Release builds — Common patterns and real-world use cases",
          "Release builds — Setup and project structure",
          "Release builds — Syntax, configuration and conventions",
          "Release builds — Input/output and data flow",
          "Release builds — Error handling and debugging",
          "Release builds — Best practices and maintainability",
          "Release builds — Performance considerations",
          "Release builds — Security and reliability considerations"
        ],
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
          "Clean Architecture — Core concepts and terminology",
          "Clean Architecture — Common patterns and real-world use cases",
          "Clean Architecture — Setup and project structure",
          "Clean Architecture — Syntax, configuration and conventions",
          "Clean Architecture — Input/output and data flow",
          "Clean Architecture — Error handling and debugging",
          "Clean Architecture — Best practices and maintainability",
          "Clean Architecture — Performance considerations"
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
          "Presentation layer — Core concepts and terminology",
          "Presentation layer — Common patterns and real-world use cases",
          "Presentation layer — Setup and project structure",
          "Presentation layer — Syntax, configuration and conventions",
          "Presentation layer — Input/output and data flow",
          "Presentation layer — Error handling and debugging",
          "Presentation layer — Best practices and maintainability",
          "Presentation layer — Performance considerations"
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
          "Composable functions — Core concepts and terminology",
          "Composable functions — Common patterns and real-world use cases",
          "Composable functions — Setup and project structure",
          "Composable functions — Syntax, configuration and conventions",
          "Composable functions — Input/output and data flow",
          "Composable functions — Error handling and debugging",
          "Composable functions — Best practices and maintainability",
          "Composable functions — Performance considerations"
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
          "State holders — Core concepts and terminology",
          "State holders — Common patterns and real-world use cases",
          "State holders — Setup and project structure",
          "State holders — Syntax, configuration and conventions",
          "State holders — Input/output and data flow",
          "State holders — Error handling and debugging",
          "State holders — Best practices and maintainability",
          "State holders — Performance considerations"
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
          "Profiling — Core concepts and terminology",
          "Profiling — Common patterns and real-world use cases",
          "Profiling — Setup and project structure",
          "Profiling — Syntax, configuration and conventions",
          "Profiling — Input/output and data flow",
          "Profiling — Error handling and debugging",
          "Profiling — Best practices and maintainability",
          "Profiling — Performance considerations"
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
          "Secure storage — Core concepts and terminology",
          "Secure storage — Common patterns and real-world use cases",
          "Secure storage — Setup and project structure",
          "Secure storage — Syntax, configuration and conventions",
          "Secure storage — Input/output and data flow",
          "Secure storage — Error handling and debugging",
          "Secure storage — Best practices and maintainability",
          "Secure storage — Performance considerations"
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
          "Local data — Core concepts and terminology",
          "Local data — Common patterns and real-world use cases",
          "Local data — Setup and project structure",
          "Local data — Syntax, configuration and conventions",
          "Local data — Input/output and data flow",
          "Local data — Error handling and debugging",
          "Local data — Best practices and maintainability",
          "Local data — Performance considerations"
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
          "Unit testing — Core concepts and terminology",
          "Unit testing — Common patterns and real-world use cases",
          "Unit testing — Setup and project structure",
          "Unit testing — Syntax, configuration and conventions",
          "Unit testing — Input/output and data flow",
          "Unit testing — Error handling and debugging",
          "Unit testing — Best practices and maintainability",
          "Unit testing — Performance considerations"
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
          "Build pipelines — Core concepts and terminology",
          "Build pipelines — Common patterns and real-world use cases",
          "Build pipelines — Setup and project structure",
          "Build pipelines — Syntax, configuration and conventions",
          "Build pipelines — Input/output and data flow",
          "Build pipelines — Error handling and debugging",
          "Build pipelines — Best practices and maintainability",
          "Build pipelines — Performance considerations"
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
          "Production builds — Core concepts and terminology",
          "Production builds — Common patterns and real-world use cases",
          "Production builds — Setup and project structure",
          "Production builds — Syntax, configuration and conventions",
          "Production builds — Input/output and data flow",
          "Production builds — Error handling and debugging",
          "Production builds — Best practices and maintainability",
          "Production builds — Performance considerations"
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
        learn: [
          "Color",
          "Typography",
          "Spacing",
          "Contrast",
          "Color — Core concepts and terminology",
          "Color — Common patterns and real-world use cases",
          "Color — Setup and project structure",
          "Color — Syntax, configuration and conventions",
          "Color — Input/output and data flow",
          "Color — Error handling and debugging",
          "Color — Best practices and maintainability",
          "Color — Performance considerations"
        ],
        practical: "Create a simple landing page design.",
        outcome: "Understand fundamental design principles.",
      },
      {
        title: "UX Fundamentals",
        overview: "Understand how users interact with digital products.",
        learn: [
          "User needs",
          "Usability",
          "User journeys",
          "User needs — Core concepts and terminology",
          "User needs — Common patterns and real-world use cases",
          "User needs — Setup and project structure",
          "User needs — Syntax, configuration and conventions",
          "User needs — Input/output and data flow",
          "User needs — Error handling and debugging",
          "User needs — Best practices and maintainability",
          "User needs — Performance considerations",
          "User needs — Security and reliability considerations"
        ],
        practical: "Create a basic user journey.",
        outcome: "Understand UX thinking.",
      },
      {
        title: "Figma Fundamentals",
        overview: "Learn the essential tools used to create digital designs.",
        learn: [
          "Frames",
          "Components",
          "Auto layout",
          "Prototyping",
          "Frames — Core concepts and terminology",
          "Frames — Common patterns and real-world use cases",
          "Frames — Setup and project structure",
          "Frames — Syntax, configuration and conventions",
          "Frames — Input/output and data flow",
          "Frames — Error handling and debugging",
          "Frames — Best practices and maintainability",
          "Frames — Performance considerations"
        ],
        practical: "Design a mobile application screen.",
        outcome: "Create digital designs in Figma.",
      },
      {
        title: "Wireframing",
        overview: "Plan interfaces before creating visual designs.",
        learn: [
          "Low-fidelity wireframes",
          "Layouts",
          "Navigation",
          "Low-fidelity wireframes — Core concepts and terminology",
          "Low-fidelity wireframes — Common patterns and real-world use cases",
          "Low-fidelity wireframes — Setup and project structure",
          "Low-fidelity wireframes — Syntax, configuration and conventions",
          "Low-fidelity wireframes — Input/output and data flow",
          "Low-fidelity wireframes — Error handling and debugging",
          "Low-fidelity wireframes — Best practices and maintainability",
          "Low-fidelity wireframes — Performance considerations",
          "Low-fidelity wireframes — Security and reliability considerations"
        ],
        practical: "Create wireframes for a website.",
        outcome: "Plan product interfaces effectively.",
      },
      {
        title: "User Research",
        overview: "Learn how to understand user needs.",
        learn: [
          "Interviews",
          "Surveys",
          "Personas",
          "Interviews — Core concepts and terminology",
          "Interviews — Common patterns and real-world use cases",
          "Interviews — Setup and project structure",
          "Interviews — Syntax, configuration and conventions",
          "Interviews — Input/output and data flow",
          "Interviews — Error handling and debugging",
          "Interviews — Best practices and maintainability",
          "Interviews — Performance considerations",
          "Interviews — Security and reliability considerations"
        ],
        practical: "Create personas for a sample product.",
        outcome: "Understand users before designing.",
      },
      {
        title: "Design Systems",
        overview: "Create consistent visual systems.",
        learn: [
          "Components",
          "Colors",
          "Typography",
          "Spacing",
          "Components — Core concepts and terminology",
          "Components — Common patterns and real-world use cases",
          "Components — Setup and project structure",
          "Components — Syntax, configuration and conventions",
          "Components — Input/output and data flow",
          "Components — Error handling and debugging",
          "Components — Best practices and maintainability",
          "Components — Performance considerations"
        ],
        practical: "Create a mini design system.",
        outcome: "Design consistent interfaces.",
      },
      {
        title: "Responsive Design",
        overview: "Design interfaces for different screen sizes.",
        learn: [
          "Desktop",
          "Tablet",
          "Mobile",
          "Desktop — Core concepts and terminology",
          "Desktop — Common patterns and real-world use cases",
          "Desktop — Setup and project structure",
          "Desktop — Syntax, configuration and conventions",
          "Desktop — Input/output and data flow",
          "Desktop — Error handling and debugging",
          "Desktop — Best practices and maintainability",
          "Desktop — Performance considerations",
          "Desktop — Security and reliability considerations"
        ],
        practical: "Create responsive designs.",
        outcome: "Understand responsive UI design.",
      },
      {
        title: "Prototyping",
        overview: "Create interactive prototypes.",
        learn: [
          "Interactions",
          "Transitions",
          "User flows",
          "Interactions — Core concepts and terminology",
          "Interactions — Common patterns and real-world use cases",
          "Interactions — Setup and project structure",
          "Interactions — Syntax, configuration and conventions",
          "Interactions — Input/output and data flow",
          "Interactions — Error handling and debugging",
          "Interactions — Best practices and maintainability",
          "Interactions — Performance considerations",
          "Interactions — Security and reliability considerations"
        ],
        practical: "Build a clickable app prototype.",
        outcome: "Demonstrate product interactions.",
      },
      {
        title: "Usability Testing",
        overview: "Test designs with users.",
        learn: [
          "Testing",
          "Feedback",
          "Iteration",
          "Testing — Core concepts and terminology",
          "Testing — Common patterns and real-world use cases",
          "Testing — Setup and project structure",
          "Testing — Syntax, configuration and conventions",
          "Testing — Input/output and data flow",
          "Testing — Error handling and debugging",
          "Testing — Best practices and maintainability",
          "Testing — Performance considerations",
          "Testing — Security and reliability considerations"
        ],
        practical: "Conduct a usability test.",
        outcome: "Improve designs based on feedback.",
      },
      {
        title: "Portfolio Project",
        overview: "Combine your design skills into a complete case study.",
        learn: [
          "Research",
          "Design",
          "Prototype",
          "Case study",
          "Research — Core concepts and terminology",
          "Research — Common patterns and real-world use cases",
          "Research — Setup and project structure",
          "Research — Syntax, configuration and conventions",
          "Research — Input/output and data flow",
          "Research — Error handling and debugging",
          "Research — Best practices and maintainability",
          "Research — Performance considerations"
        ],
        practical: "Create a complete UX case study.",
        outcome: "Build a portfolio-ready project.",
      },
    ],

    Intermediate: [
      {
        title: "Advanced User Research",
        overview: "Conduct deeper user research.",
        learn: [
          "Research methods",
          "Analysis",
          "Insights",
          "Research methods — Core concepts and terminology",
          "Research methods — Common patterns and real-world use cases",
          "Research methods — Setup and project structure",
          "Research methods — Syntax, configuration and conventions",
          "Research methods — Input/output and data flow",
          "Research methods — Error handling and debugging",
          "Research methods — Best practices and maintainability",
          "Research methods — Performance considerations",
          "Research methods — Security and reliability considerations"
        ],
        practical: "Conduct structured user research.",
        outcome: "Make evidence-based design decisions.",
      },
      {
        title: "Information Architecture",
        overview: "Organize complex digital products.",
        learn: [
          "Navigation",
          "Content hierarchy",
          "Taxonomy",
          "Navigation — Core concepts and terminology",
          "Navigation — Common patterns and real-world use cases",
          "Navigation — Setup and project structure",
          "Navigation — Syntax, configuration and conventions",
          "Navigation — Input/output and data flow",
          "Navigation — Error handling and debugging",
          "Navigation — Best practices and maintainability",
          "Navigation — Performance considerations",
          "Navigation — Security and reliability considerations"
        ],
        practical: "Design information architecture for a platform.",
        outcome: "Structure complex interfaces.",
      },
      {
        title: "Advanced Prototyping",
        overview: "Create realistic product prototypes.",
        learn: [
          "Micro-interactions",
          "Animations",
          "Flows",
          "Micro-interactions — Core concepts and terminology",
          "Micro-interactions — Common patterns and real-world use cases",
          "Micro-interactions — Setup and project structure",
          "Micro-interactions — Syntax, configuration and conventions",
          "Micro-interactions — Input/output and data flow",
          "Micro-interactions — Error handling and debugging",
          "Micro-interactions — Best practices and maintainability",
          "Micro-interactions — Performance considerations",
          "Micro-interactions — Security and reliability considerations"
        ],
        practical: "Build a high-fidelity prototype.",
        outcome: "Create realistic product experiences.",
      },
      {
        title: "Design Systems",
        overview: "Build scalable design systems.",
        learn: [
          "Tokens",
          "Components",
          "Variants",
          "Tokens — Core concepts and terminology",
          "Tokens — Common patterns and real-world use cases",
          "Tokens — Setup and project structure",
          "Tokens — Syntax, configuration and conventions",
          "Tokens — Input/output and data flow",
          "Tokens — Error handling and debugging",
          "Tokens — Best practices and maintainability",
          "Tokens — Performance considerations",
          "Tokens — Security and reliability considerations"
        ],
        practical: "Build a complete design system.",
        outcome: "Create scalable UI systems.",
      },
      {
        title: "Accessibility",
        overview: "Design interfaces usable by a wider audience.",
        learn: [
          "Contrast",
          "Keyboard navigation",
          "Inclusive design",
          "Contrast — Core concepts and terminology",
          "Contrast — Common patterns and real-world use cases",
          "Contrast — Setup and project structure",
          "Contrast — Syntax, configuration and conventions",
          "Contrast — Input/output and data flow",
          "Contrast — Error handling and debugging",
          "Contrast — Best practices and maintainability",
          "Contrast — Performance considerations",
          "Contrast — Security and reliability considerations"
        ],
        practical: "Audit an interface for accessibility.",
        outcome: "Create more accessible products.",
      },
      {
        title: "UX Writing",
        overview: "Create clear and useful product communication.",
        learn: [
          "Microcopy",
          "Error messages",
          "Onboarding",
          "Microcopy — Core concepts and terminology",
          "Microcopy — Common patterns and real-world use cases",
          "Microcopy — Setup and project structure",
          "Microcopy — Syntax, configuration and conventions",
          "Microcopy — Input/output and data flow",
          "Microcopy — Error handling and debugging",
          "Microcopy — Best practices and maintainability",
          "Microcopy — Performance considerations",
          "Microcopy — Security and reliability considerations"
        ],
        practical: "Improve UX copy for an application.",
        outcome: "Create clearer product experiences.",
      },
      {
        title: "Product Thinking",
        overview: "Connect design decisions with business and user goals.",
        learn: [
          "Product goals",
          "Metrics",
          "User problems",
          "Product goals — Core concepts and terminology",
          "Product goals — Common patterns and real-world use cases",
          "Product goals — Setup and project structure",
          "Product goals — Syntax, configuration and conventions",
          "Product goals — Input/output and data flow",
          "Product goals — Error handling and debugging",
          "Product goals — Best practices and maintainability",
          "Product goals — Performance considerations",
          "Product goals — Security and reliability considerations"
        ],
        practical: "Create a product improvement proposal.",
        outcome: "Think like a product designer.",
      },
      {
        title: "Usability Research",
        overview: "Analyze user behavior and product usability.",
        learn: [
          "Testing",
          "Analysis",
          "Iteration",
          "Testing — Core concepts and terminology",
          "Testing — Common patterns and real-world use cases",
          "Testing — Setup and project structure",
          "Testing — Syntax, configuration and conventions",
          "Testing — Input/output and data flow",
          "Testing — Error handling and debugging",
          "Testing — Best practices and maintainability",
          "Testing — Performance considerations",
          "Testing — Security and reliability considerations"
        ],
        practical: "Conduct a usability study.",
        outcome: "Improve products through research.",
      },
      {
        title: "Mobile UX",
        overview: "Design effective mobile experiences.",
        learn: [
          "Touch interaction",
          "Mobile patterns",
          "Navigation",
          "Touch interaction — Core concepts and terminology",
          "Touch interaction — Common patterns and real-world use cases",
          "Touch interaction — Setup and project structure",
          "Touch interaction — Syntax, configuration and conventions",
          "Touch interaction — Input/output and data flow",
          "Touch interaction — Error handling and debugging",
          "Touch interaction — Best practices and maintainability",
          "Touch interaction — Performance considerations",
          "Touch interaction — Security and reliability considerations"
        ],
        practical: "Design a complete mobile flow.",
        outcome: "Create mobile-first experiences.",
      },
      {
        title: "Professional Case Study",
        overview: "Present your design process professionally.",
        learn: [
          "Problem",
          "Research",
          "Solution",
          "Results",
          "Problem — Core concepts and terminology",
          "Problem — Common patterns and real-world use cases",
          "Problem — Setup and project structure",
          "Problem — Syntax, configuration and conventions",
          "Problem — Input/output and data flow",
          "Problem — Error handling and debugging",
          "Problem — Best practices and maintainability",
          "Problem — Performance considerations"
        ],
        practical: "Create a professional portfolio case study.",
        outcome: "Build a strong design portfolio.",
      },
    ],

    Advanced: [
      {
        title: "UX Strategy",
        overview: "Create design strategies aligned with product goals.",
        learn: [
          "Product strategy",
          "Research",
          "Metrics",
          "Product strategy — Core concepts and terminology",
          "Product strategy — Common patterns and real-world use cases",
          "Product strategy — Setup and project structure",
          "Product strategy — Syntax, configuration and conventions",
          "Product strategy — Input/output and data flow",
          "Product strategy — Error handling and debugging",
          "Product strategy — Best practices and maintainability",
          "Product strategy — Performance considerations",
          "Product strategy — Security and reliability considerations"
        ],
        practical: "Create a UX strategy document.",
        outcome: "Think strategically about UX.",
      },
      {
        title: "Enterprise UX",
        overview: "Design complex enterprise applications.",
        learn: [
          "Complex workflows",
          "Roles",
          "Permissions",
          "Complex workflows — Core concepts and terminology",
          "Complex workflows — Common patterns and real-world use cases",
          "Complex workflows — Setup and project structure",
          "Complex workflows — Syntax, configuration and conventions",
          "Complex workflows — Input/output and data flow",
          "Complex workflows — Error handling and debugging",
          "Complex workflows — Best practices and maintainability",
          "Complex workflows — Performance considerations",
          "Complex workflows — Security and reliability considerations"
        ],
        practical: "Design an enterprise dashboard.",
        outcome: "Handle complex product experiences.",
      },
      {
        title: "Design System Architecture",
        overview: "Create scalable design systems.",
        learn: [
          "Tokens",
          "Components",
          "Governance",
          "Tokens — Core concepts and terminology",
          "Tokens — Common patterns and real-world use cases",
          "Tokens — Setup and project structure",
          "Tokens — Syntax, configuration and conventions",
          "Tokens — Input/output and data flow",
          "Tokens — Error handling and debugging",
          "Tokens — Best practices and maintainability",
          "Tokens — Performance considerations",
          "Tokens — Security and reliability considerations"
        ],
        practical: "Build a large design system.",
        outcome: "Manage scalable UI systems.",
      },
      {
        title: "Advanced Prototyping",
        overview: "Create highly realistic interactive prototypes.",
        learn: [
          "Motion",
          "Interactions",
          "Advanced flows",
          "Motion — Core concepts and terminology",
          "Motion — Common patterns and real-world use cases",
          "Motion — Setup and project structure",
          "Motion — Syntax, configuration and conventions",
          "Motion — Input/output and data flow",
          "Motion — Error handling and debugging",
          "Motion — Best practices and maintainability",
          "Motion — Performance considerations",
          "Motion — Security and reliability considerations"
        ],
        practical: "Create a production-style prototype.",
        outcome: "Communicate complex product behavior.",
      },
      {
        title: "UX Analytics",
        overview: "Use product data to improve experiences.",
        learn: [
          "Metrics",
          "Funnels",
          "User behavior",
          "Metrics — Core concepts and terminology",
          "Metrics — Common patterns and real-world use cases",
          "Metrics — Setup and project structure",
          "Metrics — Syntax, configuration and conventions",
          "Metrics — Input/output and data flow",
          "Metrics — Error handling and debugging",
          "Metrics — Best practices and maintainability",
          "Metrics — Performance considerations",
          "Metrics — Security and reliability considerations"
        ],
        practical: "Analyze a product funnel.",
        outcome: "Make data-informed design decisions.",
      },
      {
        title: "Accessibility Strategy",
        overview: "Integrate accessibility into product design.",
        learn: [
          "Inclusive design",
          "Accessibility standards",
          "Inclusive design — Core concepts and terminology",
          "Inclusive design — Common patterns and real-world use cases",
          "Inclusive design — Setup and project structure",
          "Inclusive design — Syntax, configuration and conventions",
          "Inclusive design — Input/output and data flow",
          "Inclusive design — Error handling and debugging",
          "Inclusive design — Best practices and maintainability",
          "Inclusive design — Performance considerations",
          "Inclusive design — Security and reliability considerations",
          "Inclusive design — Testing and validation"
        ],
        practical: "Create an accessibility audit.",
        outcome: "Design inclusive products.",
      },
      {
        title: "Design Leadership",
        overview: "Learn how design teams and projects are managed.",
        learn: [
          "Feedback",
          "Planning",
          "Design critique",
          "Feedback — Core concepts and terminology",
          "Feedback — Common patterns and real-world use cases",
          "Feedback — Setup and project structure",
          "Feedback — Syntax, configuration and conventions",
          "Feedback — Input/output and data flow",
          "Feedback — Error handling and debugging",
          "Feedback — Best practices and maintainability",
          "Feedback — Performance considerations",
          "Feedback — Security and reliability considerations"
        ],
        practical: "Lead a design review.",
        outcome: "Develop design leadership skills.",
      },
      {
        title: "Product Design",
        overview: "Combine UX, UI and product thinking.",
        learn: [
          "Product discovery",
          "Design",
          "Validation",
          "Product discovery — Core concepts and terminology",
          "Product discovery — Common patterns and real-world use cases",
          "Product discovery — Setup and project structure",
          "Product discovery — Syntax, configuration and conventions",
          "Product discovery — Input/output and data flow",
          "Product discovery — Error handling and debugging",
          "Product discovery — Best practices and maintainability",
          "Product discovery — Performance considerations",
          "Product discovery — Security and reliability considerations"
        ],
        practical: "Design a complete digital product.",
        outcome: "Develop product-level design skills.",
      },
      {
        title: "Design Operations",
        overview: "Improve the processes used by design teams.",
        learn: [
          "Workflows",
          "Documentation",
          "Collaboration",
          "Workflows — Core concepts and terminology",
          "Workflows — Common patterns and real-world use cases",
          "Workflows — Setup and project structure",
          "Workflows — Syntax, configuration and conventions",
          "Workflows — Input/output and data flow",
          "Workflows — Error handling and debugging",
          "Workflows — Best practices and maintainability",
          "Workflows — Performance considerations",
          "Workflows — Security and reliability considerations"
        ],
        practical: "Create a design team workflow.",
        outcome: "Understand design operations.",
      },
      {
        title: "Professional Product Case Study",
        overview: "Create a complete professional product design case study.",
        learn: [
          "Research",
          "Strategy",
          "Design",
          "Testing",
          "Results",
          "Research — Core concepts and terminology",
          "Research — Common patterns and real-world use cases",
          "Research — Setup and project structure",
          "Research — Syntax, configuration and conventions",
          "Research — Input/output and data flow",
          "Research — Error handling and debugging",
          "Research — Best practices and maintainability"
        ],
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
        learn: [
          "CPU",
          "RAM",
          "Storage",
          "Processes",
          "CPU — Core concepts and terminology",
          "CPU — Common patterns and real-world use cases",
          "CPU — Setup and project structure",
          "CPU — Syntax, configuration and conventions",
          "CPU — Input/output and data flow",
          "CPU — Error handling and debugging",
          "CPU — Best practices and maintainability",
          "CPU — Performance considerations"
        ],
        practical: "Analyze your computer architecture.",
        outcome: "Understand computer fundamentals.",
      },
      {
        title: "Operating Systems",
        overview: "Learn how operating systems manage resources.",
        learn: [
          "Kernel",
          "Processes",
          "Memory",
          "File systems",
          "Kernel — Core concepts and terminology",
          "Kernel — Common patterns and real-world use cases",
          "Kernel — Setup and project structure",
          "Kernel — Syntax, configuration and conventions",
          "Kernel — Input/output and data flow",
          "Kernel — Error handling and debugging",
          "Kernel — Best practices and maintainability",
          "Kernel — Performance considerations"
        ],
        practical: "Explore processes and permissions on Linux.",
        outcome: "Understand OS security concepts.",
      },
      {
        title: "Linux Fundamentals",
        overview: "Build practical Linux skills.",
        learn: [
          "Commands",
          "Files",
          "Permissions",
          "Users",
          "Commands — Core concepts and terminology",
          "Commands — Common patterns and real-world use cases",
          "Commands — Setup and project structure",
          "Commands — Syntax, configuration and conventions",
          "Commands — Input/output and data flow",
          "Commands — Error handling and debugging",
          "Commands — Best practices and maintainability",
          "Commands — Performance considerations"
        ],
        practical: "Complete Linux command-line exercises.",
        outcome: "Become comfortable with Linux.",
      },
      {
        title: "Networking Fundamentals",
        overview: "Understand how computers communicate.",
        learn: [
          "OSI",
          "TCP/IP",
          "IP",
          "Ports",
          "Protocols",
          "OSI — Core concepts and terminology",
          "OSI — Common patterns and real-world use cases",
          "OSI — Setup and project structure",
          "OSI — Syntax, configuration and conventions",
          "OSI — Input/output and data flow",
          "OSI — Error handling and debugging",
          "OSI — Best practices and maintainability"
        ],
        practical: "Analyze network traffic in a lab.",
        outcome: "Understand networking foundations.",
      },
      {
        title: "Cybersecurity Fundamentals",
        overview: "Understand core security principles.",
        learn: [
          "CIA triad",
          "Threats",
          "Vulnerabilities",
          "Risk",
          "CIA triad — Core concepts and terminology",
          "CIA triad — Common patterns and real-world use cases",
          "CIA triad — Setup and project structure",
          "CIA triad — Syntax, configuration and conventions",
          "CIA triad — Input/output and data flow",
          "CIA triad — Error handling and debugging",
          "CIA triad — Best practices and maintainability",
          "CIA triad — Performance considerations"
        ],
        practical: "Create a basic threat model.",
        outcome: "Understand security concepts.",
      },
      {
        title: "Web Security",
        overview: "Learn common web application security concepts.",
        learn: [
          "Authentication",
          "Input validation",
          "OWASP concepts",
          "Authentication — Core concepts and terminology",
          "Authentication — Common patterns and real-world use cases",
          "Authentication — Setup and project structure",
          "Authentication — Syntax, configuration and conventions",
          "Authentication — Input/output and data flow",
          "Authentication — Error handling and debugging",
          "Authentication — Best practices and maintainability",
          "Authentication — Performance considerations",
          "Authentication — Security and reliability considerations"
        ],
        practical: "Practice against intentionally vulnerable labs.",
        outcome: "Understand common web vulnerabilities.",
      },
      {
        title: "Nmap Fundamentals",
        overview: "Learn network discovery and service enumeration in authorized labs.",
        learn: [
          "Hosts",
          "Ports",
          "Services",
          "Basic scanning",
          "Hosts — Core concepts and terminology",
          "Hosts — Common patterns and real-world use cases",
          "Hosts — Setup and project structure",
          "Hosts — Syntax, configuration and conventions",
          "Hosts — Input/output and data flow",
          "Hosts — Error handling and debugging",
          "Hosts — Best practices and maintainability",
          "Hosts — Performance considerations"
        ],
        practical: "Scan your own lab environment.",
        outcome: "Understand network enumeration.",
      },
      {
        title: "Burp Suite Fundamentals",
        overview: "Learn how web requests can be inspected in authorized environments.",
        learn: [
          "Proxy",
          "Requests",
          "Responses",
          "Repeater",
          "Proxy — Core concepts and terminology",
          "Proxy — Common patterns and real-world use cases",
          "Proxy — Setup and project structure",
          "Proxy — Syntax, configuration and conventions",
          "Proxy — Input/output and data flow",
          "Proxy — Error handling and debugging",
          "Proxy — Best practices and maintainability",
          "Proxy — Performance considerations"
        ],
        practical: "Analyze requests against a local lab.",
        outcome: "Understand web testing workflows.",
      },
      {
        title: "Security Labs",
        overview: "Apply concepts using intentionally vulnerable environments.",
        learn: [
          "Enumeration",
          "Analysis",
          "Documentation",
          "Enumeration — Core concepts and terminology",
          "Enumeration — Common patterns and real-world use cases",
          "Enumeration — Setup and project structure",
          "Enumeration — Syntax, configuration and conventions",
          "Enumeration — Input/output and data flow",
          "Enumeration — Error handling and debugging",
          "Enumeration — Best practices and maintainability",
          "Enumeration — Performance considerations",
          "Enumeration — Security and reliability considerations"
        ],
        practical: "Complete beginner security labs.",
        outcome: "Gain practical security experience.",
      },
      {
        title: "Security Portfolio Project",
        overview: "Document your cybersecurity learning in a professional project.",
        learn: [
          "Recon",
          "Analysis",
          "Reporting",
          "Remediation",
          "Recon — Core concepts and terminology",
          "Recon — Common patterns and real-world use cases",
          "Recon — Setup and project structure",
          "Recon — Syntax, configuration and conventions",
          "Recon — Input/output and data flow",
          "Recon — Error handling and debugging",
          "Recon — Best practices and maintainability",
          "Recon — Performance considerations"
        ],
        practical: "Create a security assessment report for your own lab.",
        outcome: "Build a cybersecurity portfolio project.",
      },
    ],

    Intermediate: [
      {
        title: "Advanced Linux",
        overview: "Improve Linux administration and security skills.",
        learn: [
          "Services",
          "Logs",
          "Permissions",
          "Processes",
          "Services — Core concepts and terminology",
          "Services — Common patterns and real-world use cases",
          "Services — Setup and project structure",
          "Services — Syntax, configuration and conventions",
          "Services — Input/output and data flow",
          "Services — Error handling and debugging",
          "Services — Best practices and maintainability",
          "Services — Performance considerations"
        ],
        practical: "Harden a Linux lab machine.",
        outcome: "Manage Linux systems securely.",
      },
      {
        title: "Network Security",
        overview: "Understand how networks are protected.",
        learn: [
          "Firewalls",
          "Segmentation",
          "IDS",
          "VPN",
          "Firewalls — Core concepts and terminology",
          "Firewalls — Common patterns and real-world use cases",
          "Firewalls — Setup and project structure",
          "Firewalls — Syntax, configuration and conventions",
          "Firewalls — Input/output and data flow",
          "Firewalls — Error handling and debugging",
          "Firewalls — Best practices and maintainability",
          "Firewalls — Performance considerations"
        ],
        practical: "Design a secure lab network.",
        outcome: "Understand network defense.",
      },
      {
        title: "Web Application Security",
        overview: "Study common web application vulnerabilities.",
        learn: [
          "OWASP concepts",
          "Authentication",
          "Access control",
          "OWASP concepts — Core concepts and terminology",
          "OWASP concepts — Common patterns and real-world use cases",
          "OWASP concepts — Setup and project structure",
          "OWASP concepts — Syntax, configuration and conventions",
          "OWASP concepts — Input/output and data flow",
          "OWASP concepts — Error handling and debugging",
          "OWASP concepts — Best practices and maintainability",
          "OWASP concepts — Performance considerations",
          "OWASP concepts — Security and reliability considerations"
        ],
        practical: "Practice on legal vulnerable labs.",
        outcome: "Develop web security testing skills.",
      },
      {
        title: "Enumeration",
        overview: "Learn systematic information gathering in authorized environments.",
        learn: [
          "Services",
          "Directories",
          "Technology identification",
          "Services — Core concepts and terminology",
          "Services — Common patterns and real-world use cases",
          "Services — Setup and project structure",
          "Services — Syntax, configuration and conventions",
          "Services — Input/output and data flow",
          "Services — Error handling and debugging",
          "Services — Best practices and maintainability",
          "Services — Performance considerations",
          "Services — Security and reliability considerations"
        ],
        practical: "Enumerate a local lab target.",
        outcome: "Improve assessment methodology.",
      },
      {
        title: "Privilege Management",
        overview: "Understand privilege and access control.",
        learn: [
          "Users",
          "Groups",
          "Permissions",
          "Sudo",
          "Users — Core concepts and terminology",
          "Users — Common patterns and real-world use cases",
          "Users — Setup and project structure",
          "Users — Syntax, configuration and conventions",
          "Users — Input/output and data flow",
          "Users — Error handling and debugging",
          "Users — Best practices and maintainability",
          "Users — Performance considerations"
        ],
        practical: "Audit permissions in a lab.",
        outcome: "Understand privilege boundaries.",
      },
      {
        title: "Active Directory Fundamentals",
        overview: "Understand enterprise identity environments.",
        learn: [
          "Domains",
          "Users",
          "Groups",
          "Policies",
          "Domains — Core concepts and terminology",
          "Domains — Common patterns and real-world use cases",
          "Domains — Setup and project structure",
          "Domains — Syntax, configuration and conventions",
          "Domains — Input/output and data flow",
          "Domains — Error handling and debugging",
          "Domains — Best practices and maintainability",
          "Domains — Performance considerations"
        ],
        practical: "Create an AD lab.",
        outcome: "Understand enterprise identity systems.",
      },
      {
        title: "Security Monitoring",
        overview: "Learn how suspicious activity can be detected.",
        learn: [
          "Logs",
          "Events",
          "Indicators",
          "Monitoring",
          "Logs — Core concepts and terminology",
          "Logs — Common patterns and real-world use cases",
          "Logs — Setup and project structure",
          "Logs — Syntax, configuration and conventions",
          "Logs — Input/output and data flow",
          "Logs — Error handling and debugging",
          "Logs — Best practices and maintainability",
          "Logs — Performance considerations"
        ],
        practical: "Analyze logs from a lab.",
        outcome: "Understand detection workflows.",
      },
      {
        title: "Vulnerability Assessment",
        overview: "Learn how vulnerabilities are identified and documented.",
        learn: [
          "Scanning",
          "Validation",
          "Risk rating",
          "Scanning — Core concepts and terminology",
          "Scanning — Common patterns and real-world use cases",
          "Scanning — Setup and project structure",
          "Scanning — Syntax, configuration and conventions",
          "Scanning — Input/output and data flow",
          "Scanning — Error handling and debugging",
          "Scanning — Best practices and maintainability",
          "Scanning — Performance considerations",
          "Scanning — Security and reliability considerations"
        ],
        practical: "Perform an authorized lab assessment.",
        outcome: "Create structured vulnerability reports.",
      },
      {
        title: "Security Automation",
        overview: "Use scripting to automate repetitive security tasks.",
        learn: [
          "Python",
          "Bash",
          "Automation",
          "Python — Core concepts and terminology",
          "Python — Common patterns and real-world use cases",
          "Python — Setup and project structure",
          "Python — Syntax, configuration and conventions",
          "Python — Input/output and data flow",
          "Python — Error handling and debugging",
          "Python — Best practices and maintainability",
          "Python — Performance considerations",
          "Python — Security and reliability considerations"
        ],
        practical: "Create a basic security automation script.",
        outcome: "Improve security workflow efficiency.",
      },
      {
        title: "Professional Security Report",
        overview: "Learn how to document technical findings professionally.",
        learn: [
          "Evidence",
          "Impact",
          "Risk",
          "Remediation",
          "Evidence — Core concepts and terminology",
          "Evidence — Common patterns and real-world use cases",
          "Evidence — Setup and project structure",
          "Evidence — Syntax, configuration and conventions",
          "Evidence — Input/output and data flow",
          "Evidence — Error handling and debugging",
          "Evidence — Best practices and maintainability",
          "Evidence — Performance considerations"
        ],
        practical: "Create a complete lab security report.",
        outcome: "Develop professional reporting skills.",
      },
    ],

    Advanced: [
      {
        title: "Advanced Network Security",
        overview: "Study enterprise network security architecture.",
        learn: [
          "Segmentation",
          "Firewalls",
          "Monitoring",
          "Segmentation — Core concepts and terminology",
          "Segmentation — Common patterns and real-world use cases",
          "Segmentation — Setup and project structure",
          "Segmentation — Syntax, configuration and conventions",
          "Segmentation — Input/output and data flow",
          "Segmentation — Error handling and debugging",
          "Segmentation — Best practices and maintainability",
          "Segmentation — Performance considerations",
          "Segmentation — Security and reliability considerations"
        ],
        practical: "Design a secure enterprise lab.",
        outcome: "Understand advanced network defense.",
      },
      {
        title: "Advanced Web Security",
        overview: "Study complex web application security issues.",
        learn: [
          "Access control",
          "API security",
          "Business logic",
          "Access control — Core concepts and terminology",
          "Access control — Common patterns and real-world use cases",
          "Access control — Setup and project structure",
          "Access control — Syntax, configuration and conventions",
          "Access control — Input/output and data flow",
          "Access control — Error handling and debugging",
          "Access control — Best practices and maintainability",
          "Access control — Performance considerations",
          "Access control — Security and reliability considerations"
        ],
        practical: "Assess intentionally vulnerable applications.",
        outcome: "Develop advanced web assessment skills.",
      },
      {
        title: "Active Directory Security",
        overview: "Understand enterprise identity security.",
        learn: [
          "Trusts",
          "Policies",
          "Delegation",
          "Security controls",
          "Trusts — Core concepts and terminology",
          "Trusts — Common patterns and real-world use cases",
          "Trusts — Setup and project structure",
          "Trusts — Syntax, configuration and conventions",
          "Trusts — Input/output and data flow",
          "Trusts — Error handling and debugging",
          "Trusts — Best practices and maintainability",
          "Trusts — Performance considerations"
        ],
        practical: "Build and audit an AD lab.",
        outcome: "Understand AD security architecture.",
      },
      {
        title: "Cloud Security",
        overview: "Learn security concepts for cloud environments.",
        learn: [
          "IAM",
          "Networks",
          "Storage",
          "Logging",
          "IAM — Core concepts and terminology",
          "IAM — Common patterns and real-world use cases",
          "IAM — Setup and project structure",
          "IAM — Syntax, configuration and conventions",
          "IAM — Input/output and data flow",
          "IAM — Error handling and debugging",
          "IAM — Best practices and maintainability",
          "IAM — Performance considerations"
        ],
        practical: "Design a secure cloud lab environment.",
        outcome: "Understand cloud security fundamentals.",
      },
      {
        title: "Threat Detection",
        overview: "Learn how attacks can be detected and investigated.",
        learn: [
          "Indicators",
          "Logs",
          "Detection rules",
          "Indicators — Core concepts and terminology",
          "Indicators — Common patterns and real-world use cases",
          "Indicators — Setup and project structure",
          "Indicators — Syntax, configuration and conventions",
          "Indicators — Input/output and data flow",
          "Indicators — Error handling and debugging",
          "Indicators — Best practices and maintainability",
          "Indicators — Performance considerations",
          "Indicators — Security and reliability considerations"
        ],
        practical: "Analyze simulated security events.",
        outcome: "Understand threat detection workflows.",
      },
      {
        title: "Incident Response",
        overview: "Learn how security incidents are investigated and handled.",
        learn: [
          "Containment",
          "Evidence",
          "Recovery",
          "Containment — Core concepts and terminology",
          "Containment — Common patterns and real-world use cases",
          "Containment — Setup and project structure",
          "Containment — Syntax, configuration and conventions",
          "Containment — Input/output and data flow",
          "Containment — Error handling and debugging",
          "Containment — Best practices and maintainability",
          "Containment — Performance considerations",
          "Containment — Security and reliability considerations"
        ],
        practical: "Perform a simulated incident investigation.",
        outcome: "Understand incident response.",
      },
      {
        title: "Security Automation",
        overview: "Automate security analysis and repetitive tasks.",
        learn: [
          "Python",
          "APIs",
          "Automation",
          "Python — Core concepts and terminology",
          "Python — Common patterns and real-world use cases",
          "Python — Setup and project structure",
          "Python — Syntax, configuration and conventions",
          "Python — Input/output and data flow",
          "Python — Error handling and debugging",
          "Python — Best practices and maintainability",
          "Python — Performance considerations",
          "Python — Security and reliability considerations"
        ],
        practical: "Build a security automation tool.",
        outcome: "Automate security workflows.",
      },
      {
        title: "Security Architecture",
        overview: "Design security controls for complex systems.",
        learn: [
          "Defense in depth",
          "Zero trust",
          "Segmentation",
          "Defense in depth — Core concepts and terminology",
          "Defense in depth — Common patterns and real-world use cases",
          "Defense in depth — Setup and project structure",
          "Defense in depth — Syntax, configuration and conventions",
          "Defense in depth — Input/output and data flow",
          "Defense in depth — Error handling and debugging",
          "Defense in depth — Best practices and maintainability",
          "Defense in depth — Performance considerations",
          "Defense in depth — Security and reliability considerations"
        ],
        practical: "Design a secure application architecture.",
        outcome: "Understand security architecture.",
      },
      {
        title: "Security Assessment",
        overview: "Perform structured security assessments in authorized environments.",
        learn: [
          "Planning",
          "Testing",
          "Evidence",
          "Reporting",
          "Planning — Core concepts and terminology",
          "Planning — Common patterns and real-world use cases",
          "Planning — Setup and project structure",
          "Planning — Syntax, configuration and conventions",
          "Planning — Input/output and data flow",
          "Planning — Error handling and debugging",
          "Planning — Best practices and maintainability",
          "Planning — Performance considerations"
        ],
        practical: "Perform an end-to-end lab assessment.",
        outcome: "Develop professional assessment skills.",
      },
      {
        title: "Advanced Security Portfolio",
        overview: "Combine technical and reporting skills into a professional project.",
        learn: [
          "Assessment",
          "Evidence",
          "Risk",
          "Remediation",
          "Assessment — Core concepts and terminology",
          "Assessment — Common patterns and real-world use cases",
          "Assessment — Setup and project structure",
          "Assessment — Syntax, configuration and conventions",
          "Assessment — Input/output and data flow",
          "Assessment — Error handling and debugging",
          "Assessment — Best practices and maintainability",
          "Assessment — Performance considerations"
        ],
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
        learn: [
          "IaaS",
          "PaaS",
          "SaaS",
          "Cloud models",
          "IaaS — Core concepts and terminology",
          "IaaS — Common patterns and real-world use cases",
          "IaaS — Setup and project structure",
          "IaaS — Syntax, configuration and conventions",
          "IaaS — Input/output and data flow",
          "IaaS — Error handling and debugging",
          "IaaS — Best practices and maintainability",
          "IaaS — Performance considerations"
        ],
        practical: "Create a basic cloud account and explore services.",
        outcome: "Understand cloud computing concepts.",
      },
      {
        title: "Linux for Cloud",
        overview: "Learn Linux administration required for cloud environments.",
        learn: [
          "Commands",
          "Services",
          "Permissions",
          "Commands — Core concepts and terminology",
          "Commands — Common patterns and real-world use cases",
          "Commands — Setup and project structure",
          "Commands — Syntax, configuration and conventions",
          "Commands — Input/output and data flow",
          "Commands — Error handling and debugging",
          "Commands — Best practices and maintainability",
          "Commands — Performance considerations",
          "Commands — Security and reliability considerations"
        ],
        practical: "Configure a Linux server.",
        outcome: "Manage basic cloud servers.",
      },
      {
        title: "Networking",
        overview: "Understand networking in cloud environments.",
        learn: [
          "IP",
          "Subnets",
          "DNS",
          "Ports",
          "IP — Core concepts and terminology",
          "IP — Common patterns and real-world use cases",
          "IP — Setup and project structure",
          "IP — Syntax, configuration and conventions",
          "IP — Input/output and data flow",
          "IP — Error handling and debugging",
          "IP — Best practices and maintainability",
          "IP — Performance considerations"
        ],
        practical: "Create a simple cloud network.",
        outcome: "Understand cloud networking.",
      },
      {
        title: "Virtual Machines",
        overview: "Learn how virtual machines are created and managed.",
        learn: [
          "Instances",
          "Images",
          "Storage",
          "Instances — Core concepts and terminology",
          "Instances — Common patterns and real-world use cases",
          "Instances — Setup and project structure",
          "Instances — Syntax, configuration and conventions",
          "Instances — Input/output and data flow",
          "Instances — Error handling and debugging",
          "Instances — Best practices and maintainability",
          "Instances — Performance considerations",
          "Instances — Security and reliability considerations"
        ],
        practical: "Deploy a virtual machine.",
        outcome: "Manage basic cloud compute resources.",
      },
      {
        title: "Cloud Storage",
        overview: "Understand cloud-based data storage.",
        learn: [
          "Objects",
          "Buckets",
          "Permissions",
          "Objects — Core concepts and terminology",
          "Objects — Common patterns and real-world use cases",
          "Objects — Setup and project structure",
          "Objects — Syntax, configuration and conventions",
          "Objects — Input/output and data flow",
          "Objects — Error handling and debugging",
          "Objects — Best practices and maintainability",
          "Objects — Performance considerations",
          "Objects — Security and reliability considerations"
        ],
        practical: "Create and secure cloud storage.",
        outcome: "Understand cloud storage.",
      },
      {
        title: "Databases",
        overview: "Learn managed database services.",
        learn: [
          "SQL",
          "NoSQL",
          "Managed databases",
          "SQL — Core concepts and terminology",
          "SQL — Common patterns and real-world use cases",
          "SQL — Setup and project structure",
          "SQL — Syntax, configuration and conventions",
          "SQL — Input/output and data flow",
          "SQL — Error handling and debugging",
          "SQL — Best practices and maintainability",
          "SQL — Performance considerations",
          "SQL — Security and reliability considerations"
        ],
        practical: "Create a cloud database.",
        outcome: "Use managed cloud databases.",
      },
      {
        title: "IAM",
        overview: "Understand identity and access management.",
        learn: [
          "Users",
          "Roles",
          "Policies",
          "Users — Core concepts and terminology",
          "Users — Common patterns and real-world use cases",
          "Users — Setup and project structure",
          "Users — Syntax, configuration and conventions",
          "Users — Input/output and data flow",
          "Users — Error handling and debugging",
          "Users — Best practices and maintainability",
          "Users — Performance considerations",
          "Users — Security and reliability considerations"
        ],
        practical: "Create least-privilege access.",
        outcome: "Understand cloud identity security.",
      },
      {
        title: "Containers",
        overview: "Learn the basics of application containers.",
        learn: [
          "Images",
          "Containers",
          "Docker",
          "Images — Core concepts and terminology",
          "Images — Common patterns and real-world use cases",
          "Images — Setup and project structure",
          "Images — Syntax, configuration and conventions",
          "Images — Input/output and data flow",
          "Images — Error handling and debugging",
          "Images — Best practices and maintainability",
          "Images — Performance considerations",
          "Images — Security and reliability considerations"
        ],
        practical: "Containerize a small application.",
        outcome: "Understand container deployment.",
      },
      {
        title: "Cloud Monitoring",
        overview: "Learn how cloud resources are monitored.",
        learn: [
          "Metrics",
          "Logs",
          "Alerts",
          "Metrics — Core concepts and terminology",
          "Metrics — Common patterns and real-world use cases",
          "Metrics — Setup and project structure",
          "Metrics — Syntax, configuration and conventions",
          "Metrics — Input/output and data flow",
          "Metrics — Error handling and debugging",
          "Metrics — Best practices and maintainability",
          "Metrics — Performance considerations",
          "Metrics — Security and reliability considerations"
        ],
        practical: "Create basic monitoring alerts.",
        outcome: "Understand cloud monitoring.",
      },
      {
        title: "Deploy a Cloud Project",
        overview: "Combine your cloud skills into one project.",
        learn: [
          "Compute",
          "Networking",
          "Storage",
          "Deployment",
          "Compute — Core concepts and terminology",
          "Compute — Common patterns and real-world use cases",
          "Compute — Setup and project structure",
          "Compute — Syntax, configuration and conventions",
          "Compute — Input/output and data flow",
          "Compute — Error handling and debugging",
          "Compute — Best practices and maintainability",
          "Compute — Performance considerations"
        ],
        practical: "Deploy a complete web application.",
        outcome: "Build a cloud portfolio project.",
      },
    ],

    Intermediate: [
      {
        title: "Cloud Architecture",
        overview: "Design scalable cloud architectures.",
        learn: [
          "Architecture",
          "Availability",
          "Scalability",
          "Architecture — Core concepts and terminology",
          "Architecture — Common patterns and real-world use cases",
          "Architecture — Setup and project structure",
          "Architecture — Syntax, configuration and conventions",
          "Architecture — Input/output and data flow",
          "Architecture — Error handling and debugging",
          "Architecture — Best practices and maintainability",
          "Architecture — Performance considerations",
          "Architecture — Security and reliability considerations"
        ],
        practical: "Design a scalable cloud application.",
        outcome: "Understand cloud architecture.",
      },
      {
        title: "Advanced Networking",
        overview: "Learn advanced cloud networking.",
        learn: [
          "VPC",
          "Routing",
          "Security groups",
          "VPC — Core concepts and terminology",
          "VPC — Common patterns and real-world use cases",
          "VPC — Setup and project structure",
          "VPC — Syntax, configuration and conventions",
          "VPC — Input/output and data flow",
          "VPC — Error handling and debugging",
          "VPC — Best practices and maintainability",
          "VPC — Performance considerations",
          "VPC — Security and reliability considerations"
        ],
        practical: "Build a segmented cloud network.",
        outcome: "Design secure cloud networks.",
      },
      {
        title: "Infrastructure as Code",
        overview: "Automate infrastructure provisioning.",
        learn: [
          "Terraform concepts",
          "Configuration",
          "State",
          "Terraform concepts — Core concepts and terminology",
          "Terraform concepts — Common patterns and real-world use cases",
          "Terraform concepts — Setup and project structure",
          "Terraform concepts — Syntax, configuration and conventions",
          "Terraform concepts — Input/output and data flow",
          "Terraform concepts — Error handling and debugging",
          "Terraform concepts — Best practices and maintainability",
          "Terraform concepts — Performance considerations",
          "Terraform concepts — Security and reliability considerations"
        ],
        practical: "Provision cloud infrastructure using IaC.",
        outcome: "Automate infrastructure.",
      },
      {
        title: "Docker",
        overview: "Learn production container workflows.",
        learn: [
          "Images",
          "Volumes",
          "Networks",
          "Images — Core concepts and terminology",
          "Images — Common patterns and real-world use cases",
          "Images — Setup and project structure",
          "Images — Syntax, configuration and conventions",
          "Images — Input/output and data flow",
          "Images — Error handling and debugging",
          "Images — Best practices and maintainability",
          "Images — Performance considerations",
          "Images — Security and reliability considerations"
        ],
        practical: "Containerize a multi-service application.",
        outcome: "Build containerized applications.",
      },
      {
        title: "Kubernetes Fundamentals",
        overview: "Understand container orchestration.",
        learn: [
          "Pods",
          "Services",
          "Deployments",
          "Pods — Core concepts and terminology",
          "Pods — Common patterns and real-world use cases",
          "Pods — Setup and project structure",
          "Pods — Syntax, configuration and conventions",
          "Pods — Input/output and data flow",
          "Pods — Error handling and debugging",
          "Pods — Best practices and maintainability",
          "Pods — Performance considerations",
          "Pods — Security and reliability considerations"
        ],
        practical: "Deploy an application to a local cluster.",
        outcome: "Understand Kubernetes.",
      },
      {
        title: "Cloud Security",
        overview: "Protect cloud resources and identities.",
        learn: [
          "IAM",
          "Encryption",
          "Security monitoring",
          "IAM — Core concepts and terminology",
          "IAM — Common patterns and real-world use cases",
          "IAM — Setup and project structure",
          "IAM — Syntax, configuration and conventions",
          "IAM — Input/output and data flow",
          "IAM — Error handling and debugging",
          "IAM — Best practices and maintainability",
          "IAM — Performance considerations",
          "IAM — Security and reliability considerations"
        ],
        practical: "Perform a cloud security review.",
        outcome: "Understand cloud security.",
      },
      {
        title: "Serverless",
        overview: "Learn event-driven application architecture.",
        learn: [
          "Functions",
          "Events",
          "APIs",
          "Functions — Core concepts and terminology",
          "Functions — Common patterns and real-world use cases",
          "Functions — Setup and project structure",
          "Functions — Syntax, configuration and conventions",
          "Functions — Input/output and data flow",
          "Functions — Error handling and debugging",
          "Functions — Best practices and maintainability",
          "Functions — Performance considerations",
          "Functions — Security and reliability considerations"
        ],
        practical: "Build a serverless API.",
        outcome: "Understand serverless applications.",
      },
      {
        title: "CI/CD",
        overview: "Automate cloud application delivery.",
        learn: [
          "Pipelines",
          "Testing",
          "Deployment",
          "Pipelines — Core concepts and terminology",
          "Pipelines — Common patterns and real-world use cases",
          "Pipelines — Setup and project structure",
          "Pipelines — Syntax, configuration and conventions",
          "Pipelines — Input/output and data flow",
          "Pipelines — Error handling and debugging",
          "Pipelines — Best practices and maintainability",
          "Pipelines — Performance considerations",
          "Pipelines — Security and reliability considerations"
        ],
        practical: "Create a deployment pipeline.",
        outcome: "Automate cloud deployments.",
      },
      {
        title: "Monitoring",
        overview: "Monitor production cloud systems.",
        learn: [
          "Logs",
          "Metrics",
          "Alerts",
          "Logs — Core concepts and terminology",
          "Logs — Common patterns and real-world use cases",
          "Logs — Setup and project structure",
          "Logs — Syntax, configuration and conventions",
          "Logs — Input/output and data flow",
          "Logs — Error handling and debugging",
          "Logs — Best practices and maintainability",
          "Logs — Performance considerations",
          "Logs — Security and reliability considerations"
        ],
        practical: "Create a monitoring dashboard.",
        outcome: "Operate cloud applications.",
      },
      {
        title: "Production Cloud Project",
        overview: "Build a complete cloud-based system.",
        learn: [
          "Architecture",
          "Security",
          "Deployment",
          "Architecture — Core concepts and terminology",
          "Architecture — Common patterns and real-world use cases",
          "Architecture — Setup and project structure",
          "Architecture — Syntax, configuration and conventions",
          "Architecture — Input/output and data flow",
          "Architecture — Error handling and debugging",
          "Architecture — Best practices and maintainability",
          "Architecture — Performance considerations",
          "Architecture — Security and reliability considerations"
        ],
        practical: "Deploy a production-style application.",
        outcome: "Create a cloud portfolio project.",
      },
    ],

    Advanced: [
      {
        title: "Advanced Cloud Architecture",
        overview: "Design enterprise-grade cloud systems.",
        learn: [
          "Scalability",
          "Reliability",
          "Architecture",
          "Scalability — Core concepts and terminology",
          "Scalability — Common patterns and real-world use cases",
          "Scalability — Setup and project structure",
          "Scalability — Syntax, configuration and conventions",
          "Scalability — Input/output and data flow",
          "Scalability — Error handling and debugging",
          "Scalability — Best practices and maintainability",
          "Scalability — Performance considerations",
          "Scalability — Security and reliability considerations"
        ],
        practical: "Design a highly available application.",
        outcome: "Understand advanced architecture.",
      },
      {
        title: "Multi-Region Systems",
        overview: "Design systems that operate across multiple regions.",
        learn: [
          "Replication",
          "Failover",
          "Latency",
          "Replication — Core concepts and terminology",
          "Replication — Common patterns and real-world use cases",
          "Replication — Setup and project structure",
          "Replication — Syntax, configuration and conventions",
          "Replication — Input/output and data flow",
          "Replication — Error handling and debugging",
          "Replication — Best practices and maintainability",
          "Replication — Performance considerations",
          "Replication — Security and reliability considerations"
        ],
        practical: "Design a multi-region architecture.",
        outcome: "Understand global cloud systems.",
      },
      {
        title: "Kubernetes Architecture",
        overview: "Understand advanced Kubernetes concepts.",
        learn: [
          "Clusters",
          "Networking",
          "Scaling",
          "Clusters — Core concepts and terminology",
          "Clusters — Common patterns and real-world use cases",
          "Clusters — Setup and project structure",
          "Clusters — Syntax, configuration and conventions",
          "Clusters — Input/output and data flow",
          "Clusters — Error handling and debugging",
          "Clusters — Best practices and maintainability",
          "Clusters — Performance considerations",
          "Clusters — Security and reliability considerations"
        ],
        practical: "Design a Kubernetes architecture.",
        outcome: "Understand container orchestration.",
      },
      {
        title: "Cloud Security Architecture",
        overview: "Design security controls for cloud systems.",
        learn: [
          "IAM",
          "Network security",
          "Encryption",
          "IAM — Core concepts and terminology",
          "IAM — Common patterns and real-world use cases",
          "IAM — Setup and project structure",
          "IAM — Syntax, configuration and conventions",
          "IAM — Input/output and data flow",
          "IAM — Error handling and debugging",
          "IAM — Best practices and maintainability",
          "IAM — Performance considerations",
          "IAM — Security and reliability considerations"
        ],
        practical: "Design a secure cloud environment.",
        outcome: "Build secure cloud architectures.",
      },
      {
        title: "Infrastructure Automation",
        overview: "Automate infrastructure at scale.",
        learn: [
          "IaC",
          "Modules",
          "Automation",
          "IaC — Core concepts and terminology",
          "IaC — Common patterns and real-world use cases",
          "IaC — Setup and project structure",
          "IaC — Syntax, configuration and conventions",
          "IaC — Input/output and data flow",
          "IaC — Error handling and debugging",
          "IaC — Best practices and maintainability",
          "IaC — Performance considerations",
          "IaC — Security and reliability considerations"
        ],
        practical: "Automate a complete environment.",
        outcome: "Manage infrastructure programmatically.",
      },
      {
        title: "Serverless Architecture",
        overview: "Design scalable event-driven systems.",
        learn: [
          "Events",
          "Functions",
          "Queues",
          "Events — Core concepts and terminology",
          "Events — Common patterns and real-world use cases",
          "Events — Setup and project structure",
          "Events — Syntax, configuration and conventions",
          "Events — Input/output and data flow",
          "Events — Error handling and debugging",
          "Events — Best practices and maintainability",
          "Events — Performance considerations",
          "Events — Security and reliability considerations"
        ],
        practical: "Design a serverless platform.",
        outcome: "Understand event-driven architecture.",
      },
      {
        title: "Cloud Observability",
        overview: "Monitor and analyze complex cloud systems.",
        learn: [
          "Logs",
          "Metrics",
          "Tracing",
          "Logs — Core concepts and terminology",
          "Logs — Common patterns and real-world use cases",
          "Logs — Setup and project structure",
          "Logs — Syntax, configuration and conventions",
          "Logs — Input/output and data flow",
          "Logs — Error handling and debugging",
          "Logs — Best practices and maintainability",
          "Logs — Performance considerations",
          "Logs — Security and reliability considerations"
        ],
        practical: "Build an observability dashboard.",
        outcome: "Understand production observability.",
      },
      {
        title: "Cloud Cost Optimization",
        overview: "Optimize cloud infrastructure and resource usage.",
        learn: [
          "Resource management",
          "Scaling",
          "Cost analysis",
          "Resource management — Core concepts and terminology",
          "Resource management — Common patterns and real-world use cases",
          "Resource management — Setup and project structure",
          "Resource management — Syntax, configuration and conventions",
          "Resource management — Input/output and data flow",
          "Resource management — Error handling and debugging",
          "Resource management — Best practices and maintainability",
          "Resource management — Performance considerations",
          "Resource management — Security and reliability considerations"
        ],
        practical: "Optimize a sample cloud environment.",
        outcome: "Understand cloud cost management.",
      },
      {
        title: "Disaster Recovery",
        overview: "Design systems capable of recovering from failures.",
        learn: [
          "Backups",
          "Failover",
          "Recovery",
          "Backups — Core concepts and terminology",
          "Backups — Common patterns and real-world use cases",
          "Backups — Setup and project structure",
          "Backups — Syntax, configuration and conventions",
          "Backups — Input/output and data flow",
          "Backups — Error handling and debugging",
          "Backups — Best practices and maintainability",
          "Backups — Performance considerations",
          "Backups — Security and reliability considerations"
        ],
        practical: "Create a disaster recovery plan.",
        outcome: "Understand resilience planning.",
      },
      {
        title: "Enterprise Cloud Project",
        overview: "Combine advanced cloud concepts into one system.",
        learn: [
          "Architecture",
          "Security",
          "Automation",
          "Monitoring",
          "Architecture — Core concepts and terminology",
          "Architecture — Common patterns and real-world use cases",
          "Architecture — Setup and project structure",
          "Architecture — Syntax, configuration and conventions",
          "Architecture — Input/output and data flow",
          "Architecture — Error handling and debugging",
          "Architecture — Best practices and maintainability",
          "Architecture — Performance considerations"
        ],
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
        learn: [
          "Variables",
          "Functions",
          "Loops",
          "Collections",
          "Variables — Core concepts and terminology",
          "Variables — Common patterns and real-world use cases",
          "Variables — Setup and project structure",
          "Variables — Syntax, configuration and conventions",
          "Variables — Input/output and data flow",
          "Variables — Error handling and debugging",
          "Variables — Best practices and maintainability",
          "Variables — Performance considerations"
        ],
        practical: "Solve beginner Python exercises.",
        outcome: "Build Python programming fundamentals.",
      },
      {
        title: "NumPy",
        overview: "Learn numerical computing with Python.",
        learn: [
          "Arrays",
          "Operations",
          "Indexing",
          "Arrays — Core concepts and terminology",
          "Arrays — Common patterns and real-world use cases",
          "Arrays — Setup and project structure",
          "Arrays — Syntax, configuration and conventions",
          "Arrays — Input/output and data flow",
          "Arrays — Error handling and debugging",
          "Arrays — Best practices and maintainability",
          "Arrays — Performance considerations",
          "Arrays — Security and reliability considerations"
        ],
        practical: "Perform numerical analysis using NumPy.",
        outcome: "Work with numerical datasets.",
      },
      {
        title: "Pandas",
        overview: "Learn how to manipulate and analyze data.",
        learn: [
          "DataFrames",
          "Filtering",
          "Grouping",
          "Cleaning",
          "DataFrames — Core concepts and terminology",
          "DataFrames — Common patterns and real-world use cases",
          "DataFrames — Setup and project structure",
          "DataFrames — Syntax, configuration and conventions",
          "DataFrames — Input/output and data flow",
          "DataFrames — Error handling and debugging",
          "DataFrames — Best practices and maintainability",
          "DataFrames — Performance considerations"
        ],
        practical: "Analyze a real dataset.",
        outcome: "Perform basic data analysis.",
      },
      {
        title: "Data Visualization",
        overview: "Learn how to communicate insights visually.",
        learn: [
          "Charts",
          "Plots",
          "Dashboards",
          "Charts — Core concepts and terminology",
          "Charts — Common patterns and real-world use cases",
          "Charts — Setup and project structure",
          "Charts — Syntax, configuration and conventions",
          "Charts — Input/output and data flow",
          "Charts — Error handling and debugging",
          "Charts — Best practices and maintainability",
          "Charts — Performance considerations",
          "Charts — Security and reliability considerations"
        ],
        practical: "Create a data visualization report.",
        outcome: "Communicate data insights.",
      },
      {
        title: "Statistics",
        overview: "Understand statistical concepts used in data science.",
        learn: [
          "Mean",
          "Median",
          "Probability",
          "Distribution",
          "Mean — Core concepts and terminology",
          "Mean — Common patterns and real-world use cases",
          "Mean — Setup and project structure",
          "Mean — Syntax, configuration and conventions",
          "Mean — Input/output and data flow",
          "Mean — Error handling and debugging",
          "Mean — Best practices and maintainability",
          "Mean — Performance considerations"
        ],
        practical: "Analyze a dataset statistically.",
        outcome: "Understand basic statistics.",
      },
      {
        title: "SQL",
        overview: "Learn how to retrieve and analyze structured data.",
        learn: [
          "SELECT",
          "JOIN",
          "GROUP BY",
          "Filtering",
          "SELECT — Core concepts and terminology",
          "SELECT — Common patterns and real-world use cases",
          "SELECT — Setup and project structure",
          "SELECT — Syntax, configuration and conventions",
          "SELECT — Input/output and data flow",
          "SELECT — Error handling and debugging",
          "SELECT — Best practices and maintainability",
          "SELECT — Performance considerations"
        ],
        practical: "Analyze a sample database.",
        outcome: "Query databases confidently.",
      },
      {
        title: "Data Cleaning",
        overview: "Learn how to prepare raw data for analysis.",
        learn: [
          "Missing data",
          "Duplicates",
          "Formatting",
          "Missing data — Core concepts and terminology",
          "Missing data — Common patterns and real-world use cases",
          "Missing data — Setup and project structure",
          "Missing data — Syntax, configuration and conventions",
          "Missing data — Input/output and data flow",
          "Missing data — Error handling and debugging",
          "Missing data — Best practices and maintainability",
          "Missing data — Performance considerations",
          "Missing data — Security and reliability considerations"
        ],
        practical: "Clean a messy dataset.",
        outcome: "Prepare datasets for analysis.",
      },
      {
        title: "Exploratory Data Analysis",
        overview: "Discover patterns and relationships in data.",
        learn: [
          "EDA",
          "Correlations",
          "Patterns",
          "EDA — Core concepts and terminology",
          "EDA — Common patterns and real-world use cases",
          "EDA — Setup and project structure",
          "EDA — Syntax, configuration and conventions",
          "EDA — Input/output and data flow",
          "EDA — Error handling and debugging",
          "EDA — Best practices and maintainability",
          "EDA — Performance considerations",
          "EDA — Security and reliability considerations"
        ],
        practical: "Perform EDA on a dataset.",
        outcome: "Extract meaningful insights.",
      },
      {
        title: "Machine Learning Basics",
        overview: "Understand fundamental machine learning concepts.",
        learn: [
          "Features",
          "Labels",
          "Training",
          "Testing",
          "Features — Core concepts and terminology",
          "Features — Common patterns and real-world use cases",
          "Features — Setup and project structure",
          "Features — Syntax, configuration and conventions",
          "Features — Input/output and data flow",
          "Features — Error handling and debugging",
          "Features — Best practices and maintainability",
          "Features — Performance considerations"
        ],
        practical: "Build a simple ML model.",
        outcome: "Understand ML fundamentals.",
      },
      {
        title: "Data Science Project",
        overview: "Combine your skills into a complete project.",
        learn: [
          "Data collection",
          "Cleaning",
          "Analysis",
          "Visualization",
          "Data collection — Core concepts and terminology",
          "Data collection — Common patterns and real-world use cases",
          "Data collection — Setup and project structure",
          "Data collection — Syntax, configuration and conventions",
          "Data collection — Input/output and data flow",
          "Data collection — Error handling and debugging",
          "Data collection — Best practices and maintainability",
          "Data collection — Performance considerations"
        ],
        practical: "Create an end-to-end data project.",
        outcome: "Build a portfolio-ready project.",
      },
    ],

    Intermediate: [
      {
        title: "Advanced Python",
        overview: "Improve Python skills for data science.",
        learn: [
          "Functions",
          "Modules",
          "OOP",
          "Libraries",
          "Functions — Core concepts and terminology",
          "Functions — Common patterns and real-world use cases",
          "Functions — Setup and project structure",
          "Functions — Syntax, configuration and conventions",
          "Functions — Input/output and data flow",
          "Functions — Error handling and debugging",
          "Functions — Best practices and maintainability",
          "Functions — Performance considerations"
        ],
        practical: "Create a reusable data analysis package.",
        outcome: "Write maintainable Python code.",
      },
      {
        title: "Advanced Statistics",
        overview: "Develop stronger statistical reasoning.",
        learn: [
          "Hypothesis testing",
          "Confidence intervals",
          "Hypothesis testing — Core concepts and terminology",
          "Hypothesis testing — Common patterns and real-world use cases",
          "Hypothesis testing — Setup and project structure",
          "Hypothesis testing — Syntax, configuration and conventions",
          "Hypothesis testing — Input/output and data flow",
          "Hypothesis testing — Error handling and debugging",
          "Hypothesis testing — Best practices and maintainability",
          "Hypothesis testing — Performance considerations",
          "Hypothesis testing — Security and reliability considerations",
          "Hypothesis testing — Testing and validation"
        ],
        practical: "Perform statistical analysis.",
        outcome: "Make data-driven conclusions.",
      },
      {
        title: "Advanced SQL",
        overview: "Write complex analytical queries.",
        learn: [
          "CTEs",
          "Window functions",
          "Subqueries",
          "CTEs — Core concepts and terminology",
          "CTEs — Common patterns and real-world use cases",
          "CTEs — Setup and project structure",
          "CTEs — Syntax, configuration and conventions",
          "CTEs — Input/output and data flow",
          "CTEs — Error handling and debugging",
          "CTEs — Best practices and maintainability",
          "CTEs — Performance considerations",
          "CTEs — Security and reliability considerations"
        ],
        practical: "Analyze a large relational dataset.",
        outcome: "Perform advanced data analysis.",
      },
      {
        title: "Feature Engineering",
        overview: "Prepare better inputs for machine learning.",
        learn: [
          "Transformations",
          "Encoding",
          "Scaling",
          "Transformations — Core concepts and terminology",
          "Transformations — Common patterns and real-world use cases",
          "Transformations — Setup and project structure",
          "Transformations — Syntax, configuration and conventions",
          "Transformations — Input/output and data flow",
          "Transformations — Error handling and debugging",
          "Transformations — Best practices and maintainability",
          "Transformations — Performance considerations",
          "Transformations — Security and reliability considerations"
        ],
        practical: "Engineer features for an ML dataset.",
        outcome: "Prepare stronger ML datasets.",
      },
      {
        title: "Supervised Learning",
        overview: "Learn models that predict known outcomes.",
        learn: [
          "Regression",
          "Classification",
          "Evaluation",
          "Regression — Core concepts and terminology",
          "Regression — Common patterns and real-world use cases",
          "Regression — Setup and project structure",
          "Regression — Syntax, configuration and conventions",
          "Regression — Input/output and data flow",
          "Regression — Error handling and debugging",
          "Regression — Best practices and maintainability",
          "Regression — Performance considerations",
          "Regression — Security and reliability considerations"
        ],
        practical: "Build a prediction model.",
        outcome: "Build supervised ML models.",
      },
      {
        title: "Unsupervised Learning",
        overview: "Discover hidden patterns in data.",
        learn: [
          "Clustering",
          "Dimensionality reduction",
          "Clustering — Core concepts and terminology",
          "Clustering — Common patterns and real-world use cases",
          "Clustering — Setup and project structure",
          "Clustering — Syntax, configuration and conventions",
          "Clustering — Input/output and data flow",
          "Clustering — Error handling and debugging",
          "Clustering — Best practices and maintainability",
          "Clustering — Performance considerations",
          "Clustering — Security and reliability considerations",
          "Clustering — Testing and validation"
        ],
        practical: "Cluster a real dataset.",
        outcome: "Discover patterns without labels.",
      },
      {
        title: "Model Evaluation",
        overview: "Learn how to evaluate machine learning systems.",
        learn: [
          "Metrics",
          "Validation",
          "Overfitting",
          "Metrics — Core concepts and terminology",
          "Metrics — Common patterns and real-world use cases",
          "Metrics — Setup and project structure",
          "Metrics — Syntax, configuration and conventions",
          "Metrics — Input/output and data flow",
          "Metrics — Error handling and debugging",
          "Metrics — Best practices and maintainability",
          "Metrics — Performance considerations",
          "Metrics — Security and reliability considerations"
        ],
        practical: "Compare multiple models.",
        outcome: "Evaluate models properly.",
      },
      {
        title: "Data Pipelines",
        overview: "Understand how data moves through systems.",
        learn: [
          "ETL",
          "Data processing",
          "Automation",
          "ETL — Core concepts and terminology",
          "ETL — Common patterns and real-world use cases",
          "ETL — Setup and project structure",
          "ETL — Syntax, configuration and conventions",
          "ETL — Input/output and data flow",
          "ETL — Error handling and debugging",
          "ETL — Best practices and maintainability",
          "ETL — Performance considerations",
          "ETL — Security and reliability considerations"
        ],
        practical: "Build a simple data pipeline.",
        outcome: "Understand data workflows.",
      },
      {
        title: "Machine Learning Project",
        overview: "Build a complete ML solution.",
        learn: [
          "Data",
          "Features",
          "Model",
          "Evaluation",
          "Data — Core concepts and terminology",
          "Data — Common patterns and real-world use cases",
          "Data — Setup and project structure",
          "Data — Syntax, configuration and conventions",
          "Data — Input/output and data flow",
          "Data — Error handling and debugging",
          "Data — Best practices and maintainability",
          "Data — Performance considerations"
        ],
        practical: "Build an end-to-end ML project.",
        outcome: "Create a portfolio-ready ML system.",
      },
      {
        title: "Professional Data Portfolio",
        overview: "Present data projects professionally.",
        learn: [
          "Documentation",
          "Visualization",
          "Insights",
          "Documentation — Core concepts and terminology",
          "Documentation — Common patterns and real-world use cases",
          "Documentation — Setup and project structure",
          "Documentation — Syntax, configuration and conventions",
          "Documentation — Input/output and data flow",
          "Documentation — Error handling and debugging",
          "Documentation — Best practices and maintainability",
          "Documentation — Performance considerations",
          "Documentation — Security and reliability considerations"
        ],
        practical: "Create a complete portfolio project.",
        outcome: "Demonstrate practical data skills.",
      },
    ],

    Advanced: [
      {
        title: "Advanced Machine Learning",
        overview: "Study advanced machine learning techniques.",
        learn: [
          "Ensemble models",
          "Optimization",
          "Validation",
          "Ensemble models — Core concepts and terminology",
          "Ensemble models — Common patterns and real-world use cases",
          "Ensemble models — Setup and project structure",
          "Ensemble models — Syntax, configuration and conventions",
          "Ensemble models — Input/output and data flow",
          "Ensemble models — Error handling and debugging",
          "Ensemble models — Best practices and maintainability",
          "Ensemble models — Performance considerations",
          "Ensemble models — Security and reliability considerations"
        ],
        practical: "Build an advanced prediction system.",
        outcome: "Develop advanced ML skills.",
      },
      {
        title: "Deep Learning",
        overview: "Understand neural networks and deep learning.",
        learn: [
          "Neurons",
          "Layers",
          "Training",
          "Optimization",
          "Neurons — Core concepts and terminology",
          "Neurons — Common patterns and real-world use cases",
          "Neurons — Setup and project structure",
          "Neurons — Syntax, configuration and conventions",
          "Neurons — Input/output and data flow",
          "Neurons — Error handling and debugging",
          "Neurons — Best practices and maintainability",
          "Neurons — Performance considerations"
        ],
        practical: "Build a neural network project.",
        outcome: "Understand deep learning.",
      },
      {
        title: "Natural Language Processing",
        overview: "Work with text and language data.",
        learn: [
          "Text processing",
          "Embeddings",
          "Classification",
          "Text processing — Core concepts and terminology",
          "Text processing — Common patterns and real-world use cases",
          "Text processing — Setup and project structure",
          "Text processing — Syntax, configuration and conventions",
          "Text processing — Input/output and data flow",
          "Text processing — Error handling and debugging",
          "Text processing — Best practices and maintainability",
          "Text processing — Performance considerations",
          "Text processing — Security and reliability considerations"
        ],
        practical: "Build a text classification system.",
        outcome: "Work with NLP applications.",
      },
      {
        title: "Computer Vision",
        overview: "Analyze and understand images using ML.",
        learn: [
          "Images",
          "Features",
          "Classification",
          "Images — Core concepts and terminology",
          "Images — Common patterns and real-world use cases",
          "Images — Setup and project structure",
          "Images — Syntax, configuration and conventions",
          "Images — Input/output and data flow",
          "Images — Error handling and debugging",
          "Images — Best practices and maintainability",
          "Images — Performance considerations",
          "Images — Security and reliability considerations"
        ],
        practical: "Build an image classification project.",
        outcome: "Understand computer vision.",
      },
      {
        title: "MLOps",
        overview: "Learn how machine learning systems are deployed and maintained.",
        learn: [
          "Deployment",
          "Monitoring",
          "Pipelines",
          "Deployment — Core concepts and terminology",
          "Deployment — Common patterns and real-world use cases",
          "Deployment — Setup and project structure",
          "Deployment — Syntax, configuration and conventions",
          "Deployment — Input/output and data flow",
          "Deployment — Error handling and debugging",
          "Deployment — Best practices and maintainability",
          "Deployment — Performance considerations",
          "Deployment — Security and reliability considerations"
        ],
        practical: "Deploy a machine learning model.",
        outcome: "Understand production ML workflows.",
      },
      {
        title: "Model Optimization",
        overview: "Improve model performance and efficiency.",
        learn: [
          "Optimization",
          "Tuning",
          "Evaluation",
          "Optimization — Core concepts and terminology",
          "Optimization — Common patterns and real-world use cases",
          "Optimization — Setup and project structure",
          "Optimization — Syntax, configuration and conventions",
          "Optimization — Input/output and data flow",
          "Optimization — Error handling and debugging",
          "Optimization — Best practices and maintainability",
          "Optimization — Performance considerations",
          "Optimization — Security and reliability considerations"
        ],
        practical: "Optimize a machine learning model.",
        outcome: "Build efficient ML systems.",
      },
      {
        title: "Data Engineering",
        overview: "Understand large-scale data processing.",
        learn: [
          "Pipelines",
          "Storage",
          "Processing",
          "Pipelines — Core concepts and terminology",
          "Pipelines — Common patterns and real-world use cases",
          "Pipelines — Setup and project structure",
          "Pipelines — Syntax, configuration and conventions",
          "Pipelines — Input/output and data flow",
          "Pipelines — Error handling and debugging",
          "Pipelines — Best practices and maintainability",
          "Pipelines — Performance considerations",
          "Pipelines — Security and reliability considerations"
        ],
        practical: "Build a scalable data pipeline.",
        outcome: "Understand data engineering.",
      },
      {
        title: "Responsible AI",
        overview: "Understand responsible and reliable AI development.",
        learn: [
          "Bias",
          "Fairness",
          "Transparency",
          "Bias — Core concepts and terminology",
          "Bias — Common patterns and real-world use cases",
          "Bias — Setup and project structure",
          "Bias — Syntax, configuration and conventions",
          "Bias — Input/output and data flow",
          "Bias — Error handling and debugging",
          "Bias — Best practices and maintainability",
          "Bias — Performance considerations",
          "Bias — Security and reliability considerations"
        ],
        practical: "Analyze a model for potential bias.",
        outcome: "Build more responsible AI systems.",
      },
      {
        title: "Production ML",
        overview: "Build machine learning systems for real-world use.",
        learn: [
          "Serving",
          "Monitoring",
          "Scaling",
          "Serving — Core concepts and terminology",
          "Serving — Common patterns and real-world use cases",
          "Serving — Setup and project structure",
          "Serving — Syntax, configuration and conventions",
          "Serving — Input/output and data flow",
          "Serving — Error handling and debugging",
          "Serving — Best practices and maintainability",
          "Serving — Performance considerations",
          "Serving — Security and reliability considerations"
        ],
        practical: "Deploy a production-style ML model.",
        outcome: "Understand production ML.",
      },
      {
        title: "Advanced Data Science Project",
        overview: "Combine advanced data science skills.",
        learn: [
          "Data",
          "ML",
          "Deployment",
          "Monitoring",
          "Data — Core concepts and terminology",
          "Data — Common patterns and real-world use cases",
          "Data — Setup and project structure",
          "Data — Syntax, configuration and conventions",
          "Data — Input/output and data flow",
          "Data — Error handling and debugging",
          "Data — Best practices and maintainability",
          "Data — Performance considerations"
        ],
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
        learn: [
          "Python",
          "Functions",
          "Collections",
          "OOP",
          "Python — Core concepts and terminology",
          "Python — Common patterns and real-world use cases",
          "Python — Setup and project structure",
          "Python — Syntax, configuration and conventions",
          "Python — Input/output and data flow",
          "Python — Error handling and debugging",
          "Python — Best practices and maintainability",
          "Python — Performance considerations"
        ],
        practical: "Build Python mini projects.",
        outcome: "Develop programming foundations for AI.",
      },
      {
        title: "Mathematics for AI",
        overview: "Understand the mathematical concepts behind AI.",
        learn: [
          "Algebra",
          "Statistics",
          "Probability",
          "Algebra — Core concepts and terminology",
          "Algebra — Common patterns and real-world use cases",
          "Algebra — Setup and project structure",
          "Algebra — Syntax, configuration and conventions",
          "Algebra — Input/output and data flow",
          "Algebra — Error handling and debugging",
          "Algebra — Best practices and maintainability",
          "Algebra — Performance considerations",
          "Algebra — Security and reliability considerations"
        ],
        practical: "Solve basic AI mathematics exercises.",
        outcome: "Understand AI mathematical foundations.",
      },
      {
        title: "Data Handling",
        overview: "Learn how AI systems work with data.",
        learn: [
          "Cleaning",
          "Transformation",
          "Visualization",
          "Cleaning — Core concepts and terminology",
          "Cleaning — Common patterns and real-world use cases",
          "Cleaning — Setup and project structure",
          "Cleaning — Syntax, configuration and conventions",
          "Cleaning — Input/output and data flow",
          "Cleaning — Error handling and debugging",
          "Cleaning — Best practices and maintainability",
          "Cleaning — Performance considerations",
          "Cleaning — Security and reliability considerations"
        ],
        practical: "Prepare a dataset for ML.",
        outcome: "Prepare data for AI systems.",
      },
      {
        title: "Machine Learning Fundamentals",
        overview: "Understand how machine learning models learn patterns.",
        learn: [
          "Features",
          "Labels",
          "Training",
          "Testing",
          "Features — Core concepts and terminology",
          "Features — Common patterns and real-world use cases",
          "Features — Setup and project structure",
          "Features — Syntax, configuration and conventions",
          "Features — Input/output and data flow",
          "Features — Error handling and debugging",
          "Features — Best practices and maintainability",
          "Features — Performance considerations"
        ],
        practical: "Build a simple ML model.",
        outcome: "Understand machine learning.",
      },
      {
        title: "Regression",
        overview: "Learn models used for numerical prediction.",
        learn: [
          "Linear regression",
          "Metrics",
          "Prediction",
          "Linear regression — Core concepts and terminology",
          "Linear regression — Common patterns and real-world use cases",
          "Linear regression — Setup and project structure",
          "Linear regression — Syntax, configuration and conventions",
          "Linear regression — Input/output and data flow",
          "Linear regression — Error handling and debugging",
          "Linear regression — Best practices and maintainability",
          "Linear regression — Performance considerations",
          "Linear regression — Security and reliability considerations"
        ],
        practical: "Build a prediction model.",
        outcome: "Understand regression.",
      },
      {
        title: "Classification",
        overview: "Learn how models categorize data.",
        learn: [
          "Classification",
          "Labels",
          "Evaluation",
          "Classification — Core concepts and terminology",
          "Classification — Common patterns and real-world use cases",
          "Classification — Setup and project structure",
          "Classification — Syntax, configuration and conventions",
          "Classification — Input/output and data flow",
          "Classification — Error handling and debugging",
          "Classification — Best practices and maintainability",
          "Classification — Performance considerations",
          "Classification — Security and reliability considerations"
        ],
        practical: "Build a classification model.",
        outcome: "Understand classification.",
      },
      {
        title: "Neural Networks",
        overview: "Understand the basics of neural networks.",
        learn: [
          "Neurons",
          "Layers",
          "Activation",
          "Neurons — Core concepts and terminology",
          "Neurons — Common patterns and real-world use cases",
          "Neurons — Setup and project structure",
          "Neurons — Syntax, configuration and conventions",
          "Neurons — Input/output and data flow",
          "Neurons — Error handling and debugging",
          "Neurons — Best practices and maintainability",
          "Neurons — Performance considerations",
          "Neurons — Security and reliability considerations"
        ],
        practical: "Build a basic neural network.",
        outcome: "Understand neural networks.",
      },
      {
        title: "Model Evaluation",
        overview: "Learn how AI models are evaluated.",
        learn: [
          "Accuracy",
          "Precision",
          "Recall",
          "Validation",
          "Accuracy — Core concepts and terminology",
          "Accuracy — Common patterns and real-world use cases",
          "Accuracy — Setup and project structure",
          "Accuracy — Syntax, configuration and conventions",
          "Accuracy — Input/output and data flow",
          "Accuracy — Error handling and debugging",
          "Accuracy — Best practices and maintainability",
          "Accuracy — Performance considerations"
        ],
        practical: "Evaluate multiple models.",
        outcome: "Compare AI models correctly.",
      },
      {
        title: "AI Application Development",
        overview: "Use AI models inside applications.",
        learn: [
          "APIs",
          "Model inference",
          "Application integration",
          "APIs — Core concepts and terminology",
          "APIs — Common patterns and real-world use cases",
          "APIs — Setup and project structure",
          "APIs — Syntax, configuration and conventions",
          "APIs — Input/output and data flow",
          "APIs — Error handling and debugging",
          "APIs — Best practices and maintainability",
          "APIs — Performance considerations",
          "APIs — Security and reliability considerations"
        ],
        practical: "Build an AI-powered application.",
        outcome: "Integrate AI into applications.",
      },
      {
        title: "AI Portfolio Project",
        overview: "Build a complete AI project.",
        learn: [
          "Data",
          "Model",
          "Application",
          "Documentation",
          "Data — Core concepts and terminology",
          "Data — Common patterns and real-world use cases",
          "Data — Setup and project structure",
          "Data — Syntax, configuration and conventions",
          "Data — Input/output and data flow",
          "Data — Error handling and debugging",
          "Data — Best practices and maintainability",
          "Data — Performance considerations"
        ],
        practical: "Create an end-to-end AI application.",
        outcome: "Build a portfolio-ready AI project.",
      },
    ],

    Intermediate: [
      {
        title: "Advanced Machine Learning",
        overview: "Study more powerful machine learning techniques.",
        learn: [
          "Ensemble methods",
          "Optimization",
          "Validation",
          "Ensemble methods — Core concepts and terminology",
          "Ensemble methods — Common patterns and real-world use cases",
          "Ensemble methods — Setup and project structure",
          "Ensemble methods — Syntax, configuration and conventions",
          "Ensemble methods — Input/output and data flow",
          "Ensemble methods — Error handling and debugging",
          "Ensemble methods — Best practices and maintainability",
          "Ensemble methods — Performance considerations",
          "Ensemble methods — Security and reliability considerations"
        ],
        practical: "Build an advanced ML model.",
        outcome: "Improve ML performance.",
      },
      {
        title: "Feature Engineering",
        overview: "Create better features for machine learning.",
        learn: [
          "Transformation",
          "Encoding",
          "Selection",
          "Transformation — Core concepts and terminology",
          "Transformation — Common patterns and real-world use cases",
          "Transformation — Setup and project structure",
          "Transformation — Syntax, configuration and conventions",
          "Transformation — Input/output and data flow",
          "Transformation — Error handling and debugging",
          "Transformation — Best practices and maintainability",
          "Transformation — Performance considerations",
          "Transformation — Security and reliability considerations"
        ],
        practical: "Engineer features for a dataset.",
        outcome: "Improve model inputs.",
      },
      {
        title: "Model Tuning",
        overview: "Improve model performance through tuning.",
        learn: [
          "Hyperparameters",
          "Validation",
          "Optimization",
          "Hyperparameters — Core concepts and terminology",
          "Hyperparameters — Common patterns and real-world use cases",
          "Hyperparameters — Setup and project structure",
          "Hyperparameters — Syntax, configuration and conventions",
          "Hyperparameters — Input/output and data flow",
          "Hyperparameters — Error handling and debugging",
          "Hyperparameters — Best practices and maintainability",
          "Hyperparameters — Performance considerations",
          "Hyperparameters — Security and reliability considerations"
        ],
        practical: "Tune a machine learning model.",
        outcome: "Build optimized models.",
      },
      {
        title: "Deep Learning Fundamentals",
        overview: "Learn modern neural network concepts.",
        learn: [
          "Deep networks",
          "Training",
          "Optimization",
          "Deep networks — Core concepts and terminology",
          "Deep networks — Common patterns and real-world use cases",
          "Deep networks — Setup and project structure",
          "Deep networks — Syntax, configuration and conventions",
          "Deep networks — Input/output and data flow",
          "Deep networks — Error handling and debugging",
          "Deep networks — Best practices and maintainability",
          "Deep networks — Performance considerations",
          "Deep networks — Security and reliability considerations"
        ],
        practical: "Build a neural network.",
        outcome: "Understand deep learning.",
      },
      {
        title: "Computer Vision",
        overview: "Build applications that understand images.",
        learn: [
          "Image processing",
          "Classification",
          "Image processing — Core concepts and terminology",
          "Image processing — Common patterns and real-world use cases",
          "Image processing — Setup and project structure",
          "Image processing — Syntax, configuration and conventions",
          "Image processing — Input/output and data flow",
          "Image processing — Error handling and debugging",
          "Image processing — Best practices and maintainability",
          "Image processing — Performance considerations",
          "Image processing — Security and reliability considerations",
          "Image processing — Testing and validation"
        ],
        practical: "Build an image classifier.",
        outcome: "Understand computer vision.",
      },
      {
        title: "NLP Fundamentals",
        overview: "Build systems that process text.",
        learn: [
          "Text processing",
          "Embeddings",
          "Classification",
          "Text processing — Core concepts and terminology",
          "Text processing — Common patterns and real-world use cases",
          "Text processing — Setup and project structure",
          "Text processing — Syntax, configuration and conventions",
          "Text processing — Input/output and data flow",
          "Text processing — Error handling and debugging",
          "Text processing — Best practices and maintainability",
          "Text processing — Performance considerations",
          "Text processing — Security and reliability considerations"
        ],
        practical: "Build a text classification system.",
        outcome: "Understand NLP.",
      },
      {
        title: "Model Deployment",
        overview: "Deploy machine learning models into applications.",
        learn: [
          "APIs",
          "Serving",
          "Monitoring",
          "APIs — Core concepts and terminology",
          "APIs — Common patterns and real-world use cases",
          "APIs — Setup and project structure",
          "APIs — Syntax, configuration and conventions",
          "APIs — Input/output and data flow",
          "APIs — Error handling and debugging",
          "APIs — Best practices and maintainability",
          "APIs — Performance considerations",
          "APIs — Security and reliability considerations"
        ],
        practical: "Deploy a trained model.",
        outcome: "Understand model deployment.",
      },
      {
        title: "MLOps Fundamentals",
        overview: "Understand production ML workflows.",
        learn: [
          "Pipelines",
          "Versioning",
          "Monitoring",
          "Pipelines — Core concepts and terminology",
          "Pipelines — Common patterns and real-world use cases",
          "Pipelines — Setup and project structure",
          "Pipelines — Syntax, configuration and conventions",
          "Pipelines — Input/output and data flow",
          "Pipelines — Error handling and debugging",
          "Pipelines — Best practices and maintainability",
          "Pipelines — Performance considerations",
          "Pipelines — Security and reliability considerations"
        ],
        practical: "Create a basic ML pipeline.",
        outcome: "Understand MLOps.",
      },
      {
        title: "AI Application",
        overview: "Build an AI-powered product.",
        learn: [
          "Models",
          "Backend",
          "Frontend",
          "Deployment",
          "Models — Core concepts and terminology",
          "Models — Common patterns and real-world use cases",
          "Models — Setup and project structure",
          "Models — Syntax, configuration and conventions",
          "Models — Input/output and data flow",
          "Models — Error handling and debugging",
          "Models — Best practices and maintainability",
          "Models — Performance considerations"
        ],
        practical: "Build an AI application.",
        outcome: "Create an AI product.",
      },
      {
        title: "AI Portfolio",
        overview: "Document and present your AI projects.",
        learn: [
          "Documentation",
          "Results",
          "Architecture",
          "Documentation — Core concepts and terminology",
          "Documentation — Common patterns and real-world use cases",
          "Documentation — Setup and project structure",
          "Documentation — Syntax, configuration and conventions",
          "Documentation — Input/output and data flow",
          "Documentation — Error handling and debugging",
          "Documentation — Best practices and maintainability",
          "Documentation — Performance considerations",
          "Documentation — Security and reliability considerations"
        ],
        practical: "Create an AI case study.",
        outcome: "Build an AI portfolio.",
      },
    ],

    Advanced: [
      {
        title: "Advanced Deep Learning",
        overview: "Study advanced neural network architectures.",
        learn: [
          "Architectures",
          "Optimization",
          "Training",
          "Architectures — Core concepts and terminology",
          "Architectures — Common patterns and real-world use cases",
          "Architectures — Setup and project structure",
          "Architectures — Syntax, configuration and conventions",
          "Architectures — Input/output and data flow",
          "Architectures — Error handling and debugging",
          "Architectures — Best practices and maintainability",
          "Architectures — Performance considerations",
          "Architectures — Security and reliability considerations"
        ],
        practical: "Build an advanced deep learning model.",
        outcome: "Develop advanced AI skills.",
      },
      {
        title: "Transformers",
        overview: "Understand modern transformer-based AI systems.",
        learn: [
          "Attention",
          "Embeddings",
          "Transformer architecture",
          "Attention — Core concepts and terminology",
          "Attention — Common patterns and real-world use cases",
          "Attention — Setup and project structure",
          "Attention — Syntax, configuration and conventions",
          "Attention — Input/output and data flow",
          "Attention — Error handling and debugging",
          "Attention — Best practices and maintainability",
          "Attention — Performance considerations",
          "Attention — Security and reliability considerations"
        ],
        practical: "Build a small transformer-based experiment.",
        outcome: "Understand modern AI architectures.",
      },
      {
        title: "Large Language Models",
        overview: "Understand the architecture and application of language models.",
        learn: [
          "Tokens",
          "Embeddings",
          "Inference",
          "Fine-tuning concepts",
          "Tokens — Core concepts and terminology",
          "Tokens — Common patterns and real-world use cases",
          "Tokens — Setup and project structure",
          "Tokens — Syntax, configuration and conventions",
          "Tokens — Input/output and data flow",
          "Tokens — Error handling and debugging",
          "Tokens — Best practices and maintainability",
          "Tokens — Performance considerations"
        ],
        practical: "Build an application using a language model API.",
        outcome: "Understand LLM applications.",
      },
      {
        title: "RAG Systems",
        overview: "Learn how AI applications can use external knowledge.",
        learn: [
          "Retrieval",
          "Embeddings",
          "Vector search",
          "Retrieval — Core concepts and terminology",
          "Retrieval — Common patterns and real-world use cases",
          "Retrieval — Setup and project structure",
          "Retrieval — Syntax, configuration and conventions",
          "Retrieval — Input/output and data flow",
          "Retrieval — Error handling and debugging",
          "Retrieval — Best practices and maintainability",
          "Retrieval — Performance considerations",
          "Retrieval — Security and reliability considerations"
        ],
        practical: "Build a document-based AI assistant.",
        outcome: "Understand retrieval-augmented generation.",
      },
      {
        title: "AI Agents",
        overview: "Understand systems that use AI models with tools and workflows.",
        learn: [
          "Tools",
          "Planning",
          "Workflows",
          "Memory concepts",
          "Tools — Core concepts and terminology",
          "Tools — Common patterns and real-world use cases",
          "Tools — Setup and project structure",
          "Tools — Syntax, configuration and conventions",
          "Tools — Input/output and data flow",
          "Tools — Error handling and debugging",
          "Tools — Best practices and maintainability",
          "Tools — Performance considerations"
        ],
        practical: "Build a controlled AI workflow.",
        outcome: "Understand agentic AI systems.",
      },
      {
        title: "Model Evaluation",
        overview: "Evaluate AI systems systematically.",
        learn: [
          "Benchmarks",
          "Quality",
          "Safety",
          "Evaluation",
          "Benchmarks — Core concepts and terminology",
          "Benchmarks — Common patterns and real-world use cases",
          "Benchmarks — Setup and project structure",
          "Benchmarks — Syntax, configuration and conventions",
          "Benchmarks — Input/output and data flow",
          "Benchmarks — Error handling and debugging",
          "Benchmarks — Best practices and maintainability",
          "Benchmarks — Performance considerations"
        ],
        practical: "Create an AI evaluation framework.",
        outcome: "Measure AI system quality.",
      },
      {
        title: "AI Security",
        overview: "Understand security concerns in AI applications.",
        learn: [
          "Input validation",
          "Data protection",
          "Access control",
          "Input validation — Core concepts and terminology",
          "Input validation — Common patterns and real-world use cases",
          "Input validation — Setup and project structure",
          "Input validation — Syntax, configuration and conventions",
          "Input validation — Input/output and data flow",
          "Input validation — Error handling and debugging",
          "Input validation — Best practices and maintainability",
          "Input validation — Performance considerations",
          "Input validation — Security and reliability considerations"
        ],
        practical: "Perform a security review of a demo AI application.",
        outcome: "Build safer AI applications.",
      },
      {
        title: "MLOps",
        overview: "Deploy and maintain machine learning systems.",
        learn: [
          "Pipelines",
          "Monitoring",
          "Model versioning",
          "Pipelines — Core concepts and terminology",
          "Pipelines — Common patterns and real-world use cases",
          "Pipelines — Setup and project structure",
          "Pipelines — Syntax, configuration and conventions",
          "Pipelines — Input/output and data flow",
          "Pipelines — Error handling and debugging",
          "Pipelines — Best practices and maintainability",
          "Pipelines — Performance considerations",
          "Pipelines — Security and reliability considerations"
        ],
        practical: "Create an ML deployment workflow.",
        outcome: "Operate ML systems.",
      },
      {
        title: "Production AI",
        overview: "Design AI systems for real-world applications.",
        learn: [
          "Scaling",
          "Monitoring",
          "Cost",
          "Reliability",
          "Scaling — Core concepts and terminology",
          "Scaling — Common patterns and real-world use cases",
          "Scaling — Setup and project structure",
          "Scaling — Syntax, configuration and conventions",
          "Scaling — Input/output and data flow",
          "Scaling — Error handling and debugging",
          "Scaling — Best practices and maintainability",
          "Scaling — Performance considerations"
        ],
        practical: "Design a production AI architecture.",
        outcome: "Understand production AI engineering.",
      },
      {
        title: "Advanced AI Project",
        overview: "Combine modern AI techniques into a complete system.",
        learn: [
          "AI architecture",
          "Models",
          "RAG",
          "Deployment",
          "AI architecture — Core concepts and terminology",
          "AI architecture — Common patterns and real-world use cases",
          "AI architecture — Setup and project structure",
          "AI architecture — Syntax, configuration and conventions",
          "AI architecture — Input/output and data flow",
          "AI architecture — Error handling and debugging",
          "AI architecture — Best practices and maintainability",
          "AI architecture — Performance considerations"
        ],
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

  // Ref for the generated roadmap section so we can scroll to it
  const roadmapSectionRef = useRef(null);

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
     Auto-scroll to roadmap section once it's generated
  ------------------------------------------------------- */

  useEffect(() => {
    if (generated && roadmap.length > 0 && roadmapSectionRef.current) {
      // Small timeout ensures the section has rendered/painted
      // before we try to scroll to it.
      const timer = setTimeout(() => {
        roadmapSectionRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [generated, roadmap]);

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

          <div
            ref={roadmapSectionRef}
            className="mt-8 scroll-mt-6 rounded-3xl border border-cyan-400/30 bg-[#003f46] p-5 shadow-2xl md:p-8"
          >

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