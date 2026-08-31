import { FaReact, FaPython, FaJava, FaAws, FaDocker, FaNodeJs, FaMicrosoft } from "react-icons/fa6";
import { SiAngular, SiMysql, SiPostgresql } from "react-icons/si";

const TECHS = [
  { icon: FaReact, label: "React", color: "#61DAFB" },
  { icon: SiAngular, label: "Angular", color: "#DD0031" },
  { icon: FaNodeJs, label: "Node.js", color: "#5FA04E" },
  { icon: FaPython, label: "Python", color: "#3776AB" },
  { icon: FaJava, label: "Java", color: "#EA2D2E" },
  { icon: FaMicrosoft, label: "Azure", color: "#0078D4" },
  { icon: FaDocker, label: "Docker", color: "#2496ED" },
  { icon: SiMysql, label: "MySQL", color: "#4479A1" },
  { icon: SiPostgresql, label: "PostgreSQL", color: "#4169E1" },
  { icon: FaAws, label: "AWS", color: "#FF9900" },
];

export default function Technologies() {
  return (
    <section className="max-w-6xl mx-auto px-6 md:px-8 py-16 md:py-20 font-body">
      <div className="text-center max-w-xl mx-auto mb-4">
        <span className="text-brand-teal font-semibold tracking-widest text-xs md:text-sm">
          TECHNOLOGIES WE USE
        </span>
        <h2 className="font-heading text-brand-navy text-2xl md:text-4xl mt-2">
          Built With The Best Technologies
        </h2>
      </div>
      <div className="w-16 h-0.5 bg-brand-teal mx-auto mb-12" />

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {TECHS.map(({ icon: Icon, label, color }) => (
          <div
            key={label}
            className="flex items-center gap-3 bg-brand-info rounded-full px-5 py-3 justify-center hover:shadow-md transition-shadow"
          >
            <Icon style={{ color }} className="text-xl shrink-0" />
            <span className="text-brand-navy text-sm font-medium">{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
