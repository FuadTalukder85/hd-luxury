import React from "react";
import Header from "../../../shared/components/layout/Header";
import Footer from "../../../shared/components/layout/Footer";

const AccountLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default AccountLayout;
