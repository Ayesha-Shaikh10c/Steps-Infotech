import {
  Target,
  Eye,
  Gem,
  CircleCheck,
} from "lucide-react";

function MissionVision() {
  const values = [
    "Integrity and transparency",
    "Client success",
    "Innovation",
    "Excellence",
    "Teamwork",
  ];

  return (
    <section className="w-full bg-white px-4 py-12 md:px-8 md:py-16">
      <div className="mx-auto grid max-w-[1024px] grid-cols-1 gap-7 md:grid-cols-3">

        {/* OUR MISSION */}
        <div
          className="
            rounded-[28px]
            border border-[#b8eeee]
            bg-[#a9f5f4]
            px-7 py-8
            shadow-[0_8px_0_rgba(0,0,0,0.18)]
            transition duration-300
            hover:-translate-y-1
            hover:shadow-[0_12px_18px_rgba(0,0,0,0.18)]
          "
        >
          <div className="flex h-[62px] w-[62px] items-center justify-center rounded-2xl bg-white/70">
            <Target
              size={39}
              strokeWidth={1.8}
              className="text-[#238e91]"
            />
          </div>

          <h2 className="mt-5 text-[24px] font-bold text-[#173b4d] md:text-[25px]">
            Our Mission
          </h2>

          <div className="mt-3 h-[3px] w-[55px] rounded-full bg-[#238e91]" />

          <p className="mt-5 text-[15px] font-medium leading-[1.7] text-[#172f3d]">
            To deliver innovative IT solutions that drive business growth,
            enhance efficiency and create lasting value for our clients.
          </p>
        </div>

        {/* OUR VISION */}
        <div
          className="
            rounded-[28px]
            border border-[#b8eeee]
            bg-[#a9f5f4]
            px-7 py-8
            shadow-[0_8px_0_rgba(0,0,0,0.18)]
            transition duration-300
            hover:-translate-y-1
            hover:shadow-[0_12px_18px_rgba(0,0,0,0.18)]
          "
        >
          <div className="flex h-[62px] w-[62px] items-center justify-center rounded-2xl bg-white/70">
            <Eye
              size={39}
              strokeWidth={1.8}
              className="text-[#238e91]"
            />
          </div>

          <h2 className="mt-5 text-[24px] font-bold text-[#173b4d] md:text-[25px]">
            Our Vision
          </h2>

          <div className="mt-3 h-[3px] w-[55px] rounded-full bg-[#238e91]" />

          <p className="mt-5 text-[15px] font-medium leading-[1.7] text-[#172f3d]">
            To be a globally trusted technology partner, recognized for
            innovation, integrity and excellence in everything we do.
          </p>
        </div>

        {/* OUR VALUES */}
        <div
          className="
            rounded-[28px]
            border border-[#b8eeee]
            bg-[#a9f5f4]
            px-7 py-8
            shadow-[0_8px_0_rgba(0,0,0,0.18)]
            transition duration-300
            hover:-translate-y-1
            hover:shadow-[0_12px_18px_rgba(0,0,0,0.18)]
          "
        >
          <div className="flex h-[62px] w-[62px] items-center justify-center rounded-2xl bg-white/70">
            <Gem
              size={39}
              strokeWidth={1.8}
              className="text-[#238e91]"
            />
          </div>

          <h2 className="mt-5 text-[24px] font-bold text-[#173b4d] md:text-[25px]">
            Our Values
          </h2>

          <div className="mt-3 h-[3px] w-[55px] rounded-full bg-[#238e91]" />

          <div className="mt-5 space-y-3">
            {values.map((value) => (
              <div
                key={value}
                className="flex items-center gap-3 text-[14px] font-semibold text-[#172f3d]"
              >
                <CircleCheck
                  size={18}
                  strokeWidth={2}
                  className="shrink-0 text-[#238e91]"
                />

                <span>{value}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

export default MissionVision;