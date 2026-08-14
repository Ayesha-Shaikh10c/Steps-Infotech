import "./portfolio.css";

const projects = [
  {
    id: 1,
    title: "",
    category: "Web Development",
    image: "https://via.placeholder.com/400x250",
  },
  {
    id: 2,
    title: "Hospital Management",
    category: "Software Solution",
    image: "https://via.placeholder.com/400x250",
  },
  {
    id: 3,
    title: "School ERP",
    category: "Web Application",
    image: "https://via.placeholder.com/400x250",
  },
  {
    id: 4,
    title: "Food Delivery App",
    category: "Mobile App",
    image: "https://via.placeholder.com/400x250",
  },
  {
    id: 5,
    title: "CRM Dashboard",
    category: "Business Solution",
    image: "https://via.placeholder.com/400x250",
  },
  {
    id: 6,
    title: "Travel Booking",
    category: "Website",
    image: "https://via.placeholder.com/400x250",
  },
];

const Portfolio = () => {
  return (
    <>
      <section className="portfolio-hero">
        <div className="hero-content">
          <h1>Our Portfolio</h1>
          <p>
            Explore our latest projects that showcase innovation,
            creativity, and cutting-edge technology.
          </p>
        </div>
      </section>

      <section className="portfolio-section">
        <h2>Featured Projects</h2>

        <div className="portfolio-grid">
          {projects.map((project) => (
            <div className="portfolio-card" key={project.id}>
              <img src={project.image} alt={project.title} />

              <div className="portfolio-content">
                <h3>{project.title}</h3>
                <p>{project.category}</p>

                <button>View Project</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="portfolio-cta">
        <h2>Have a Project in Mind?</h2>

        <p>
          Let's build something amazing together with modern technologies.
        </p>

        <button>Contact Us</button>
      </section>
    </>
  );
};

export default Portfolio;