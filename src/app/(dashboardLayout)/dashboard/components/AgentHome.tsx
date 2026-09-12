"use client";
import React from "react";
import Analytics from "./Analytics";
import NewListing from "./NewListing";
import RecentReview from "./RecentReview";

const AgentHome = () => {
  return (
    <div className="space-y-6">
      <Analytics />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <NewListing />
        <RecentReview />
      </div>
    </div>
  );
};

export default AgentHome;
