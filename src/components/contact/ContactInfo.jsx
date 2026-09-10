import { FaLocationDot, FaPhone, FaEnvelope, FaClock } from "react-icons/fa6";
import Card from "../ui/Card";

const DETAILS = [
  {
    icon: FaLocationDot,
    label: "Office",
    lines: ["123, Tawheed Heights,", "Kondhwa Kh, Pune - 411048, India"],
  },
  {
    icon: FaPhone,
    label: "Phone",
    lines: ["+91 9876543210"],
  },
  {
    icon: FaEnvelope,
    label: "Email",
    lines: ["stepsinfotech@org.com"],
  },
  {
    icon: FaClock,
    label: "Office Hours",
    lines: ["Mon – Sat, 9:00 AM – 6:00 PM"],
  },
];

export default function ContactInfo() {
  return (
    <div className="space-y-4">
      {DETAILS.map(({ icon: Icon, label, lines }) => (
        <Card key={label} padding="sm" rounded="rounded-xl" hover={false} className="flex gap-4">
          <div className="w-10 h-10 shrink-0 rounded-lg bg-brand-info flex items-center justify-center text-brand-teal">
            <Icon />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-text-muted mb-1">
              {label}
            </p>
            {lines.map((line) => (
              <p key={line} className="text-sm text-text-strong">
                {line}
              </p>
            ))}
          </div>
        </Card>
      ))}

      <div className="rounded-xl overflow-hidden border border-border h-56">
        <iframe
          title="Steps Infotech office location"
          src="https://www.google.com/maps?q=Kondhwa+Khurd,+Pune,+Maharashtra&output=embed"
          className="w-full h-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  );
}
