import SectionHeading from "../../components/ui/SectionHeading";
import ContactForm from "../../components/contact/ContactForm";
import ContactInfo from "../../components/contact/ContactInfo";
import ContactFAQ from "../../components/contact/ContactFAQ";

export default function Contact() {
  return (
    <>
      <section className="bg-white font-body">
        <div className="max-w-6xl mx-auto px-6 md:px-8 py-16 md:py-20">
          <SectionHeading
            eyebrow="Get In Touch"
            title="Let's Start The Conversation"
            subtitle="Whether you're a student exploring internships or a business exploring our services, we'd love to hear from you."
            align="center"
            className="mb-14"
          />

          <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-10 lg:gap-14 items-start">
            <ContactForm />
            <ContactInfo />
          </div>
        </div>
      </section>

      <ContactFAQ />
    </>
  );
}
