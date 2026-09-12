"use client";
import React from "react";
import { useGetPropertyQuery } from "../../../../../shared/redux/api/PropertyApi";
import { useGetUserQuery } from "../../../../../shared/redux/api/UserApi";
import PropertyCard from "../../../../../shared/components/ui/PropertyCard";
import { TPropertyTypes, LoginInputs } from "../../../../../shared/types/types";

const ListingByAgent = ({ email }: { email: string }) => {
  const { data } = useGetPropertyQuery("");
  const { data: userData } = useGetUserQuery("");

  const agentProperties = data?.filter(
    (prop: TPropertyTypes) => prop.email === email
  );

  return (
    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
      {agentProperties && agentProperties.length > 0 ? (
        agentProperties.map((property: TPropertyTypes, index: number) => {
          const user = userData?.find(
            (u: LoginInputs) => u.email === property.email
          );
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
              userName={user?.name || "Unknown"}
              userImage={user?.image || ""}
            />
          );
        })
      ) : (
        <div className="col-span-3 text-center py-12 text-gray-500 font-medium">
          No listings posted by this agent yet.
        </div>
      )}
    </div>
  );
};

export default ListingByAgent;
