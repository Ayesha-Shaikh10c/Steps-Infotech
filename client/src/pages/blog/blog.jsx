import React, { useState } from "react";
import ArticleDetails from "../../components/blog/ArticleDetails";

import Hero from "../../components/blog/Hero";
import Topics from "../../components/blog/Topics";
import FeaturedArticles from "../../components/blog/FeaturedArticles";
import Sidebar from "../../components/blog/Sidebar";

function Blog() {
  const [selectedTopic, setSelectedTopic] =
    useState("All Posts");

  return (
    <>
      <Hero />

      <Topics
        selectedTopic={selectedTopic}
        setSelectedTopic={setSelectedTopic}
      />

      <main
        className="
          mx-auto
          flex
          w-full
          items-start
          gap-[30px]
          px-[5%]
          max-[900px]:flex-col
          max-[900px]:gap-0
        "
      >
        <FeaturedArticles
          selectedTopic={selectedTopic}
        />

        <Sidebar
          selectedTopic={selectedTopic}
          setSelectedTopic={setSelectedTopic}
        />
      </main>
    </>
  );
}

export default Blog;