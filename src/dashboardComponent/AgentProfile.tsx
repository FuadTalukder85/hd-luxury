"use client";
import Image from "next/image";
import profileBanner from "../assets/images/house01.jpg";
import { useContext } from "react";
import { AuthContext } from "../shared/providers/AuthProvider";
import { useGetUserQuery } from "../shared/redux/api/UserApi";
import { LoginInputs } from "../shared/types/types";

const AgentProfile = () => {
  const { user } = useContext(AuthContext);
  const { data } = useGetUserQuery("");
  const currentUser = data?.find((dt: LoginInputs) => dt?.email === user?.email);

  return (
    <div className="bg-white shadow-md md:w-96 p-3 md:pb-7 rounded-3xl">
      <Image
        className="h-40 rounded-t-3xl object-cover"
        src={profileBanner}
        alt="profileBanner"
      />
      <div className="">
        <div className="-mt-16 flex justify-center rounded-3xl">
          {currentUser?.image ? (
            <Image
              className="w-40 rounded-3xl bg-white p-2 object-cover"
              src={currentUser?.image}
              alt="profileImg"
              width={160}
              height={160}
            />
          ) : (
            <div className="w-32 h-32 rounded-3xl bg-gray-200 flex items-center justify-center text-4xl text-seaBlue font-bold border-4 border-white">
              {currentUser?.name?.charAt(0) || "A"}
            </div>
          )}
        </div>
        <ul className="text-light text-center mt-3">
          <li className="text-seaBlue font-semibold text-lg">
            <p>{currentUser?.name || "Agent"}</p>
          </li>
          <li>{currentUser?.email || ""}</li>
          <li>{currentUser?.address || ""}</li>
        </ul>
        <div className="flex gap-1 md:gap-3 mt-5 justify-center font-semibold">
          <button className="px-3 py-1 text-white rounded-lg bg-yellow">
            My Property : 21
          </button>
          <button className="px-3 py-1 text-white rounded-lg bg-yellow">
            Total Review : 61
          </button>
        </div>
      </div>
    </div>
  );
};

export default AgentProfile;
