import React from "react";
import { Link, useParams } from "react-router-dom";
import articles from "./articles";

const ArticleDetails = () => {
  const { id } = useParams();

  const article = articles.find(
    (item) => item.id === Number(id)
  );

  if (!article) {
    return (
      <section
        className="
          flex min-h-[70vh] w-full flex-col
          items-center justify-center px-4 text-center
          font-[Arial,Helvetica,sans-serif]
        "
      >
        <h1 className="text-2xl font-bold text-[#173f44] sm:text-3xl">
          Article Not Found
        </h1>

        <p className="mb-6 mt-3 text-sm text-[#666666] sm:text-base">
          Sorry, the article you are looking for does not exist.
        </p>

        <Link
          to="/blog"
          className="
            inline-block rounded-[5px] bg-[#004b55]
            px-5 py-3 text-sm font-semibold text-white
            no-underline transition duration-300
            hover:bg-[#006d6d]
          "
        >
          ← Back to Articles
        </Link>
      </section>
    );
  }

  return (
    <section
      className="
        min-h-screen w-full bg-white
        px-4 py-8
        font-[Arial,Helvetica,sans-serif]

        sm:px-6 sm:py-10
        md:px-[7%] md:py-12
        lg:px-[8%] lg:py-[50px]
      "
    >
      <div className="mx-auto w-full max-w-[1100px]">
        {/* <Link
          to="/blog"
          className="
            mb-6 inline-block rounded-[5px]
            bg-[#004b55] px-5 py-3
            text-sm font-semibold text-white
            no-underline transition duration-300
            hover:bg-[#006d6d]
          "
        >
          ← Back to Articles
        </Link> */}

        <div
          className="
            mb-6 h-[220px] w-full overflow-hidden rounded-[10px]

            sm:h-[300px]
            md:h-[380px]
            lg:h-[430px]
          "
        >
          <img
            src={article.image}
            alt={article.title}
            className="block h-full w-full object-cover"
          />
        </div>

        <span
          className="
            mb-4 inline-block rounded-[4px]
            bg-[#004b55] px-3 py-2
            text-xs font-bold text-white
          "
        >
          {article.category}
        </span>

        <h1
          className="
            mb-4 mt-0 text-[26px]
            font-bold leading-[1.25] text-[#173f44]

            sm:text-[32px]
            md:text-[36px]
            lg:text-[38px]
          "
        >
          {article.title}
        </h1>

        <p
          className="
            mb-7 mt-0 text-[14px]
            font-semibold leading-[1.7] text-[#666666]

            sm:text-[15px]
            md:text-[16px]
            lg:text-[17px]
          "
        >
          {article.description}
        </p>

        <div className="w-full max-w-[900px]">
          {article.content.map((paragraph, index) => (
            <p
              key={index}
              className="
                mb-5 mt-0 text-[14px]
                leading-[1.8] text-[#444444]

                sm:text-[15px]
                md:text-[16px]
                md:leading-[1.9]
              "
            >
              {paragraph}
            </p>
          ))}
        </div>

        <Link
          to="/blog"
          className="
            mb-5 mt-5 inline-block rounded-[5px]
            bg-[#004b55] px-5 py-3
            text-sm font-semibold text-white
            no-underline transition duration-300
            hover:bg-[#006d6d]
          "
        >
          ← Back to Articles
        </Link>
      </div>
    </section>
  );
};

export default ArticleDetails;