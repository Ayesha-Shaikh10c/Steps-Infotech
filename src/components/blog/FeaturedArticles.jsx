import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import articles from "./articles";

const FeaturedArticles = ({ selectedTopic }) => {
  const [visibleCount, setVisibleCount] = useState(8);

  // Category change hone par wapas 8 articles
  useEffect(() => {
    setVisibleCount(8);
  }, [selectedTopic]);

  const filteredArticles =
    selectedTopic === "All Posts"
      ? articles
      : articles.filter(
          (article) =>
            article.category === selectedTopic
        );

  const visibleArticles =
    filteredArticles.slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount(
      (previousCount) =>
        previousCount + 8
    );
  };

  return (
    <section
      id="articles"
      className="
        w-[68%]
        py-[30px]
        pb-[50px]

        max-[1100px]:w-full
        max-[900px]:w-full
      "
    >
      {/* HEADING */}
      <div className="mb-[30px] flex items-center gap-[15px]">
        <h2
          className="
            m-0
            text-[18px]
            font-bold
            text-[#173b40]
          "
        >
          {selectedTopic === "All Posts"
            ? "FEATURED ARTICLES"
            : selectedTopic.toUpperCase()}
        </h2>

        <span
          className="
            h-[2px]
            w-[45px]
            bg-[#173b40]
          "
        />
      </div>

      {/* ARTICLES */}
      <div
        className="
          grid
          grid-cols-6
          gap-[28px]

          max-[1100px]:grid-cols-2
          max-[1100px]:gap-[20px]

          max-[600px]:grid-cols-1
          max-[600px]:gap-[16px]
        "
      >
        {visibleArticles.map((article, index) => {
          const isLarge =
            index < 2 ||
            visibleArticles.length === 1;

          return (
            <div
              key={article.id}
              className={`
                overflow-hidden
                rounded-[10px]
                bg-white
                shadow-[0_4px_14px_rgba(0,0,0,0.12)]

                ${
                  isLarge
                    ? "col-span-3"
                    : "col-span-2"
                }

                max-[1100px]:col-span-1
                max-[600px]:col-span-1
              `}
            >
              {/* IMAGE */}
              <div
                className={`
                  relative
                  w-full
                  overflow-hidden

                  ${
                    isLarge
                      ? `
                        h-[175px]
                        max-[600px]:h-[220px]
                      `
                      : `
                        h-[100px]
                        max-[600px]:h-[180px]
                      `
                  }
                `}
              >
                <img
                  src={article.image}
                  alt={article.title}
                  className="
                    block
                    h-full
                    w-full
                    object-cover
                  "
                />

                {article.featured && (
                  <span
                    className="
                      absolute
                      left-[12px]
                      top-[12px]
                      rounded-[5px]
                      bg-[#18aaa6]
                      px-[11px]
                      py-[7px]
                      text-[10px]
                      font-bold
                      text-white
                    "
                  >
                    FEATURED
                  </span>
                )}
              </div>

              {/* CONTENT */}
              <div
                className="
                  px-[16px]
                  pb-[14px]
                  pt-[18px]
                "
              >
                <h3
                  className={`
                    mb-[14px]
                    mt-0
                    font-bold
                    leading-[1.35]
                    text-[#222]

                    ${
                      isLarge
                        ? "text-[17px]"
                        : "text-[15px]"
                    }
                  `}
                >
                  {article.title}
                </h3>

                <p
                  className="
                    mb-[12px]
                    mt-0
                    text-[11px]
                    leading-[1.5]
                    text-[#777]
                  "
                >
                  {article.description}
                </p>

                <Link
                  to={`/article/${article.id}`}
                  className="
                    text-[12px]
                    font-semibold
                    text-[#159b98]
                    no-underline
                    transition
                    duration-300
                    hover:text-[#108d8a]
                  "
                >
                  Read More →
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* LOAD MORE */}
      {visibleCount < filteredArticles.length && (
        <button
          type="button"
          onClick={handleLoadMore}
          className="
            mx-auto
            mt-[55px]
            block
            cursor-pointer
            rounded-[7px]
            border-none
            bg-[#159b98]
            px-[24px]
            py-[14px]
            text-[13px]
            font-semibold
            text-white
            transition
            duration-300
            hover:bg-[#108d8a]
          "
        >
          Load More Articles →
        </button>
      )}
    </section>
  );
};

export default FeaturedArticles;