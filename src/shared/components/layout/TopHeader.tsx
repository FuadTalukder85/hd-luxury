import Image from "next/image";
import logo from "../../../assets/images/real-estate-logo.png";
import React from "react";
import Container from "../ui/Container";
import Link from "next/link";

const TopHeader = () => {
  return (
    <Container>
      <div className="flex justify-between items-center p-3 md:p-0 md:py-1">
        <Link href="/" className="hidden md:block">
          <Image src={logo} alt="logo" width={150} />
        </Link>
        <Link href="/" className="md:hidden">
          <Image src={logo} alt="logo" width={120} />
        </Link>
        <div className="md:flex gap-10 items-center">
          <div>
            <p className="hidden md:block text-light font-semibold text-sm">
              Call for Enquiry
            </p>
            <b className="hidden md:block text-lg text-seaBlue">01756-867585</b>
          </div>
        </div>
      </div>
      <div className="md:hidden flex justify-center items-center gap-5 pb-2">
        <p className="text-light font-semibold text-sm">Call for Enquiry</p>
        <b className="text-lg text-seaBlue">01756-867585</b>
      </div>
    </Container>
  );
};

export default TopHeader;
