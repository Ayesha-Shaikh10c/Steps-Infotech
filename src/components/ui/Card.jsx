// Shared Card — the base surface for any "boxed" content: service cards,
// testimonial cards, portfolio items, stat blocks, etc.
//
// This does NOT try to cover every card in the site with one shape.
// It gives you two surface tones (light / dark) that already appear
// naturally across your screens, so a Portfolio card and a Services
// card still feel like the same product even though they hold very
// different content.
//
// Usage:
//   <Card>...</Card>                          -> light surface, default padding
//   <Card tone="dark">...</Card>               -> navy/teal-tinted dark surface
//   <Card hover={false} padding="lg">...</Card>

const TONES = {
  light: "bg-surface border border-border text-text-body",
  dark: "bg-brand-navy border border-border-dark text-text-inverse",
  tint: "bg-surface-alt border border-border text-text-body",
};

const PADDING = {
  sm: "p-5",
  md: "p-6 md:p-8",
  lg: "p-8 md:p-10",
};

export default function Card({
  children,
  tone = "light",
  padding = "md",
  hover = true,
  rounded = "rounded-3xl",
  className = "",
  ...rest
}) {
  const hoverClasses = hover
    ? "transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    : "";

  return (
    <div
      className={`${rounded} shadow-md ${TONES[tone] ?? TONES.light} ${
        PADDING[padding] ?? PADDING.md
      } ${hoverClasses} ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}
