"use client";
import React, { useContext, useEffect } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { useRouter } from "next/navigation";
import { useGetUserQuery } from "../redux/userApi/UserApi";
import { LoginInputs } from "../types/types";

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const router = useRouter();
  const { user, loading } = useContext(AuthContext);
  const { data, isLoading } = useGetUserQuery("");

  const currentUser = data?.find((dt: LoginInputs) => dt.email === user?.email);

  useEffect(() => {
    if (!loading && !isLoading) {
      if (
        !currentUser ||
        (currentUser.role !== "Admin" && currentUser.role !== "Agent")
      ) {
        router.push("/Login");
      }
    }
  }, [loading, isLoading, currentUser, router]);

  if (loading || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[300px] mt-36">
        <p className="text-lg text-seaBlue font-semibold">Loading...</p>
      </div>
    );
  }

  if (
    currentUser &&
    (currentUser.role === "Admin" || currentUser.role === "Agent")
  ) {
    return <>{children}</>;
  }

  return null;
};

export default PrivateRoute;
