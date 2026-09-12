"use client";
import React from "react";
import Container from "../../../shared/components/ui/Container";
import { useGetPropertyQuery } from "../../../shared/redux/api/PropertyApi";
import { useGetUserQuery } from "../../../shared/redux/api/UserApi";
import PropertyCard from "../../../shared/components/ui/PropertyCard";
import { LoginInputs, TPropertyTypes } from "../../../shared/types/types";

const LatestSale = () => {
  const { data } = useGetPropertyQuery("");
  const { data: userData } = useGetUserQuery("");
  const recentProperty = data
    ? [...data].sort(
        (a: TPropertyTypes, b: TPropertyTypes) =>
          new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime()
      )
    : [];

  return (
    <Container>
      <div className="mx-auto md:w-[550px] text-center text-seaBlue p-3 md:p-0">
        <h2 className="mt-10 md:mt-28 text-2xl md:text-4xl font-semibold">
          LATEST FOR SALE
        </h2>
        <p className="mt-2 text-light">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus
          modi ad, autem quia commodi quisquam deserunt asperiores rerum vero
          fugiat nobis ex voluptatibus.
        </p>
      </div>
      <div className="mt-3 md:mt-16 md:grid grid-cols-3 gap-5 p-3 md:p-0">
        {recentProperty?.slice(0, 6).map((property: TPropertyTypes, index: number) => {
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
        })}
      </div>
    </Container>
  );
};

export default LatestSale;
