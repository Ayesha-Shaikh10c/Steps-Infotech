import { ArrowRight, Award } from "lucide-react";

const testimonials = [
  {
    name: "Dayyan Kazi",
    role: "Web Developer Intern",
    image: "/assets/dayyan.png",
    text: "Steps Infotech helped me gain practical skills and confidence. The live projects and mentor support are excellent!",
  },
  {
    name: "Sayma Shaikh",
    role: "UI/UX Design Intern",
    image: "/assets/sayma.png",
    text: "I learn so much during my internship. The environment is professional and supportive. Highly recommended!",
  },
  {
    name: "Mohid Ali",
    role: "AI/ML Intern",
    image: "/assets/mohid.png",
    text: "Greate place to start your career in IT. The training,projects and placement are outstanding",
  },
];

function SuccessStories() {
  return (
    <section className="bg-[#0a4146] px-6 py-12 sm:px-8 lg:px-10 lg:py-14">
      <div className="mx-auto max-w-[1200px]">
        
        <div className="text-center">
          <p className="text-[12px] font-medium text-[#06d6dd]">
            What students say
          </p>

          <h2 className="mt-1 text-[30px] font-bold sm:text-[36px]">
            Success{" "}
            <span className="text-[#08d5dc]">Stories</span>
          </h2>

          <p className="mx-auto mt-3 max-w-[700px] text-[13px] leading-5 text-white">
            Our student success is our biggest achievement.
            <br />
            Here's what they have to say about their journey with Steps
            Infotech.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {testimonials.map((item) => (
            <article
              key={item.name}
              className="min-h-[165px] rounded-lg bg-[#dedede] p-4 text-[#111]"
            >
              <p className="text-[11px] leading-[1.25]">
                {item.text}
              </p>

              <div className="mt-5 flex items-center gap-2">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-9 w-9 rounded-full object-cover"
                />

                <div>
                  <p className="text-[11px] font-bold">
                    {item.name}
                  </p>

                  <p className="text-[10px] text-[#00bbc3]">
                    {item.role}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-7 flex flex-col gap-3 rounded-lg bg-[#08c3ca] px-5 py-3.5 text-[#00383d] sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <Award size={28} />

            <div>
              <h3 className="text-[16px] font-bold">
                Ready to Start Your Journey?
              </h3>

              <p className="text-[9px]">
                Join Steps Infotech and take the first step towards a
                successful IT career.
              </p>
            </div>
          </div>

          <a
            href="/internships"
            className="flex w-fit items-center gap-1 rounded-md bg-white px-3 py-2 text-[9px] font-semibold text-[#05bbc3]"
          >
            Apply for Internship
            <ArrowRight size={11} />
          </a>
        </div>
      </div>
    </section>
  );
}

export default SuccessStories; 