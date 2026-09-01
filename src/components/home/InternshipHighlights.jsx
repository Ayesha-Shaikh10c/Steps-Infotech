import React from "react";
import {
  GraduationCap,
  Code2,
  Award,
  TrendingUp,
  CalendarDays,
  ClipboardCheck,
  UserRound,
  BadgeCheck,
  FileText,
  BriefcaseBusiness,
  Users,
  Building2,
  ThumbsUp,
  ArrowRight,
} from "lucide-react";

const features = [
  {
    icon: Code2,
    title: "Hands-on",
    title2: "Experience",
    description: "Work on real Projects and live Tasks",
  },
  {
    icon: GraduationCap,
    title: "Expert",
    title2: "Mentorship",
    description: "Learn From Industry Professionals",
  },
  {
    icon: Award,
    title: "Certification",
    title2: "Program",
    description: "Earn Recognized Certifications",
  },
  {
    icon: TrendingUp,
    title: "Career",
    title2: "Growth",
    description: "Better skills, Better opportunities",
  },
];

const highlights = [
  {
    icon: CalendarDays,
    title: "3-6 Month Internship",
    description: "Flexible durations to match your goal",
  },
  {
    icon: ClipboardCheck,
    title: "Live Client Projects",
    description: "Work on real-projects & gain experience",
  },
  {
    icon: UserRound,
    title: "Weekly Mentor Sessions",
    description: "Learn and grow with expert guidance",
  },
  {
    icon: BadgeCheck,
    title: "Certificate of Completion",
    description: "Earn a recognized internship certificate",
  },
  {
    icon: FileText,
    title: "Resume & Interview Support",
    description: "Get expert help to build your career",
  },
  {
    icon: BriefcaseBusiness,
    title: "Job Referral Opportunities",
    description: "Get noticed by top hiring partners",
  },
];

const statistics = [
  {
    icon: BriefcaseBusiness,
    number: "500+",
    line1: "Internship",
    line2: "Opportunities",
  },
  {
    icon: Users,
    number: "100+",
    line1: "Industry",
    line2: "Mentors",
  },
  {
    icon: Building2,
    number: "250+",
    line1: "Company",
    line2: "Partners",
  },
  {
    icon: GraduationCap,
    number: "15K+",
    line1: "Students",
    line2: "trained",
  },
  {
    icon: ThumbsUp,
    number: "98%",
    line1: "Intern",
    line2: "Satisfaction",
  },
];

