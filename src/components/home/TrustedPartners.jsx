function TrustedPartners() {
  const companies = [
    {
      name: "Google",
      image: "/assets/google.png",
    },
    {
      name: "Microsoft",
      image: "/assets/microsoft.png",
    },
    {
      name: "Oracle",
      image: "/assets/oracle.png",
    },
    {
      name: "LinkedIn",
      image: "/assets/linkedin.png",
    },
  ];

  return (
    <section className="bg-[#00484d] px-6 pb-7 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-[1100px]">
        <h2 className="text-center text-[18px] font-bold">
          Our Trusted Partners & Clients
        </h2>

        <div className="mt-4 grid grid-cols-2 gap-6 md:grid-cols-4">
          {companies.map((company) => (
            <div
              key={company.name}
              className="flex h-[48px] items-center justify-center rounded-md bg-[#dedede] px-5"
            >
              <img
                src={company.image}
                alt={company.name}
                className="max-h-[27px] max-w-[120px] object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TrustedPartners;