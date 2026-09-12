"use client";
import React, { useState } from "react";
import Container from "../../../shared/components/ui/Container";
import { FaBath, FaBed, FaSearch } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { MdCategory } from "react-icons/md";
import { BiSolidCarGarage } from "react-icons/bi";
import { RxSize } from "react-icons/rx";
import Image from "next/image";
import { useGetPropertyQuery } from "../../../shared/redux/api/PropertyApi";
import Link from "next/link";
import { TPropertyTypes } from "../../../shared/types/types";

const FeaturedPage = () => {
  const [generalQuery, setGeneralQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");
  const [categoryQuery, setCategoryQuery] = useState("");
  const [bedroomQuery, setBedroomQuery] = useState("");

  const [activeParams, setActiveParams] = useState<Record<string, any>>({
    propertyFor: "Featured",
    limit: 50,
  });

  const { data: featuredProperty, isFetching } = useGetPropertyQuery(activeParams);

  const handleSearch = () => {
    setActiveParams({
      propertyFor: "Featured",
      search: generalQuery.trim() || undefined,
      city: locationQuery.trim() || undefined,
      propertyCategory: categoryQuery.trim() || undefined,
      bedroom: bedroomQuery ? Number(bedroomQuery) : undefined,
      limit: 50,
    });
  };

  return (
    <div>
      <div className="bg-[#F7F7F7] md:mt-10">
        <Container>
          <ul className="md:flex justify-between gap-2 py-7 px-3 md:px-0">
            <li className="flex items-center gap-3 p-3 bg-white">
              <FaSearch />
              <input
                value={generalQuery}
                onChange={(e) => setGeneralQuery(e.target.value)}
                className="outline-none text-sm w-52"
                placeholder="What are you looking for?"
              />
            </li>
            <li className="flex items-center gap-3 p-3 bg-white mt-2 md:mt-0">
              <FaLocationDot />
              <input
                value={locationQuery}
                onChange={(e) => setLocationQuery(e.target.value)}
                className="outline-none text-sm w-52"
                placeholder="All Locations"
              />
            </li>
            <li className="flex items-center gap-3 p-3 bg-white mt-2 md:mt-0">
              <MdCategory />
              <input
                value={categoryQuery}
                onChange={(e) => setCategoryQuery(e.target.value)}
                className="outline-none text-sm w-52"
                placeholder="Categories"
              />
            </li>
            <li className="flex items-center gap-3 p-3 bg-white mt-2 md:mt-0">
              <FaBed />
              <input
                type="number"
                value={bedroomQuery}
                onChange={(e) => setBedroomQuery(e.target.value)}
                className="outline-none text-sm w-52"
                placeholder="Bedroom"
              />
            </li>
            <button
              onClick={handleSearch}
              className="flex items-center gap-3 p-3 px-7 bg-yellow text-white text-sm uppercase hover:bg-seaBlue transition-all duration-700 mt-2 md:mt-0"
            >
              Search
            </button>
          </ul>
        </Container>
      </div>
      <Container>
        {isFetching ? (
          <div className="text-center py-20 text-seaBlue font-semibold text-lg">
            Loading featured properties...
          </div>
        ) : (
          <div className="md:grid grid-cols-2 gap-7 md:mt-10 p-3 md:p-0">
            {featuredProperty && featuredProperty.length > 0 ? (
              featuredProperty.map((featured: TPropertyTypes) => (
                <div key={featured._id}>
                  <div className="grid grid-cols-1 md:grid-cols-2 drop-shadow-md my-3 md:my-0 bg-white rounded-lg mt-10">
                    <div className="md:rounded-s-lg overflow-hidden">
                      <Image
                        src={featured.propertyImage02 || featured.propertyImage01 || "/banner01.jpg"}
                        alt="featuredImg"
                        width={300}
                        height={300}
                        className="h-full w-full md:rounded-s-lg hover:scale-125 transition-all duration-700 ease-in-out object-cover"
                      />
                    </div>
                    <div className="p-3">
                      <h3 className="mt-1 text-xl font-semibold text-seaBlue">
                        {featured.propertyName}
                      </h3>
                      <p className="mt-2 text-light font-semibold flex gap-3 items-center">
                        <FaLocationDot />
                        {featured.address}, {featured.city}
                      </p>
                      <ul className="grid grid-cols-2 gap-3 text-light mt-3">
                        <li className="flex gap-2 items-center">
                          <FaBed /> <span>Beds</span>
                          <span className="text-seaBlue font-semibold">
                            {featured.bedroom}
                          </span>
                        </li>
                        <li className="flex gap-2 items-center">
                          <FaBath /> <span>Baths</span>
                          <span className="text-seaBlue font-semibold">
                            {featured.bathroom}
                          </span>
                        </li>
                        <li className="flex gap-2 items-center">
                          <BiSolidCarGarage /> <span>Garage</span>
                          <span className="text-seaBlue font-semibold">1</span>
                        </li>
                        <li className="flex gap-2 items-center">
                          <RxSize /> <span>SqFt</span>
                          <span className="text-seaBlue font-semibold">
                            {featured.squareFoot}
                          </span>
                        </li>
                      </ul>
                      <div className="mt-5 border-t text-yellow">
                        <div className="mt-5 flex gap-5 items-center justify-between">
                          <h5 className="text-xl font-semibold">
                            ${featured.price}.00
                          </h5>
                          <Link href={`/Property/${featured._id}`}>
                            <button className="border border-yellow text-yellow py-1 px-4 font-semibold rounded-lg hover:text-white hover:bg-yellow transition-all duration-700">
                              Details
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-2 text-center text-xl text-gray-500 py-10">
                No featured property found
              </div>
            )}
          </div>
        )}
      </Container>
    </div>
  );
};

export default FeaturedPage;
