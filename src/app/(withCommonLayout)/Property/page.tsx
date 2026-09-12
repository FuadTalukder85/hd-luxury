"use client";
import { useState } from "react";
import { FaBed, FaSearch } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { MdCategory } from "react-icons/md";
import Container from "../../../shared/components/ui/Container";
import { useGetPropertyQuery } from "../../../shared/redux/api/PropertyApi";
import PropertyCard from "../../../shared/components/ui/PropertyCard";
import { TPropertyTypes } from "../../../shared/types/types";

const PropertyPage = () => {
  const [generalQuery, setGeneralQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");
  const [categoryQuery, setCategoryQuery] = useState("");
  const [bedroomQuery, setBedroomQuery] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [page, setPage] = useState(1);

  // Active filter params sent to backend
  const [activeParams, setActiveParams] = useState<Record<string, any>>({
    page: 1,
    limit: 12,
  });

  const queryArgs: Record<string, any> = {
    ...activeParams,
    page,
    limit: 12,
  };

  if (sortOption === "Sale" || sortOption === "Rent") {
    queryArgs.propertyFor = sortOption;
  }

  const { data: properties, isFetching } = useGetPropertyQuery(queryArgs);
  const meta = (properties as any)?.meta;

  const handleSearch = () => {
    setPage(1);
    setActiveParams({
      search: generalQuery.trim() || undefined,
      city: locationQuery.trim() || undefined,
      propertyCategory: categoryQuery.trim() || undefined,
      bedroom: bedroomQuery ? Number(bedroomQuery) : undefined,
      page: 1,
      limit: 12,
    });
  };

  return (
    <div className="">
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
        <div className="mt-16 flex justify-between border-b pb-5 font-semibold px-3 md:px-0">
          <div className="flex gap-5">
            <span className="border-b-2 border-yellow">All property</span>
          </div>
          <select
            className="mt-1 block p-2 border-b border-yellow rounded-md shadow-sm outline-none"
            value={sortOption}
            onChange={(e) => {
              setSortOption(e.target.value);
              setPage(1);
            }}
          >
            <option value="">Sort by</option>
            <option value="Sale">For Sale</option>
            <option value="Rent">For Rent</option>
          </select>
        </div>

        {isFetching ? (
          <div className="text-center py-20 text-seaBlue font-semibold text-lg">
            Loading properties...
          </div>
        ) : (
          <>
            <div className="mt-16 md:grid grid-cols-3 gap-5 p-3 md:p-0">
              {properties && properties.length > 0 ? (
                properties.map((propertyItem: TPropertyTypes & { userName?: string; userImage?: string }, index: number) => {
                  return (
                    <PropertyCard
                      key={propertyItem._id || index}
                      propertyId={propertyItem?._id}
                      propertyImage={propertyItem?.propertyImage01}
                      propertyFor={propertyItem?.propertyFor}
                      propertyName={propertyItem.propertyName}
                      address={propertyItem.address}
                      city={propertyItem.city}
                      bedroom={propertyItem.bedroom}
                      bathroom={propertyItem.bathroom}
                      squareFoot={propertyItem.squareFoot}
                      price={propertyItem.price}
                      userName={propertyItem.userName || "Unknown"}
                      userImage={propertyItem.userImage || ""}
                    />
                  );
                })
              ) : (
                <div className="col-span-3 text-center text-xl text-gray-500 py-10">
                  No property found
                </div>
              )}
            </div>

            {/* Pagination Controls */}
            {meta && meta.totalPages > 1 && (
              <div className="flex justify-center items-center gap-3 my-12">
                <button
                  disabled={page <= 1}
                  onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                  className="px-4 py-2 bg-gray-100 border text-seaBlue font-semibold rounded disabled:opacity-50 hover:bg-yellow hover:text-white transition-all"
                >
                  Previous
                </button>
                <span className="text-sm font-semibold text-seaBlue">
                  Page {meta.page} of {meta.totalPages} ({meta.total} properties)
                </span>
                <button
                  disabled={page >= meta.totalPages}
                  onClick={() => setPage((prev) => Math.min(meta.totalPages, prev + 1))}
                  className="px-4 py-2 bg-gray-100 border text-seaBlue font-semibold rounded disabled:opacity-50 hover:bg-yellow hover:text-white transition-all"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </Container>
    </div>
  );
};

export default PropertyPage;
