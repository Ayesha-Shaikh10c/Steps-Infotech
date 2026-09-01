import React from "react";
import {
  Award,
  ArrowRight,
  Quote,
  Star,
  Users,
  TrendingUp,
  CheckCircle2,
  BriefcaseBusiness,
  GraduationCap,
} from "lucide-react";

const testimonials = [
  {
    text: "Steps Infotech helped me gain practical skills and confidence. The live projects and mentor support are excellent!",
    name: "Dayyan Kazi",
    role: "Web Developer Intern",
    img: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    text: "I learned so much during my internship. The environment is professional and supportive. Highly recommended!",
    name: "Sayma Shaikh",
    role: "UI/UX Design Intern",
    img: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    text: "Great place to start your career in IT. The training, projects and placement support are outstanding.",
    name: "Mohid Ali",
    role: "AI/ML Intern",
    img: "https://randomuser.me/api/portraits/men/45.jpg",
  },
  {
    text: "The guidance and resources provided by Steps Infotech helped me grow technically and personally.",
    name: "Ananya Verma",
    role: "Data Science Intern",
    img: "https://randomuser.me/api/portraits/women/68.jpg",
  },
];

const stats = [
  {
    icon: Star,
    number: "4.9/5",
    label: "Student Rating",
  },
  {
    icon: Users,
    number: "10K+",
    label: "Happy Interns",
  },
  {
    icon: TrendingUp,
    number: "90%",
    label: "Satisfaction",
  },
];

