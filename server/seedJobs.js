const dns = require("dns");

dns.setServers(["8.8.8.8", "1.1.1.1"]);
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const User = require("./models/User");
const JobPosting = require("./models/JobPosting");

dotenv.config();

const jobs = [
  {
    title: "Frontend Developer",
    department: "Development",
    location: "Pune, India",
    employmentType: "Full Time",
    experience: "0-2 Years",
    salary: "₹3 LPA - ₹6 LPA",
    description:
      "We are looking for a Frontend Developer to build responsive and user-friendly web applications.",
    responsibilities: [
      "Develop responsive web interfaces",
      "Convert UI designs into functional components",
      "Work with backend developers",
      "Optimize application performance",
    ],
    requirements: [
      "Strong understanding of HTML, CSS and JavaScript",
      "Knowledge of React",
      "Understanding of responsive design",
    ],
    skills: ["HTML", "CSS", "JavaScript", "React", "Tailwind CSS"],
    openings: 2,
    status: "open",
    isFeatured: true,
  },

  {
    title: "Backend Developer",
    department: "Development",
    location: "Pune, India",
    employmentType: "Full Time",
    experience: "1-3 Years",
    salary: "₹4 LPA - ₹8 LPA",
    description:
      "Join our backend team to develop secure and scalable APIs and services.",
    responsibilities: [
      "Develop REST APIs",
      "Work with MongoDB",
      "Implement authentication and authorization",
      "Maintain backend services",
    ],
    requirements: [
      "Knowledge of Node.js and Express",
      "Experience with MongoDB",
      "Understanding of REST APIs",
    ],
    skills: ["Node.js", "Express", "MongoDB", "REST API", "JWT"],
    openings: 2,
    status: "open",
    isFeatured: true,
  },

  {
    title: "Full Stack Developer",
    department: "Development",
    location: "Remote",
    employmentType: "Remote",
    experience: "1-3 Years",
    salary: "₹5 LPA - ₹10 LPA",
    description:
      "We are seeking a Full Stack Developer capable of building complete web applications.",
    responsibilities: [
      "Build frontend applications",
      "Develop backend APIs",
      "Integrate databases",
      "Debug and optimize applications",
    ],
    requirements: [
      "Experience with React",
      "Experience with Node.js",
      "Knowledge of MongoDB",
    ],
    skills: ["React", "Node.js", "Express", "MongoDB", "JavaScript"],
    openings: 2,
    status: "open",
    isFeatured: true,
  },

  {
    title: "UI UX Designer",
    department: "Design",
    location: "Pune, India",
    employmentType: "Full Time",
    experience: "1-3 Years",
    salary: "₹3 LPA - ₹7 LPA",
    description:
      "Create modern and intuitive digital experiences for web and mobile applications.",
    responsibilities: [
      "Create wireframes",
      "Design user interfaces",
      "Develop prototypes",
      "Collaborate with developers",
    ],
    requirements: [
      "Strong design portfolio",
      "Knowledge of Figma",
      "Understanding of UX principles",
    ],
    skills: ["Figma", "UI Design", "UX Design", "Prototyping"],
    openings: 1,
    status: "open",
    isFeatured: false,
  },

  {
    title: "Digital Marketing Executive",
    department: "Marketing",
    location: "Mumbai, India",
    employmentType: "Full Time",
    experience: "0-2 Years",
    salary: "₹2.5 LPA - ₹5 LPA",
    description:
      "Help us grow our digital presence through effective marketing strategies.",
    responsibilities: [
      "Manage digital campaigns",
      "Create marketing content",
      "Monitor campaign performance",
      "Improve online engagement",
    ],
    requirements: [
      "Knowledge of digital marketing",
      "Basic SEO knowledge",
      "Good communication skills",
    ],
    skills: ["SEO", "Google Ads", "Social Media", "Content Marketing"],
    openings: 2,
    status: "open",
    isFeatured: false,
  },

  {
    title: "SEO Specialist",
    department: "Marketing",
    location: "Remote",
    employmentType: "Remote",
    experience: "1-3 Years",
    salary: "₹3 LPA - ₹6 LPA",
    description:
      "Improve website visibility and organic search performance.",
    responsibilities: [
      "Perform keyword research",
      "Optimize website content",
      "Monitor search rankings",
      "Prepare SEO reports",
    ],
    requirements: [
      "SEO experience",
      "Knowledge of search engine algorithms",
      "Analytical skills",
    ],
    skills: ["SEO", "Keyword Research", "Google Analytics", "Search Console"],
    openings: 1,
    status: "open",
    isFeatured: false,
  },

  {
    title: "React Developer",
    department: "Development",
    location: "Pune, India",
    employmentType: "Full Time",
    experience: "1-2 Years",
    salary: "₹4 LPA - ₹8 LPA",
    description:
      "Develop modern React applications with reusable and scalable components.",
    responsibilities: [
      "Develop React components",
      "Integrate APIs",
      "Manage application state",
      "Improve frontend performance",
    ],
    requirements: [
      "Strong React knowledge",
      "JavaScript proficiency",
      "API integration experience",
    ],
    skills: ["React", "JavaScript", "Redux", "REST API"],
    openings: 2,
    status: "open",
    isFeatured: true,
  },

  {
    title: "Node.js Developer",
    department: "Development",
    location: "Bangalore, India",
    employmentType: "Full Time",
    experience: "1-3 Years",
    salary: "₹4 LPA - ₹9 LPA",
    description:
      "Build reliable backend services and APIs using Node.js.",
    responsibilities: [
      "Develop backend services",
      "Build REST APIs",
      "Integrate databases",
      "Write maintainable code",
    ],
    requirements: [
      "Node.js experience",
      "Express knowledge",
      "MongoDB experience",
    ],
    skills: ["Node.js", "Express", "MongoDB", "JavaScript"],
    openings: 2,
    status: "open",
    isFeatured: false,
  },

  {
    title: "QA Engineer",
    department: "Quality Assurance",
    location: "Pune, India",
    employmentType: "Full Time",
    experience: "0-2 Years",
    salary: "₹3 LPA - ₹6 LPA",
    description:
      "Ensure our applications meet quality and reliability standards.",
    responsibilities: [
      "Create test cases",
      "Perform functional testing",
      "Report software defects",
      "Work with development teams",
    ],
    requirements: [
      "Understanding of software testing",
      "Attention to detail",
      "Basic API testing knowledge",
    ],
    skills: ["Manual Testing", "API Testing", "Postman", "Test Cases"],
    openings: 2,
    status: "open",
    isFeatured: false,
  },

  {
    title: "Business Analyst",
    department: "Business",
    location: "Mumbai, India",
    employmentType: "Full Time",
    experience: "1-3 Years",
    salary: "₹4 LPA - ₹8 LPA",
    description:
      "Work with stakeholders to understand business requirements and translate them into actionable solutions.",
    responsibilities: [
      "Gather business requirements",
      "Analyze business processes",
      "Prepare documentation",
      "Coordinate with development teams",
    ],
    requirements: [
      "Strong analytical skills",
      "Good communication",
      "Requirement gathering experience",
    ],
    skills: ["Business Analysis", "Documentation", "Excel", "Communication"],
    openings: 1,
    status: "open",
    isFeatured: false,
  },

  {
    title: "Python Developer",
    department: "Development",
    location: "Remote",
    employmentType: "Remote",
    experience: "1-3 Years",
    salary: "₹4 LPA - ₹9 LPA",
    description:
      "Develop scalable applications and backend services using Python.",
    responsibilities: [
      "Develop Python applications",
      "Create APIs",
      "Work with databases",
      "Write automated tests",
    ],
    requirements: [
      "Python programming knowledge",
      "API development experience",
      "Database knowledge",
    ],
    skills: ["Python", "Django", "Flask", "REST API"],
    openings: 2,
    status: "open",
    isFeatured: false,
  },

  {
    title: "Graphic Designer",
    department: "Design",
    location: "Pune, India",
    employmentType: "Part Time",
    experience: "0-2 Years",
    salary: "₹2 LPA - ₹4 LPA",
    description:
      "Create engaging visual content for digital marketing and branding.",
    responsibilities: [
      "Design social media graphics",
      "Create marketing materials",
      "Support branding projects",
      "Prepare digital assets",
    ],
    requirements: [
      "Creative design skills",
      "Design portfolio",
      "Knowledge of design tools",
    ],
    skills: ["Photoshop", "Illustrator", "Figma", "Graphic Design"],
    openings: 1,
    status: "open",
    isFeatured: false,
  },

  {
    title: "Project Coordinator",
    department: "Operations",
    location: "Pune, India",
    employmentType: "Full Time",
    experience: "1-2 Years",
    salary: "₹3 LPA - ₹6 LPA",
    description:
      "Coordinate projects and ensure smooth communication between teams.",
    responsibilities: [
      "Track project progress",
      "Coordinate team activities",
      "Maintain project documentation",
      "Prepare project reports",
    ],
    requirements: [
      "Good organizational skills",
      "Strong communication",
      "Basic project management knowledge",
    ],
    skills: ["Project Management", "Communication", "Documentation"],
    openings: 1,
    status: "open",
    isFeatured: false,
  },

  {
    title: "Content Writer",
    department: "Content",
    location: "Remote",
    employmentType: "Remote",
    experience: "0-2 Years",
    salary: "₹2.5 LPA - ₹5 LPA",
    description:
      "Create clear, engaging and SEO-friendly content for digital platforms.",
    responsibilities: [
      "Write website content",
      "Create blog articles",
      "Research industry topics",
      "Optimize content for SEO",
    ],
    requirements: [
      "Excellent writing skills",
      "Good English communication",
      "Basic SEO knowledge",
    ],
    skills: ["Content Writing", "SEO", "Research", "Copywriting"],
    openings: 2,
    status: "open",
    isFeatured: false,
  },

  {
    title: "DevOps Engineer",
    department: "Infrastructure",
    location: "Bangalore, India",
    employmentType: "Full Time",
    experience: "2-4 Years",
    salary: "₹6 LPA - ₹12 LPA",
    description:
      "Manage deployment infrastructure and improve application reliability.",
    responsibilities: [
      "Manage CI/CD pipelines",
      "Monitor applications",
      "Maintain cloud infrastructure",
      "Automate deployment processes",
    ],
    requirements: [
      "Linux knowledge",
      "CI/CD experience",
      "Cloud platform knowledge",
    ],
    skills: ["Docker", "AWS", "Linux", "CI/CD", "Git"],
    openings: 1,
    status: "open",
    isFeatured: false,
  },

  {
    title: "Mobile App Developer",
    department: "Development",
    location: "Pune, India",
    employmentType: "Full Time",
    experience: "1-3 Years",
    salary: "₹4 LPA - ₹9 LPA",
    description:
      "Develop high-quality mobile applications for Android and iOS platforms.",
    responsibilities: [
      "Develop mobile applications",
      "Integrate APIs",
      "Fix application bugs",
      "Optimize mobile performance",
    ],
    requirements: [
      "Mobile development experience",
      "API integration knowledge",
      "Understanding of mobile UI",
    ],
    skills: ["React Native", "JavaScript", "Mobile Development", "REST API"],
    openings: 2,
    status: "open",
    isFeatured: false,
  },

  {
    title: "HR Executive",
    department: "Human Resources",
    location: "Pune, India",
    employmentType: "Full Time",
    experience: "1-3 Years",
    salary: "₹3 LPA - ₹6 LPA",
    description:
      "Support recruitment and employee engagement activities.",
    responsibilities: [
      "Coordinate recruitment",
      "Schedule interviews",
      "Maintain employee records",
      "Support HR operations",
    ],
    requirements: [
      "Good communication skills",
      "HR fundamentals",
      "Organizational skills",
    ],
    skills: ["Recruitment", "HR Operations", "Communication"],
    openings: 1,
    status: "open",
    isFeatured: false,
  },

  {
    title: "Software Engineer",
    department: "Engineering",
    location: "Bangalore, India",
    employmentType: "Full Time",
    experience: "1-3 Years",
    salary: "₹5 LPA - ₹10 LPA",
    description:
      "Work on software products and contribute to scalable engineering solutions.",
    responsibilities: [
      "Develop software features",
      "Review code",
      "Debug applications",
      "Collaborate with engineering teams",
    ],
    requirements: [
      "Strong programming fundamentals",
      "Problem-solving skills",
      "Version control knowledge",
    ],
    skills: ["JavaScript", "Git", "Problem Solving", "Software Development"],
    openings: 2,
    status: "open",
    isFeatured: true,
  },

  {
    title: "Technical Support Engineer",
    department: "Support",
    location: "Pune, India",
    employmentType: "Full Time",
    experience: "0-2 Years",
    salary: "₹2.5 LPA - ₹5 LPA",
    description:
      "Provide technical assistance to customers and help resolve product issues.",
    responsibilities: [
      "Resolve technical issues",
      "Assist customers",
      "Document support cases",
      "Coordinate with engineering teams",
    ],
    requirements: [
      "Good troubleshooting skills",
      "Good communication",
      "Basic technical knowledge",
    ],
    skills: ["Technical Support", "Troubleshooting", "Communication", "APIs"],
    openings: 2,
    status: "open",
    isFeatured: false,
  },
];

