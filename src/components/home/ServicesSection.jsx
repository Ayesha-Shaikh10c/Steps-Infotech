import React from "react";
import {
  Users,
  Award,
  MessageCircle,
  FileBadge,
  BriefcaseBusiness,
  GraduationCap,
  Building2,
  ThumbsUp,
  ArrowUp,
  ShieldCheck,
  Cloud,
  BarChart3,
  Globe,
  Smartphone,
  Palette,
} from "lucide-react";
import logoWhite from '../../assets/logo-footer.png'

const services = [
  {
    title: "Web Development",
    description: "Build responsive, scalable and modern websites.",
    icon: Globe,
    image: "/images/web-development.png",
  },
  {
    title: "App Development",
    description: "Create powerful mobile apps for Android & iOS.",
    icon: Smartphone,
    image: "/images/app-development.png",
  },
  {
    title: "UI/UX Design",
    description: "Design intuitive and engaging user experiences.",
    icon: Palette,
    image: "/images/ui-ux-design.png",
  },
  {
    title: "Cyber Security",
    description: "Learn to protect systems and secure digital assets.",
    icon: ShieldCheck,
    image: "/images/cyber-security.png",
  },
  {
    title: "Cloud Computing",
    description: "Deploy, manage and scale applications in the cloud.",
    icon: Cloud,
    image: "/images/cloud-computing.png",
  },
  {
    title: "Data Science",
    description: "Extract insights and make data-driven decisions.",
    icon: BarChart3,
    image: "/images/data-science.png",
  },
];

const benefits = [
  {
    icon: Users,
    title: "Industry",
    title2: "Focused",
    description: "Curriculum designed by industry experts",
  },
  {
    icon: Award,
    title: "Practical",
    title2: "Learning",
    description: "Hands-on projects and real-world tasks",
  },
  {
    icon: MessageCircle,
    title: "Expert",
    title2: "Mentorship",
    description: "Guidance from experienced mentors",
  },
  {
    icon: FileBadge,
    title: "Certification",
    title2: "Program",
    description: "Earn recognized certificates",
  },
  {
    icon: BriefcaseBusiness,
    title: "Career",
    title2: "Support",
    description: "Resume, interview & job referral support",
  },
];

const statistics = [
  {
    icon: GraduationCap,
    number: "500+",
    title: "Internship",
    title2: "Opportunities",
  },
  {
    icon: Users,
    number: "100+",
    title: "Industry",
    title2: "Mentors",
  },
  {
    icon: Building2,
    number: "250+",
    title: "Company",
    title2: "Partners",
  },
  {
    icon: GraduationCap,
    number: "15K+",
    title: "Students",
    title2: "Trained",
  },
  {
    icon: ThumbsUp,
    number: "98%",
    title: "Intern",
    title2: "Satisfaction",
  },
];

