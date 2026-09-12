import React from "react";
import Banner from "./components/Banner";
import LatestSale from "./components/LatestSale";
import FeaturedListing from "./components/FeaturedListing";
import TrustedCompany from "./components/TrustedCompany";
import OurService from "./components/OurService";
import Testimonials from "./components/Testimonials";
import OurTeam from "./components/OurTeam";
import PopularPlace from "./components/PopularPlace";
import RecentSell from "./components/RecentSell";

const page = () => {
  return (
    <div>
      <Banner />
      <TrustedCompany />
      <FeaturedListing />
      <OurService />
      <LatestSale />
      <Testimonials />
      <RecentSell />
      <PopularPlace />
      <OurTeam />
    </div>
  );
};

export default page;
