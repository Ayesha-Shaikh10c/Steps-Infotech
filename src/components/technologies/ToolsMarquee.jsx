function ToolsMarquee() {
  const tools = [
    {
      name: "Git",
      logo: "https://cdn.simpleicons.org/git",
    },
    {
      name: "GitHub",
      logo: "https://cdn.simpleicons.org/github",
    },
   {
  name: "VS Code",
  logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
},
{
  name: "Canva",
  logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/canva/canva-original.svg",
},

    {
      name: "Docker",
      logo: "https://cdn.simpleicons.org/docker",
    },
    {
      name: "Postman",
      logo: "https://cdn.simpleicons.org/postman",
    },
    {
      name: "Jira",
      logo: "https://cdn.simpleicons.org/jira",
    },
    {
      name: "Trello",
      logo: "https://cdn.simpleicons.org/trello",
    },
    {
      name: "Figma",
      logo: "https://cdn.simpleicons.org/figma",
    },
  ];

  const marqueeTools = [...tools, ...tools];

  return (
    <section className="w-full overflow-hidden bg-[#f5f4f1] py-6 sm:py-8">
      <p className="mb-4 text-center text-[10px] font-bold tracking-[2px] text-[#176466] sm:text-xs">
        TOOLS & FRAMEWORKS WE USE
      </p>

      {/* Curved and compact marquee */}
      <div className="mx-auto w-[88%] max-w-[1180px] overflow-hidden rounded-2xl bg-white py-3 shadow-sm">
        <div
          className="flex w-max items-center gap-10 sm:gap-14"
          style={{ animation: "marquee 25s linear infinite" }}
        >
          {marqueeTools.map((tool, index) => (
            <div
              key={`${tool.name}-${index}`}
              className="flex shrink-0 items-center gap-2"
            >
              <img
                src={tool.logo}
                alt={tool.name}
                className="h-6 w-6 object-contain sm:h-7 sm:w-7"
              />

              <span className="whitespace-nowrap text-[11px] font-semibold text-[#29383b] sm:text-xs">
                {tool.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}

export default ToolsMarquee;