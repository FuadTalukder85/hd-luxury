"use client";

import Image from "next/image";
import React, { useEffect, useMemo } from "react";
import { useGetPropertyQuery } from "../../../../shared/redux/api/PropertyApi";
import toast from "react-hot-toast";
import Link from "next/link";
import { FiEye } from "react-icons/fi";
import { TPropertyTypes } from "../../../../shared/types/types";

const NewListing = () => {
  const { data, refetch } = useGetPropertyQuery("");

  const newListing = useMemo(() => {
    return data
      ? [...data].sort(
          (a: TPropertyTypes, b: TPropertyTypes) =>
            new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime()
        )
      : [];
  }, [data]);

  const handleApproved = async (statusId: string, currentStatus: string) => {
    try {
      const newStatus = currentStatus === "approved" ? "pending" : "approved";
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:4900/";
      const cleanBaseUrl = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;
      const response = await fetch(
        `${cleanBaseUrl}property/${statusId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: newStatus,
          }),
        }
      );
      if (!response.ok) {
        toast.error("Failed to update property status");
        return;
      }
      toast.success("Property status updated");
      refetch();
    } catch (error) {
      console.error("Error updating property status:", error);
      toast.error("Error updating property status");
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      refetch();
    }, 3000);
    return () => clearInterval(intervalId);
  }, [refetch]);

  return (
    <div className="w-full overflow-x-auto mt-8 text-seaBlue bg-white p-4 md:p-6 shadow-md rounded-lg">
      <h5 className="font-semibold text-lg mb-4">New Listing</h5>
      <div className="border rounded-md min-w-[700px]">
        <div className="grid grid-cols-12 bg-gray-50 p-3 font-semibold text-sm border-b">
          <div className="col-span-8">
            <p>Listing</p>
          </div>
          <div className="col-span-4 flex justify-around">
            <p>Status</p>
            <p>View</p>
          </div>
        </div>
        <div className="overflow-y-auto max-h-[400px]">
          {newListing?.slice(0, 5).map((listing: TPropertyTypes) => (
            <div
              key={listing._id}
              className="grid grid-cols-12 items-center border-b last:border-b-0 p-3 hover:bg-gray-50 transition-colors"
            >
              <div className="col-span-8">
                <div className="flex items-center gap-4">
                  <div className="relative w-24 h-16 rounded-md overflow-hidden shrink-0">
                    <Image
                      fill
                      className="object-cover rounded-md"
                      src={listing?.propertyImage01 || "/banner01.jpg"}
                      alt="listing"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-sm md:text-base text-seaBlue truncate max-w-xs">
                      {listing?.propertyName}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Posting date: {listing?.date || "N/A"}
                    </p>
                    <p className="font-semibold text-sm text-yellow mt-1">
                      ${listing?.price || 0}.00
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-span-2 flex items-center justify-center">
                <button
                  onClick={() => handleApproved(listing._id, listing.status || "pending")}
                  className={`px-3 py-1 rounded-md text-xs font-semibold uppercase text-white transition-all duration-300 ${
                    listing?.status === "approved"
                      ? "bg-emerald-500 hover:bg-emerald-600"
                      : "bg-rose-500 hover:bg-rose-600"
                  }`}
                >
                  {listing?.status || "pending"}
                </button>
              </div>
              <div className="col-span-2 flex items-center justify-center">
                <Link href={`/dashboard/AllProperty/${listing?._id}`}>
                  <button className="bg-gray-100 p-2 rounded-md hover:bg-seaBlue hover:text-white transition-colors text-lg">
                    <FiEye />
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewListing;
