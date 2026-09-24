import React from "react";
import Hero from "../../components/portfolio/hero";
import Card from"../../components/portfolio/cards";
import Rating from"../../components/portfolio/rating";
import Service from"../../components/portfolio/service";



const Portfolio = () => {
  return (
    <>
      <Hero />
      <Card/>
      <Rating/>
      <Service/>
    </>
  );
};


export default Portfolio;