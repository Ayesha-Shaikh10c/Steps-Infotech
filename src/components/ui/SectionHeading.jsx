// Shared SectionHeading — the "eyebrow + title + subtext" block that
// opens almost every section on the site. Centralizing this is what
// lets each screen have a different COMPOSITION (image-heavy, card
// grid, editorial columns...) while the actual typography — the thing
// visitors subconsciously read as "brand" — stays identical everywhere.
//
// Usage:
//   <SectionHeading eyebrow="Our Solutions" title="What we build" />
//   <SectionHeading
//     title="Client Success Stories"
//     subtitle="Real results from real partnerships."
//     align="center"
//     tone="dark"
//   />

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  tone = "light",
  className = "",
}) {
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";
  const titleColor = tone === "dark" ? "text-text-inverse" : "text-text-strong";
  const subtitleColor = tone === "dark" ? "text-text-inverse/70" : "text-text-muted";

  return (
    <div className={`max-w-2xl ${alignClass} ${className}`}>
      {eyebrow && (
        <span className="inline-block font-body text-sm font-semibold uppercase tracking-wide text-brand-teal mb-3">
          {eyebrow}
        </span>
      )}
      <h2 className={`font-heading ${titleColor} !m-0`}>{title}</h2>
      {subtitle && (
        <p className={`font-body mt-4 text-base md:text-lg ${subtitleColor}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
