import React from "react";
import {
  ShieldCheck,
  Users,
  Lightbulb,
  Award,
  Handshake,
} from "lucide-react";

export default function Values() {
  const values = [
    {
      number: "01",
      title: "Integrity and Transparency",
      description:
        "We believe in honest communication, ethical practices, and complete transparency in everything we do.",
      icon: ShieldCheck,
    },
    {
      number: "02",
      title: "Client Success",
      description:
        "Our focus is on understanding our clients' needs and delivering solutions that create meaningful results.",
      icon: Users,
    },
    {
      number: "03",
      title: "Innovation",
      description:
        "We embrace new ideas, technologies, and creative approaches to build smarter digital solutions.",
      icon: Lightbulb,
    },
    {
      number: "04",
      title: "Excellence",
      description:
        "We continuously strive for high-quality work and maintain strong standards across every project.",
      icon: Award,
    },
    {
      number: "05",
      title: "Teamwork",
      description:
        "We work together, share ideas, and support one another to achieve common goals.",
      icon: Handshake,
    },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#075e63] via-[#0f7f83] to-[#159da0] px-[30px] py-[90px]">

      {/* ================= BACKGROUND DECORATION ================= */}

      <div className="absolute -left-[120px] top-[80px] h-[300px] w-[300px] rounded-full bg-[#5de4e4]/20 blur-3xl" />

      <div className="absolute -right-[100px] bottom-[20px] h-[350px] w-[350px] rounded-full bg-[#8defff]/20 blur-3xl" />

      <div className="absolute left-[45%] top-[20px] h-[180px] w-[180px] rounded-full bg-white/5 blur-3xl" />


      {/* ================= HEADING ================= */}

      <div className="relative mx-auto max-w-[900px] text-center">

        {/* Small Heading */}

        <p className="mb-[12px] text-[15px] font-bold uppercase tracking-[5px] text-[#a8f3f3]">
          Our Values
        </p>


        {/* Main Heading */}

        <h2 className="text-[42px] font-bold tracking-tight text-white md:text-[50px]">
          What We Believe In
        </h2>


        {/* Description */}

        <p className="mx-auto mt-[18px] max-w-[650px] text-[17px] leading-[1.7] text-[#e1ffff]">
          Our values guide the way we work, build relationships, and create
          meaningful solutions for our clients.
        </p>


        {/* Heading Line */}

        <div className="mx-auto mt-[25px] h-[4px] w-[75px] rounded-full bg-[#a8f3f3]" />

      </div>



      {/* ================= VALUES CARDS ================= */}

      <div className="relative mx-auto mt-[55px] grid max-w-[1250px] grid-cols-1 gap-[22px] sm:grid-cols-2 lg:grid-cols-5">

        {values.map((value) => {

          const Icon = value.icon;

          return (
            <div
              key={value.number}
              className="
                group
                relative
                min-h-[300px]
                overflow-hidden
                rounded-[24px]
                border
                border-white/40
                bg-white
                p-[28px]

                shadow-[0_10px_30px_rgba(0,0,0,0.15)]

                transition-all
                duration-500
                ease-out

                hover:-translate-y-[12px]
                hover:scale-[1.02]
                hover:border-[#a8f3f3]
                hover:shadow-[0_25px_50px_rgba(0,0,0,0.25)]
              "
            >

              {/* ================= TOP ACCENT ================= */}

              <div
                className="
                  absolute
                  left-0
                  top-0
                  h-[5px]
                  w-0
                  bg-gradient-to-r
                  from-[#159da0]
                  to-[#075e63]
                  transition-all
                  duration-500
                  group-hover:w-full
                "
              />


              {/* ================= NUMBER + ICON ================= */}

              <div className="flex items-center justify-between">

                {/* Number */}

                <span
                  className="
                    text-[15px]
                    font-bold
                    tracking-[2px]
                    text-[#a8b8be]
                    transition-colors
                    duration-300
                    group-hover:text-[#159da0]
                  "
                >
                  {value.number}
                </span>


                {/* Icon */}

                <div
                  className="
                    flex
                    h-[55px]
                    w-[55px]
                    items-center
                    justify-center
                    rounded-[16px]
                    bg-[#e1fafa]

                    transition-all
                    duration-500

                    group-hover:scale-110
                    group-hover:bg-[#a8eeee]
                  "
                >
                  <Icon
                    size={27}
                    strokeWidth={1.8}
                    className="
                      text-[#299294]
                      transition-transform
                      duration-500
                      group-hover:rotate-6
                    "
                  />
                </div>

              </div>



              {/* ================= TITLE ================= */}

              <h3
                className="
                  mt-[35px]
                  text-[21px]
                  font-bold
                  leading-[1.25]
                  text-[#101820]

                  transition-colors
                  duration-300

                  group-hover:text-[#176e74]
                "
              >
                {value.title}
              </h3>



              {/* ================= SMALL LINE ================= */}

              <div
                className="
                  mt-[15px]
                  h-[3px]
                  w-[45px]
                  rounded-full
                  bg-[#31979a]

                  transition-all
                  duration-500

                  group-hover:w-[70px]
                "
              />



              {/* ================= DESCRIPTION ================= */}

              <p
                className="
                  mt-[18px]
                  text-[15px]
                  leading-[1.65]
                  text-[#64747f]
                "
              >
                {value.description}
              </p>



              {/* ================= CARD GLOW ================= */}

              <div
                className="
                  pointer-events-none
                  absolute
                  -bottom-[80px]
                  -right-[80px]
                  h-[160px]
                  w-[160px]
                  rounded-full
                  bg-[#a8f3f3]/30
                  blur-2xl

                  transition-all
                  duration-500

                  group-hover:scale-[1.5]
                "
              />

            </div>
          );
        })}

      </div>

    </section>
  );
}