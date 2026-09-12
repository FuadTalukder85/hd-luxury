"use client";
import React from "react";
import { useGetPropertyQuery } from "../../../../shared/redux/api/PropertyApi";
import { useGetUserQuery } from "../../../../shared/redux/api/UserApi";
import { useGetContactQuery } from "../../../../shared/redux/api/ContactApi";
import { MdOutlineMapsHomeWork, MdOutlinePeople, MdOutlineMessage } from "react-icons/md";

const Analytics = () => {
  const { data: properties } = useGetPropertyQuery("");
  const { data: users } = useGetUserQuery("");
  const { data: contacts } = useGetContactQuery("");

  const stats = [
    {
      title: "Total Properties",
      value: properties?.length || 0,
      icon: <MdOutlineMapsHomeWork className="text-3xl text-yellow" />,
      bg: "bg-yellow/10",
    },
    {
      title: "Total Users & Agents",
      value: users?.length || 0,
      icon: <MdOutlinePeople className="text-3xl text-seaBlue" />,
      bg: "bg-seaBlue/10",
    },
    {
      title: "Inquiries & Messages",
      value: contacts?.length || 0,
      icon: <MdOutlineMessage className="text-3xl text-emerald-600" />,
      bg: "bg-emerald-100",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat, idx) => (
        <div
          key={idx}
          className="bg-white p-6 rounded-lg border shadow-sm flex items-center justify-between"
        >
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase">{stat.title}</p>
            <h3 className="text-3xl font-bold text-seaBlue mt-2">{stat.value}</h3>
          </div>
          <div className={`p-4 rounded-full ${stat.bg}`}>{stat.icon}</div>
        </div>
      ))}
    </div>
  );
};

export default Analytics;
