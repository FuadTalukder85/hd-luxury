import React from "react";
import Container from "../../../shared/components/ui/Container";
import Link from "next/link";

const Question = () => {
  return (
    <div className="bg-yellow py-14 mt-10 md:mt-28 p-3">
      <Container>
        <div className="md:flex justify-between items-center">
          <div className="text-white">
            <h3 className="text-2xl md:text-4xl font-semibold">
              Do You Have Questions ?
            </h3>
            <p className="mt-2">
              We,ll help you to grow your career and growth.
            </p>
          </div>
          <div className="bg-[#ff4e3775] p-1 flex items-center rounded-full mt-5 md:mt-0">
            <Link href="/Contact" className="w-full">
              <button className="w-full py-3 md:py-5 px-12 rounded-full bg-white font-semibold text-seaBlue hover:bg-seaBlue hover:text-white transition-all duration-700 ease-in-out">
                Contact Us Today
              </button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Question;
