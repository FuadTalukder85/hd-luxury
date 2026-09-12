"use client";
import React, { useEffect, useState } from "react";
import { useGetPropertyQuery } from "../../../shared/redux/api/PropertyApi";
import Container from "../../../shared/components/ui/Container";
import { TPropertyTypes } from "../../../shared/types/types";
import PropertyCard from "../../../shared/components/ui/PropertyCard";

const SearchPage = () => {
  const [queryParams, setQueryParams] = useState<Record<string, any>>({});

  useEffect(() => {
    if (typeof window !== "undefined") {
      const searchParams = new URLSearchParams(window.location.search);
      const general = searchParams.get("general") || "";
      const location = searchParams.get("location") || "";
      const category = searchParams.get("category") || "";
      const bedroom = searchParams.get("bedroom") || "";

      setQueryParams({
        search: general.trim() || undefined,
        city: location.trim() || undefined,
        propertyCategory: category.trim() || undefined,
        bedroom: bedroom ? Number(bedroom) : undefined,
        limit: 50,
      });
    }
  }, []);

  const { data: properties, isFetching } = useGetPropertyQuery(queryParams);

  return (
    <Container>
      {isFetching ? (
        <div className="text-center py-20 text-seaBlue font-semibold text-lg">
          Searching properties...
        </div>
      ) : (
        <div className="md:mt-16 md:grid grid-cols-3 gap-5 p-3 md:p-0">
          {properties && properties.length > 0 ? (
            properties.map((property: TPropertyTypes & { userName?: string; userImage?: string }, index: number) => {
              return (
                <PropertyCard
                  key={property._id || index}
                  propertyId={property?._id}
                  propertyImage={property?.propertyImage01}
                  propertyFor={property?.propertyFor}
                  propertyName={property.propertyName}
                  address={property.address}
                  city={property.city}
                  bedroom={property.bedroom}
                  bathroom={property.bathroom}
                  squareFoot={property.squareFoot}
                  price={property.price}
                  userName={property.userName || "Unknown"}
                  userImage={property.userImage || ""}
                />
              );
            })
          ) : (
            <div className="col-span-3 text-center text-xl text-gray-500 py-10">
              No property found
            </div>
          )}
        </div>
      )}
    </Container>
  );
};

export default SearchPage;
