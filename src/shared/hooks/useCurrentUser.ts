"use client";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

const useCurrentUser = () => {
  const authInfo = useContext(AuthContext);
  return authInfo?.user;
};

export default useCurrentUser;
