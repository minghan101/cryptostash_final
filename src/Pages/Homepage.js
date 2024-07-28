import React from "react";
import Banner from "../components/Banner/Banner";
import CoinsTable from "../components/CoinsTable";
import NewsWidget from "../NewsWidget";

const Homepage = () => {
  return (
    <>
      <Banner />
      <NewsWidget />
      <CoinsTable />
      
    </>
  );
};

export default Homepage;
