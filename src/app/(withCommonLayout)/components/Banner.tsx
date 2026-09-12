"use client";
import React, { useState } from "react";
import "keen-slider/keen-slider.min.css";
import Container from "../../../shared/components/ui/Container";
import { FaSearch, FaBed } from "react-icons/fa";
import { IoMdCheckmark } from "react-icons/io";
import { MdCategory, MdOutlineEventNote } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { useKeenSlider } from "keen-slider/react";
import { useRouter } from "next/navigation";

const images = [
  "/banner03.jpg",
  "/banner02.jpg",
  "/banner01.jpg",
  "/banner04.jpg",
  "/banner05.jpg",
];

const Banner = () => {
  const router = useRouter();
  const [generalQuery, setGeneralQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");
  const [categoryQuery, setCategoryQuery] = useState("");
  const [bedroomQuery, setBedroomQuery] = useState("");

  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    created: (slider) => {
      setInterval(() => {
        slider.next();
      }, 5000);
    },
  });

  const handleSearch = () => {
    const queryParams = new URLSearchParams({
      general: generalQuery,
      location: locationQuery,
      category: categoryQuery,
      bedroom: bedroomQuery,
    }).toString();

    router.push(`/Search?${queryParams}`);
  };

  return (
    <div className="keen-slider relative h-[120vh] md:h-[80vh]">
      <div ref={sliderRef} className="keen-slider relative h-full">
        {images.map((img, idx) => (
          <div
            key={idx}
            className="keen-slider__slide w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${img})` }}
          />
        ))}
      </div>

      <div className="absolute z-10 top-0 left-0 w-full h-full md:flex items-center">
        <Container>
          <div className="py-5 md:py-32 font-semibold p-3 md:p-0">
            <div className="md:w-[600px] bg-[#2a476604] backdrop-blur-md md:p-5 rounded-md">
              <h5 className="text-white text-2xl md:text-5xl drop-shadow-[1px_1px_2px_rgba(0,0,0,0.7)] mt-24 md:mt-0">
                Find your dream house!
              </h5>
              <p className="text-white text-2xl drop-shadow-[1px_1px_2px_rgba(0,0,0,0.7)] mt-2">
                We are offering the best Real Estate Deals
              </p>
              <ul className="text-white text-lg mt-5 md:mt-10">
                <li className="flex gap-3 items-center">
                  <span className="border-2 border-yellow p-1 text-sm rounded-full">
                    <FaLocationDot />
                  </span>
                  <span className="drop-shadow-[1px_1px_2px_rgba(0,0,0,0.7)]">
                    We sell a property every 45 minutes
                  </span>
                </li>
                <li className="flex gap-3 items-center mt-3">
                  <span className="border-2 border-yellow p-1 text-sm rounded-full">
                    <IoMdCheckmark />
                  </span>
                  <span className="drop-shadow-[1px_1px_2px_rgba(0,0,0,0.7)]">
                    We abide by the strictest codes of practice
                  </span>
                </li>
                <li className="flex gap-3 items-center mt-3">
                  <span className="border-2 border-yellow p-1 text-sm rounded-full">
                    <MdOutlineEventNote />
                  </span>
                  <span className="drop-shadow-[1px_1px_2px_rgba(0,0,0,0.7)]">
                    12,300 buyers registered each month
                  </span>
                </li>
              </ul>
            </div>

            <div className="mt-14 mb-10">
              <h5 className="p-5 text-white text-2xl font-semibold capitalize bg-seaBlue md:w-[350px]">
                Search best home
              </h5>
              <div className="md:flex gap-2 p-3 bg-seaBlue">
                <div className="flex items-center gap-3 p-3 bg-white">
                  <FaSearch className="text-gray-400" />
                  <input
                    className="w-52 outline-none text-sm text-black"
                    placeholder="What are you looking for?"
                    value={generalQuery}
                    onChange={(e) => setGeneralQuery(e.target.value)}
                  />
                </div>
                <div className="flex items-center gap-3 p-3 bg-white mt-2 md:mt-0">
                  <FaLocationDot className="text-gray-400" />
                  <input
                    className="w-52 outline-none text-sm text-black"
                    placeholder="All Locations"
                    value={locationQuery}
                    onChange={(e) => setLocationQuery(e.target.value)}
                  />
                </div>
                <div className="flex items-center gap-3 p-3 bg-white mt-2 md:mt-0">
                  <MdCategory className="text-gray-400" />
                  <input
                    className="w-52 outline-none text-sm text-black"
                    placeholder="Categories"
                    value={categoryQuery}
                    onChange={(e) => setCategoryQuery(e.target.value)}
                  />
                </div>
                <div className="flex items-center gap-3 p-3 bg-white mt-2 md:mt-0">
                  <FaBed className="text-gray-400" />
                  <input
                    className="w-52 outline-none text-sm text-black"
                    placeholder="Bedroom"
                    value={bedroomQuery}
                    onChange={(e) => setBedroomQuery(e.target.value)}
                  />
                </div>
                <button
                  onClick={handleSearch}
                  className="gap-3 p-3 w-full md:w-auto px-6 bg-yellow text-white text-sm uppercase hover:bg-[#ffb958] transition-all duration-700 mt-2 md:mt-0 font-bold"
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Banner;
