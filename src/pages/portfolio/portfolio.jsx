import React from "react";
import Hero from "../../components/portfolio/hero";
import Card from"../../components/portfolio/cards";
import Rating from"../../components/portfolio/rating";
import Service from"../../components/portfolio/service";
import Project from"../../components/portfolio/project";



const Portfolio = () => {
  return (
    <>
      <Hero />
      <Card/>
      <Rating/>
      <Service/>
      <Project/>
    </>
  );
};


export default Portfolio;