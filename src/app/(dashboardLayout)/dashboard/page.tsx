"use client";
import React, { useContext } from "react";
import Analytics from "../../../dashboardComponent/Analytics";
import NewListing from "../../../dashboardComponent/NewListing";
import RecentReview from "../../../dashboardComponent/RecentReview";
import { AuthContext } from "../../../shared/providers/AuthProvider";
import { useGetUserQuery } from "../../../shared/redux/api/UserApi";
import AgentHome from "../../../dashboardComponent/AgentHome";
import { LoginInputs } from "../../../shared/types/types";

const AdminPage = () => {
  const { user } = useContext(AuthContext);
  const { data } = useGetUserQuery("");
  const currentUser = data?.find(
    (dt: LoginInputs) => dt?.email === user?.email
  );

  return (
    <div>
      {currentUser?.role === "Admin" ? (
        <div className="">
          <Analytics />
          <div className="md:grid md:grid-cols-5 gap-5 px-3 md:px-5">
            <div className="col-span-3">
              <NewListing />
            </div>
            <div className="col-span-2">
              <RecentReview />
            </div>
          </div>
        </div>
      ) : (
        <div className="md:px-10 mt-10">
          <AgentHome />
        </div>
      )}
    </div>
  );
};

export default AdminPage;