export default function SuccessStories() {
  return (
    <section className="relative w-full overflow-hidden bg-[#061c22] px-5 py-16 text-white sm:px-8 md:px-10 lg:px-14 lg:py-20">

      {/* ================= BACKGROUND DECORATION ================= */}

      <div className="pointer-events-none absolute -left-40 top-10 h-80 w-80 rounded-full bg-[#12dce8]/10 blur-3xl" />

      <div className="pointer-events-none absolute -right-40 bottom-20 h-96 w-96 rounded-full bg-[#12dce8]/10 blur-3xl" />

      <div className="pointer-events-none absolute left-1/2 top-0 h-40 w-40 -translate-x-1/2 rounded-full bg-[#12dce8]/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">

        {/* =====================================================
            HEADING AREA
        ====================================================== */}

        <div className="relative mx-auto max-w-6xl">

          {/* ================= LEFT COMPANY CARD ================= */}

          <div className="absolute left-0 top-2 hidden xl:block">

            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#0a2930] px-5 py-4 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-[#12dce8]/40">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#12dce8]/10">

                <BriefcaseBusiness className="h-6 w-6 text-[#12dce8]" />

              </div>

              <div className="text-left">

                <p className="text-base font-bold text-white">
                  Industry Exposure
                </p>

                <p className="mt-1 text-xs text-gray-400">
                  Learn through real projects
                </p>

              </div>

            </div>

          </div>


          {/* ================= RIGHT COMPANY CARD ================= */}

          <div className="absolute right-0 top-2 hidden xl:block">

            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#0a2930] px-5 py-4 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-[#12dce8]/40">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#12dce8]/10">

                <GraduationCap className="h-6 w-6 text-[#12dce8]" />

              </div>

              <div className="text-left">

                <p className="text-base font-bold text-white">
                  Expert Mentorship
                </p>

                <p className="mt-1 text-xs text-gray-400">
                  Guidance from industry experts
                </p>

              </div>

            </div>

          </div>


          {/* ================= CENTER HEADING ================= */}

          <div className="mx-auto max-w-3xl text-center">

            {/* Small Label */}

            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#12dce8]/30 bg-[#12dce8]/10 px-4 py-2">

              <Star
                className="h-4 w-4 fill-[#12dce8] text-[#12dce8]"
              />

              <span className="text-sm font-semibold text-[#12dce8]">
                What students say
              </span>

            </div>


            {/* Main Heading */}

            <h2 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl md:text-6xl">

              <span className="text-white">
                Success{" "}
              </span>

              <span className="text-[#12dce8]">
                Stories
              </span>

            </h2>


            {/* Bigger Description */}

            <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-gray-300 sm:text-xl sm:leading-8 lg:text-[21px] lg:leading-9">

              Our student success is our biggest achievement. Here&apos;s what
              they have to say about their journey with Steps Infotech.

            </p>

          </div>


          {/* ================= SMALL BADGES ================= */}

          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">

            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-[#0a2930] px-4 py-2">

              <CheckCircle2 className="h-4 w-4 text-[#12dce8]" />

              <span className="text-sm text-gray-300">
                Verified Student Reviews
              </span>

            </div>


            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-[#0a2930] px-4 py-2">

              <TrendingUp className="h-4 w-4 text-[#12dce8]" />

              <span className="text-sm text-gray-300">
                Career-Focused Learning
              </span>

            </div>

          </div>

        </div>


        {/* =====================================================
            QUICK STATS
        ====================================================== */}

        <div className="mx-auto mt-10 grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-3">

          {stats.map((stat, index) => {

            const Icon = stat.icon;

            return (
              <div
                key={index}
                className="
                  flex
                  min-h-[76px]
                  items-center
                  justify-center
                  gap-4
                  rounded-2xl
                  border
                  border-white/10
                  bg-[#0a2930]
                  px-6
                  py-4
                  shadow-lg
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-[#12dce8]/40
                  hover:shadow-xl
                "
              >

                {/* ICON */}

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#12dce8]/10">

                  <Icon
                    className={`h-6 w-6 ${
                      index === 0
                        ? "fill-[#12dce8] text-[#12dce8]"
                        : "text-[#12dce8]"
                    }`}
                  />

                </div>


                {/* TEXT */}

                <div className="text-left">

                  <p className="text-xl font-bold leading-tight text-white">
                    {stat.number}
                  </p>

                  <p className="mt-1 text-sm font-medium text-gray-400">
                    {stat.label}
                  </p>

                </div>

              </div>
            );
          })}

        </div>


        {/* =====================================================
            TESTIMONIAL CARDS
        ====================================================== */}

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">

          {testimonials.map((testimonial, index) => (

            <div
              key={index}
              className="
                group
                relative
                flex
                min-h-[315px]
                flex-col
                justify-between
                overflow-hidden
                rounded-2xl
                border
                border-white/10
                bg-[#e9eeee]
                p-6
                text-left
                shadow-lg
                transition-all
                duration-300
                hover:-translate-y-2
                hover:border-[#12dce8]/50
                hover:shadow-[0_15px_40px_rgba(0,0,0,0.3)]
              "
            >

              {/* Top Cyan Line */}

              <div className="absolute left-0 top-0 h-1 w-full bg-[#12dce8]" />


              {/* Review Content */}

              <div>

                <div className="mb-4 flex items-center justify-between">

                  <Quote
                    size={32}
                    fill="currentColor"
                    className="text-[#12cbd8]"
                  />

                  <div className="flex gap-0.5">

                    {[1, 2, 3, 4, 5].map((star) => (

                      <Star
                        key={star}
                        size={14}
                        className="fill-[#f5b942] text-[#f5b942]"
                      />

                    ))}

                  </div>

                </div>


                <p className="text-[15px] leading-7 text-gray-800">
                  {testimonial.text}
                </p>

              </div>


              {/* Student Details */}

              <div className="mt-7 flex items-center gap-3 border-t border-gray-300 pt-5">

                <img
                  src={testimonial.img}
                  alt={testimonial.name}
                  className="
                    h-12
                    w-12
                    shrink-0
                    rounded-full
                    object-cover
                    ring-2
                    ring-[#12cbd8]
                  "
                />

                <div>

                  <p className="font-bold text-gray-900">
                    {testimonial.name}
                  </p>

                  <p className="text-sm font-medium text-[#0798a5]">
                    {testimonial.role}
                  </p>

                </div>


                <CheckCircle2
                  size={18}
                  className="ml-auto shrink-0 text-[#08aab5]"
                />

              </div>

            </div>

          ))}

        </div>


        {/* =====================================================
            SUCCESS MESSAGE
        ====================================================== */}

        <div className="mx-auto mt-12 max-w-3xl text-center">

          <div className="mb-4 flex items-center justify-center gap-3">

            <div className="h-px w-12 bg-[#12dce8]/40" />

            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#12dce8] sm:text-sm">
              Your success matters
            </span>

            <div className="h-px w-12 bg-[#12dce8]/40" />

          </div>


          <p className="text-lg text-gray-300">
            Your journey could be the next success story we celebrate.
          </p>

        </div>


        {/* =====================================================
            CTA BANNER
        ====================================================== */}

        <div className="mt-10 flex flex-col items-center justify-between gap-6 rounded-2xl bg-[#12cbd8] px-6 py-7 shadow-xl sm:px-8 md:flex-row md:px-10">

          {/* CTA CONTENT */}

          <div className="flex items-center gap-4 text-left">

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/20">

              <Award
                className="h-8 w-8 text-gray-900"
                strokeWidth={2}
              />

            </div>


            <div>

              <h3 className="text-xl font-extrabold text-gray-900 sm:text-2xl">
                Ready to Start Your Journey?
              </h3>

              <p className="mt-1 text-sm leading-6 text-gray-900 sm:text-base">
                Join Steps Infotech and take the first step towards a
                successful IT career.
              </p>

            </div>

          </div>


          {/* CTA BUTTON */}

          <button
            className="
              flex
              shrink-0
              items-center
              gap-2
              rounded-full
              bg-white
              px-6
              py-3
              font-semibold
              text-[#0798a5]
              shadow-md
              transition-all
              duration-300
              hover:scale-105
              hover:bg-gray-100
              active:scale-95
            "
          >

            <span>
              Apply for Internship
            </span>

            <ArrowRight className="h-4 w-4" />

          </button>

        </div>

      </div>

    </section>
  );
}