export default function InternshipHighlights() {
  return (
    <section className="relative w-full overflow-hidden bg-[#002f36] px-5 py-10 text-white sm:px-8 md:px-10 lg:px-12 lg:py-12">

      {/* =====================================================
          BACKGROUND DECORATIONS
      ====================================================== */}

      <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-[#00d9e8]/5 blur-3xl" />

      <div className="pointer-events-none absolute -right-32 top-10 h-80 w-80 rounded-full bg-[#00d9e8]/5 blur-3xl" />

      <div className="pointer-events-none absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[#00d9e8]/5 blur-3xl" />


      <div className="relative mx-auto max-w-[1400px]">

        {/* =====================================================
            TOP CONTENT
        ====================================================== */}

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.55fr_1fr] lg:gap-12">

          {/* =================================================
              LEFT SIDE
          ================================================== */}

          <div className="flex flex-col justify-center">

            {/* Badge */}

            <div className="mb-7 inline-flex w-fit items-center gap-2 rounded-2xl bg-[#08747c] px-5 py-4 shadow-lg">

              <span className="text-xl">
                🎓
              </span>

              <span className="text-lg font-bold tracking-wide text-white">
                Learn. Build. Grow.
              </span>

            </div>


            {/* Main Heading */}

            <h1 className="max-w-3xl text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">

              <span className="text-white">
                From Learning
              </span>

              <br />

              <span className="text-white">
                to Earning –
              </span>

              <br />

              <span className="text-[#12dce8]">
                We Guide You
              </span>

            </h1>


            {/* Description */}

            <p className="mt-7 max-w-2xl text-lg font-medium leading-8 text-gray-200 sm:text-xl">

              Join industry-focused internships and gain
              <br className="hidden sm:block" />

              real-world experience. Build your skills,
              <br className="hidden sm:block" />

              boost confidence and unlock better opportunities.

            </p>


            {/* =================================================
                FOUR FEATURE ITEMS
            ================================================== */}

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">

              {features.map((feature, index) => {
                const Icon = feature.icon;

                return (
                  <div
                    key={index}
                    className={`
                      flex
                      flex-col
                      items-center
                      px-4
                      py-5
                      text-center
                      lg:min-h-[205px]
                      lg:justify-start
                      ${index !== 0 ? "lg:border-l lg:border-white/50" : ""}
                    `}
                  >

                    {/* Icon */}

                    <div className="mb-4 flex h-12 w-12 items-center justify-center">

                      <Icon
                        className="h-10 w-10 text-[#12dce8]"
                        strokeWidth={1.8}
                      />

                    </div>


                    {/* Title */}

                    <h3 className="text-xl font-extrabold leading-7 text-white sm:text-2xl">

                      {feature.title}
                      <br />
                      {feature.title2}

                    </h3>


                    {/* Description */}

                    <p className="mt-4 max-w-[190px] text-sm leading-6 text-gray-200 sm:text-base">

                      {feature.description}

                    </p>

                  </div>
                );
              })}

            </div>

          </div>


          {/* =================================================
              RIGHT SIDE - PROGRAM HIGHLIGHTS
          ================================================== */}

          <div className="rounded-[26px] bg-[#07535b] px-6 py-7 shadow-2xl sm:px-8 sm:py-8">

            {/* Heading */}

            <div className="mb-5">

              <h2 className="text-4xl font-extrabold leading-tight sm:text-5xl">

                <span className="text-white">
                  Internship
                </span>

                <br />

                <span className="text-[#12dce8]">
                  Program Highlights
                </span>

              </h2>

            </div>


            {/* Highlights */}

            <div>

              {highlights.map((item, index) => {
                const Icon = item.icon;

                return (
                  <div
                    key={index}
                    className="flex items-center gap-4 border-b border-white/60 py-4 last:border-b-0"
                  >

                    {/* Icon */}

                    <div className="flex h-12 w-12 shrink-0 items-center justify-center">

                      <Icon
                        className="h-9 w-9 text-[#12dce8]"
                        strokeWidth={1.8}
                      />

                    </div>


                    {/* Text */}

                    <div className="min-w-0">

                      <h3 className="text-lg font-bold leading-6 text-white sm:text-xl">

                        {item.title}

                      </h3>

                      <p className="mt-1 text-sm leading-5 text-gray-200 sm:text-base">

                        {item.description}

                      </p>

                    </div>

                  </div>
                );
              })}

            </div>


            {/* Apply Button */}

            <button
              className="
                mt-5
                flex
                w-full
                items-center
                justify-center
                gap-4
                rounded-xl
                bg-[#12cbd8]
                px-6
                py-3
                text-xl
                font-extrabold
                text-white
                shadow-lg
                transition-all
                duration-300
                hover:-translate-y-1
                hover:bg-[#18dce8]
                hover:shadow-[0_10px_30px_rgba(18,203,216,0.25)]
                active:scale-[0.98]
                sm:text-2xl
              "
            >

              Apply Now

              <ArrowRight className="h-6 w-6" />

            </button>

          </div>

        </div>


        {/* =====================================================
            BOTTOM STATISTICS
        ====================================================== */}

        <div className="mt-8 rounded-[28px] bg-[#075b63] px-5 py-5 shadow-xl sm:px-7 lg:px-8">

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">

            {statistics.map((stat, index) => {
              const Icon = stat.icon;

              return (
                <div
                  key={index}
                  className={`
                    flex
                    items-center
                    gap-4
                    px-4
                    py-4
                    lg:justify-center
                    lg:px-5
                    ${index !== 0 ? "lg:border-l lg:border-white/60" : ""}
                    ${index >= 2 ? "sm:border-t sm:border-white/30 lg:border-t-0" : ""}
                  `}
                >

                  {/* Icon */}

                  <div className="flex h-12 w-12 shrink-0 items-center justify-center">

                    <Icon
                      className="h-10 w-10 text-[#12dce8]"
                      strokeWidth={1.8}
                    />

                  </div>


                  {/* Number + Label */}

                  <div>

                    <p className="text-3xl font-extrabold leading-none text-white sm:text-4xl">

                      {stat.number}

                    </p>

                    <p className="mt-2 text-base font-medium leading-5 text-white">

                      {stat.line1}
                      <br />
                      {stat.line2}

                    </p>

                  </div>

                </div>
              );
            })}

          </div>

        </div>

      </div>

    </section>
  );
}