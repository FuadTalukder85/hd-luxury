"use client";
import React, { useState } from "react";
import useCurrentUser from "../../../shared/hooks/useCurrentUser";
import Image from "next/image";
import UpdateProfileModal from "./components/UpdateProfileModal";
import { useGetUserQuery } from "../../../shared/redux/api/UserApi";

const AccountPage = () => {
  const currentUser = useCurrentUser();
  const { data: users } = useGetUserQuery("");
  const [showModal, setShowModal] = useState(false);

  const dbUser = users?.find((u) => u.email === currentUser?.email);

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 text-seaBlue">
      <h2 className="text-3xl font-bold mb-8">My Account</h2>
      <div className="bg-white p-6 rounded-lg border shadow-sm flex flex-col md:flex-row items-center gap-6">
        <div className="relative w-32 h-32 rounded-full overflow-hidden shrink-0">
          <Image
            src={currentUser?.photoURL || dbUser?.image || "/banner01.jpg"}
            alt="profile"
            fill
            className="object-cover"
          />
        </div>
        <div className="space-y-2 text-center md:text-left flex-1">
          <h3 className="text-2xl font-bold">{currentUser?.displayName || dbUser?.name || "User"}</h3>
          <p className="text-sm text-gray-500">{currentUser?.email || dbUser?.email}</p>
          <p className="text-xs font-semibold text-yellow capitalize">Role: {dbUser?.role || "User"}</p>
          <p className="text-sm text-gray-600">Phone: {dbUser?.number || "N/A"}</p>
          <p className="text-sm text-gray-600">Address: {dbUser?.address || "N/A"}</p>
          <button
            onClick={() => setShowModal(true)}
            className="mt-4 px-6 py-2 bg-yellow text-white text-xs font-semibold uppercase rounded hover:bg-seaBlue transition-colors"
          >
            Edit Profile
          </button>
        </div>
      </div>

      {showModal && <UpdateProfileModal onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default AccountPage;