export default function ServicesSection() {
  return (
    <section className="relative w-full overflow-hidden bg-[#004b55] px-5 py-12 text-white sm:px-8 md:px-10 lg:px-16 lg:py-14">

      {/* =====================================================
          BACKGROUND DECORATIONS
      ====================================================== */}

      <div className="pointer-events-none absolute left-20 top-24 h-24 w-24 rounded-full border border-[#16dce8]/10" />

      <div className="pointer-events-none absolute right-20 top-32 h-32 w-32 rounded-full border border-[#16dce8]/10" />

      <div className="pointer-events-none absolute bottom-10 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[#12dce8]/5 blur-3xl" />


      <div className="relative mx-auto max-w-7xl">

        {/* =====================================================
            HEADER
        ====================================================== */}

        <div className="text-center">

          {/* Company Logo */}

          <div className="flex items-center justify-center">

            <div className="flex items-center gap-4">

              <div className="flex h-20 w-20 items-center justify-center">

                {/* Replace with your actual Steps Infotech logo */}
                <img
                  src={logoWhite}
                  alt="Steps Infotech"
                  className="h-20 w-20 object-contain"
                />

              </div>

              <div className="text-left">

                <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl">
                  STEPS
                </h1>

                <p className="-mt-1 text-2xl font-medium tracking-[0.25em] text-[#16dce8]">
                  INFOTECH
                </p>

              </div>

            </div>

          </div>


          {/* Tagline */}

          <p className="mx-auto mt-5 max-w-2xl text-lg font-semibold leading-7 text-white sm:text-xl">

            Empowering careers with industry-focused internships
            <br className="hidden sm:block" />
            and future-ready skills.

          </p>


          {/* Decorative Line */}

          <div className="mt-5 flex items-center justify-center gap-2">

            <div className="h-[2px] w-10 bg-[#12dce8]" />

            <div className="h-2 w-2 rounded-full bg-[#12dce8]" />

            <div className="mx-1 h-1 w-1 rounded-full bg-[#12dce8]/60" />

            <div className="h-[2px] w-10 bg-[#12dce8]" />

          </div>

        </div>


        {/* =====================================================
            SERVICES GRID
        ====================================================== */}

        <div className="mt-9 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">

          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <div
                key={index}
                className="
                  group
                  flex
                  min-h-[184px]
                  items-center
                  gap-6
                  rounded-2xl
                  bg-[#eeeeee]
                  px-6
                  py-5
                  shadow-lg
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:shadow-2xl
                "
              >

                {/* Service Illustration */}

                <div className="flex h-32 w-32 shrink-0 items-center justify-center">

                  <img
                    src={service.image}
                    alt={service.title}
                    className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      e.currentTarget.nextElementSibling.style.display = "flex";
                    }}
                  />

                  {/* Fallback Icon */}

                  <div className="hidden h-24 w-24 items-center justify-center rounded-2xl bg-[#d9eeee]">

                    <Icon
                      size={58}
                      strokeWidth={1.5}
                      className="text-[#087c85]"
                    />

                  </div>

                </div>


                {/* Content */}

                <div className="min-w-0 text-left">

                  <h3 className="text-2xl font-extrabold leading-tight text-black">
                    {service.title}
                  </h3>


                  {/* Cyan Line */}

                  <div className="my-4 h-[3px] w-9 rounded-full bg-[#0daeb8]" />


                  <p className="text-base leading-6 text-gray-900">
                    {service.description}
                  </p>

                </div>

              </div>
            );
          })}

        </div>


        {/* =====================================================
            BENEFITS ROW
        ====================================================== */}

        <div className="mt-9 grid grid-cols-1 divide-y divide-[#12dce8]/30 md:grid-cols-3 md:divide-x md:divide-y-0 lg:grid-cols-5">

          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;

            return (
              <div
                key={index}
                className="
                  flex
                  items-center
                  gap-4
                  px-5
                  py-5
                  lg:px-4
                "
              >

                {/* Icon */}

                <div className="flex h-14 w-14 shrink-0 items-center justify-center">

                  <Icon
                    className="h-12 w-12 text-[#12dce8]"
                    strokeWidth={1.7}
                  />

                </div>


                {/* Text */}

                <div className="text-left">

                  <h3 className="text-xl font-bold leading-6 text-[#12dce8]">
                    {benefit.title}
                    <br />
                    {benefit.title2}
                  </h3>

                  <p className="mt-2 text-sm leading-5 text-white">
                    {benefit.description}
                  </p>

                </div>

              </div>
            );
          })}

        </div>


        {/* =====================================================
            STATISTICS
        ====================================================== */}

        <div className="mt-8 grid grid-cols-1 divide-y divide-[#12dce8]/40 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 lg:divide-x lg:divide-y-0">

          {statistics.map((stat, index) => {
            const Icon = stat.icon;

            return (
              <div
                key={index}
                className="
                  flex
                  items-center
                  gap-4
                  px-5
                  py-5
                  lg:px-4
                "
              >

                {/* Circular Icon */}

                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full border-2 border-[#12dce8]/50">

                  <Icon
                    className="h-10 w-10 text-white"
                    strokeWidth={1.5}
                  />

                </div>


                {/* Number + Label */}

                <div className="text-left">

                  <p className="text-4xl font-extrabold leading-none text-[#12dce8]">
                    {stat.number}
                  </p>

                  <p className="mt-2 text-base font-semibold leading-5 text-white">
                    {stat.title}
                    <br />
                    {stat.title2}
                  </p>

                </div>

              </div>
            );
          })}

        </div>


        {/* =====================================================
            BOTTOM ACCENT
        ====================================================== */}

        <div className="mt-5 flex justify-center">

          <div className="flex items-center gap-2 text-[#12dce8]">

            <ArrowUp className="h-4 w-4" />

            <span className="text-xs font-semibold tracking-[0.25em]">
              BUILD • LEARN • GROW
            </span>

            <ArrowUp className="h-4 w-4" />

          </div>

        </div>

      </div>

    </section>
  );
}