const seedJobs = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not defined in .env");
    }

    await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ MongoDB connected.");

    // Find existing admin account.
    const admin = await User.findOne({ role: "admin" }).select("_id");

    if (!admin) {
      throw new Error(
        "No admin user found. Create/keep your existing admin account first."
      );
    }

    console.log(`✅ Admin found: ${admin._id}`);

    // Count currently open jobs.
    const existingOpenJobs = await JobPosting.countDocuments({
      status: "open",
    });

    console.log(`📊 Existing open jobs: ${existingOpenJobs}`);

    // We only want 20 jobs for the current test setup.
    // This does NOT create a permanent limit in the application.
    if (existingOpenJobs >= 20) {
      console.log(
        `ℹ️ Database already has ${existingOpenJobs} open jobs. No jobs inserted.`
      );

      await mongoose.connection.close();
      process.exit(0);
    }

    const jobsToInsert = jobs
      .slice(0, 20 - existingOpenJobs)
      .map((job) => ({
        ...job,
        createdBy: admin._id,
      }));

    if (jobsToInsert.length === 0) {
      console.log("ℹ️ No jobs need to be inserted.");

      await mongoose.connection.close();
      process.exit(0);
    }

    const insertedJobs = await JobPosting.insertMany(jobsToInsert);

    console.log(
      `✅ Successfully inserted ${insertedJobs.length} open jobs.`
    );

    const finalOpenJobs = await JobPosting.countDocuments({
      status: "open",
    });

    console.log(`📊 Final open jobs count: ${finalOpenJobs}`);

    await mongoose.connection.close();

    console.log("🔌 MongoDB connection closed.");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seed Jobs Error:", error.message);

    try {
      await mongoose.connection.close();
    } catch (closeError) {
      console.error(
        "❌ MongoDB close error:",
        closeError.message
      );
    }

    process.exit(1);
  }
};

seedJobs();