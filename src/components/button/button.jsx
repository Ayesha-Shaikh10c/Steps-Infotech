import { Link } from "react-router-dom";

// Shared Button — every clickable action on the site should go through
// this instead of a raw <button>/<a> with hand-rolled classes.
//
// WHY THIS MATTERS: before this, 28 different <button> tags across the
// codebase each invented their own colors (#20ef4b, #12cbd8, blue-600,
// black...). This is the one place button styling lives now — change a
// variant here and it updates everywhere that variant is used.
//
// Usage:
//   <Button>Get Started</Button>                      -> primary, medium
//   <Button variant="outline" size="lg">Learn More</Button>
//   <Button to="/contact">Contact Us</Button>          -> renders as a Link
//   <Button href="#top">Back to top</Button>           -> renders as an <a>
//   <Button type="submit">Send</Button>                -> renders as <button type="submit">

const VARIANTS = {
  primary:
    "bg-brand-teal text-white hover:bg-brand-teal-dark shadow-lg",
  secondary:
    "bg-brand-navy text-white hover:bg-brand-desc shadow-lg",
  outline:
    "border-2 border-brand-teal text-brand-teal bg-transparent hover:bg-brand-teal hover:text-white",
  ghost:
    "text-brand-teal bg-transparent hover:bg-brand-info",
  // The one approved "pop" accent -- use sparingly, for a single
  // stand-out CTA on a screen (e.g. hero primary action), not everywhere.
  accent:
    "bg-brand-cyan text-brand-navy hover:brightness-95 shadow-lg",
};

const SIZES = {
  sm: "px-4 py-2 text-sm gap-1.5",
  md: "px-6 py-3 text-base gap-2",
  lg: "px-8 py-4 text-lg gap-2",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  to,
  href,
  type = "button",
  className = "",
  icon,
  ...rest
}) {
  const classes = `inline-flex items-center justify-center rounded-2xl font-semibold
    transition-all duration-300 hover:scale-105 active:scale-100
    ${VARIANTS[variant] ?? VARIANTS.primary}
    ${SIZES[size] ?? SIZES.md}
    ${className}`;

  // Internal navigation
  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {children}
        {icon}
      </Link>
    );
  }

  // External link / anchor
  if (href) {
    return (
      <a href={href} className={classes} {...rest}>
        {children}
        {icon}
      </a>
    );
  }

  // Plain button (forms, modals, toggles)
  return (
    <button type={type} className={classes} {...rest}>
      {children}
      {icon}
    </button>
  );
}
