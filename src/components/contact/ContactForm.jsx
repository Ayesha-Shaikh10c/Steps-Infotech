import { useState } from "react";
import { FaCircleCheck } from "react-icons/fa6";
import Button from "../button/button";

const INTEREST_OPTIONS = [
  "Internship Inquiry",
  "Business / Service Inquiry",
  "Partnership",
  "General Question",
];

const initialForm = {
  name: "",
  email: "",
  phone: "",
  interest: INTEREST_OPTIONS[0],
  message: "",
};

export default function ContactForm() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | sent

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear the error for a field as soon as the person starts fixing it
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = "Please enter your name.";
    if (!form.email.trim()) {
      next.email = "Please enter your email.";
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      next.email = "That email doesn't look right.";
    }
    if (!form.message.trim()) next.message = "Please add a short message.";
    return next;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setStatus("sending");

    // NOTE: there's no backend endpoint for this yet (Member 8's API work
    // isn't wired up here). This simulates a network round-trip so the
    // form has a real submit/loading/success flow to demo. Once the
    // backend contact-form route exists, replace this timeout with:
    //
    //   const res = await fetch("/api/contact", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(form),
    //   });
    //
    setTimeout(() => {
      setStatus("sent");
      setForm(initialForm);
    }, 900);
  };

  if (status === "sent") {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl bg-surface-alt px-8 py-16 text-center">
        <FaCircleCheck className="mb-4 text-4xl text-status-success" />
        <h3 className="font-heading text-text-strong text-xl mb-2">
          Message sent
        </h3>
        <p className="text-text-muted text-sm max-w-sm mb-6">
          Thanks for reaching out — we usually reply within 24 hours.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="text-brand-teal text-sm font-semibold hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field
          label="Full Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          error={errors.name}
          placeholder="Your name"
        />
        <Field
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          error={errors.email}
          placeholder="you@example.com"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field
          label="Phone (optional)"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="+91 00000 00000"
        />
        <div>
          <label className="block text-sm font-semibold text-text-strong mb-1.5">
            I'm interested in
          </label>
          <select
            name="interest"
            value={form.interest}
            onChange={handleChange}
            className="w-full rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-text-body outline-none focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/20"
          >
            {INTEREST_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-text-strong mb-1.5">
          Message
        </label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          rows={5}
          placeholder="Tell us a bit about what you're looking for..."
          className={`w-full rounded-lg border bg-surface px-4 py-2.5 text-sm text-text-body outline-none focus:ring-2 resize-none ${
            errors.message
              ? "border-status-error focus:ring-status-error/20"
              : "border-border focus:border-brand-teal focus:ring-brand-teal/20"
          }`}
        />
        {errors.message && (
          <p className="mt-1 text-xs text-status-error">{errors.message}</p>
        )}
      </div>

      <Button
        type="submit"
        variant="primary"
        size="md"
        disabled={status === "sending"}
        className="w-full sm:w-auto disabled:opacity-60 disabled:hover:scale-100"
      >
        {status === "sending" ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
}

function Field({ label, name, value, onChange, error, type = "text", placeholder }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-text-strong mb-1.5">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full rounded-lg border bg-surface px-4 py-2.5 text-sm text-text-body outline-none focus:ring-2 ${
          error
            ? "border-status-error focus:ring-status-error/20"
            : "border-border focus:border-brand-teal focus:ring-brand-teal/20"
        }`}
      />
      {error && <p className="mt-1 text-xs text-status-error">{error}</p>}
    </div>
  );
}
