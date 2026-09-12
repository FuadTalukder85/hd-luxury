"use client";
import React, { useEffect } from "react";
import { BsHouseCheck } from "react-icons/bs";
import {
  MdOutlineAppRegistration,
  MdOutlineContactMail,
  MdOutlineReviews,
  MdPendingActions,
} from "react-icons/md";
import { useGetAllStatsQuery } from "../shared/redux/api/AllStatsApi";

const Analytics = () => {
  const { data, refetch } = useGetAllStatsQuery("");
  useEffect(() => {
    const intervalId = setInterval(() => {
      refetch();
    }, 3000);
    return () => clearInterval(intervalId);
  }, [refetch]);

  return (
    <div className="px-3 md:px-5 mt-10 text-seaBlue">
      <h5 className="font-semibold">Analytics</h5>
      <div className="md:flex gap-5 justify-between mt-5">
        <div className="w-full flex gap-8 items-center bg-white p-5 shadow-md">
          <BsHouseCheck className="text-5xl text-yellow" />
          <div>
            <p className="text-seaBlue">No. of Property</p>
            <span className="text-2xl font-semibold text-seaBlue">
              {data?.totalProperty || 0}
            </span>
          </div>
        </div>
        <div className="w-full flex gap-8 items-center bg-white p-5 shadow-md mt-2 md:mt-0">
          <MdOutlineAppRegistration className="text-5xl text-yellow" />
          <div>
            <p className="text-seaBlue">Regi. Agents</p>
            <span className="text-2xl font-semibold text-seaBlue">
              {data?.totalAgent || 0}
            </span>
          </div>
        </div>
        <div className="w-full flex gap-8 items-center bg-white p-5 shadow-md mt-2 md:mt-0">
          <MdPendingActions className="text-5xl text-yellow" />
          <div>
            <p className="text-seaBlue">Pending Property</p>
            <span className="text-2xl font-semibold text-seaBlue">
              {data?.pendingProperty || 0}
            </span>
          </div>
        </div>
        <div className="w-full flex gap-8 items-center bg-white p-5 shadow-md mt-2 md:mt-0">
          <MdOutlineContactMail className="text-5xl text-yellow" />
          <div>
            <p className="text-seaBlue">Contact</p>
            <span className="flex items-center gap-2 text-2xl font-semibold text-seaBlue">
              {data?.totalContact || 0}
              <span className="font-normal text-base">person</span>
            </span>
          </div>
        </div>
        <div className="w-full flex gap-8 items-center bg-white p-5 shadow-md mt-2 md:mt-0">
          <MdOutlineReviews className="text-5xl text-yellow" />
          <div>
            <p className="text-seaBlue">Reviews</p>
            <span className="flex items-center gap-2 text-2xl font-semibold text-seaBlue">
              {data?.totalReview || 0}
              <span className="font-normal text-base">person</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
