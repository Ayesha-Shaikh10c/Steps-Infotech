import React, { useState } from "react";
import { Link } from "react-router-dom";
import articles from "./articles";

const categories = [
  "Web Development",
  "Cyber Security",
  "Cloud Computing",
  "AI & Data",
  "Digital Transformation",
  "DevOps",
  "Technology",
];

const Sidebar = () => {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState("All Posts");

  // NEWSLETTER STATE
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = () => {
    if (email.trim() !== "") {
      setSubscribed(true);
    }
  };

  let filteredArticles =
    selectedCategory === "All Posts"
      ? articles
      : articles.filter(
          (article) =>
            article.category === selectedCategory
        );

  const searchText =
    search.toLowerCase().trim();

  if (searchText !== "") {
    filteredArticles = filteredArticles
      .filter(
        (article) =>
          article.title
            .toLowerCase()
            .includes(searchText) ||
          article.description
            .toLowerCase()
            .includes(searchText) ||
          article.category
            .toLowerCase()
            .includes(searchText)
      )
      .sort((a, b) => {
        const aPosition = a.title
          .toLowerCase()
          .indexOf(searchText);

        const bPosition = b.title
          .toLowerCase()
          .indexOf(searchText);

        return aPosition - bPosition;
      });
  }

  const visibleArticles =
    filteredArticles.slice(0, 4);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setSearch("");
  };

  return (
    <aside
      className="
        w-[30%]
        py-[30px]
        pb-[50px]

        max-[1100px]:w-full
        max-[900px]:w-full
      "
    >
      {/* SEARCH */}
      <div className="mb-[32px]">
        <h2
          className="
            mb-[15px]
            text-[17px]
            font-bold
            text-[#173b40]
          "
        >
          SEARCH ARTICLES
        </h2>

        <div className="flex h-[44px] w-full">
          <input
            type="text"
            placeholder="Search blog..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="
              min-w-0
              flex-1
              border-none
              bg-[#f5f1f1]
              px-[15px]
              text-[13px]
              outline-none
            "
          />

          <button
            type="button"
            className="
              w-[45px]
              shrink-0
              cursor-pointer
              border-none
              bg-[#159b98]
              text-[23px]
              text-white
              transition
              duration-300
              hover:bg-[#108d8a]
            "
          >
            ⌕
          </button>
        </div>
      </div>

      {/* POPULAR POSTS */}
      <div className="mb-[32px]">
        <div className="mb-[15px] flex items-center gap-[12px]">
          <h2
            className="
              m-0
              text-[17px]
              font-bold
              text-[#173b40]
            "
          >
            {selectedCategory === "All Posts"
              ? "POPULAR POSTS"
              : selectedCategory}
          </h2>

          <span
            className="
              h-[2px]
              w-[40px]
              shrink-0
              bg-[#173b40]
            "
          />
        </div>

        <div className="flex flex-col gap-[12px]">
          {visibleArticles.length > 0 ? (
            visibleArticles.map((article) => (
              <div
                key={article.id}
                className="
                  flex
                  min-h-[82px]
                  w-full
                  items-center
                  overflow-hidden
                  rounded-[7px]
                  bg-white
                  shadow-[0_3px_10px_rgba(0,0,0,0.1)]
                "
              >
                <Link
                  to={`/article/${article.id}`}
                  className="
                    block
                    shrink-0
                  "
                >
                  <img
                    src={article.image}
                    alt={article.title}
                    className="
                      h-[82px]
                      w-[85px]
                      object-cover
                    "
                  />
                </Link>

                <Link
                  to={`/article/${article.id}`}
                  className="
                    min-w-0
                    p-[10px]
                    no-underline
                  "
                >
                  <h3
                    className="
                      m-0
                      line-clamp-3
                      text-[14px]
                      leading-[1.3]
                      text-[#222]
                    "
                  >
                    {article.title}
                  </h3>
                </Link>
              </div>
            ))
          ) : (
            <p className="text-[14px] text-[#777]">
              No articles found.
            </p>
          )}
        </div>
      </div>

      {/* CATEGORIES */}
      <div className="mb-[32px]">
        <h2
          className="
            mb-[18px]
            text-[17px]
            font-bold
            text-[#173b40]
          "
        >
          CATEGORIES
        </h2>

        {/* ALL POSTS */}
        <div
          onClick={() =>
            handleCategoryClick("All Posts")
          }
          className={`
            mb-[13px]
            flex
            cursor-pointer
            justify-between
            text-[14px]
            transition
            duration-200

            ${
              selectedCategory === "All Posts"
                ? "font-bold text-[#159b98]"
                : "text-[#222] hover:text-[#159b98]"
            }
          `}
        >
          <span>All Posts</span>
          <span>({articles.length})</span>
        </div>

        {/* CATEGORY LIST */}
        {categories.map((category) => {
          const categoryCount =
            articles.filter(
              (article) =>
                article.category === category
            ).length;

          return (
            <div
              key={category}
              onClick={() =>
                handleCategoryClick(category)
              }
              className={`
                mb-[13px]
                flex
                cursor-pointer
                justify-between
                text-[14px]
                transition
                duration-200

                ${
                  selectedCategory === category
                    ? "font-bold text-[#159b98]"
                    : "text-[#222] hover:text-[#159b98]"
                }
              `}
            >
              <span>{category}</span>
              <span>({categoryCount})</span>
            </div>
          );
        })}
      </div>

      {/* NEWSLETTER */}
      <div
        className="
          rounded-[14px]
          bg-[#062d36]
          p-[20px]
          text-white
        "
      >
        <div
          className="
            inline-block
            rounded-[5px]
            bg-[#159b98]
            px-[10px]
            py-[7px]
            text-[10px]
            font-bold
          "
        >
          ✉ &nbsp; STAY UPDATED
        </div>

        <p
          className="
            my-[18px]
            text-[12px]
            leading-[1.5]
          "
        >
          Subscribe to our newsletter and
          get the latest insights delivered
          to your inbox
        </p>

        <div className="flex h-[40px] w-full">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={subscribed}
            className="
              min-w-0
              flex-1
              border-none
              bg-white
              px-[10px]
              text-[11px]
              text-black
              placeholder:text-[#777]
              outline-none
            "
          />

          <button
            type="button"
            onClick={handleSubscribe}
            disabled={subscribed}
            className={`
              shrink-0
              border-none
              px-[12px]
              text-[11px]
              text-white
              transition
              duration-300

              ${
                subscribed
                  ? "cursor-default bg-green-600"
                  : "cursor-pointer bg-[#159b98] hover:bg-[#108d8a]"
              }
            `}
          >
            {subscribed
              ? "Subscribed ✓"
              : "Subscribe →"}
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;