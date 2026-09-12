import React from "react";
import Container from "../../../../shared/components/ui/Container";
import { FiPhoneCall } from "react-icons/fi";
import { MdOutlineAttachEmail } from "react-icons/md";
import Image from "next/image";
import { FaFacebook, FaLinkedinIn, FaTwitterSquare } from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io";
import ListingByAgent from "../../../../components/ListingByAgent";
import Review from "../../../../components/Review/Review";
import { TParams } from "../../../../shared/types/types";

const AgentDetails = async ({ params }: { params: Promise<TParams> }) => {
  const { AgentId } = await params;
  let agent: any = null;
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:4900/";
    const cleanBaseUrl = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
    const res = await fetch(`${cleanBaseUrl}/users/${AgentId}`, {
      cache: "no-store",
    });
    if (res.ok) {
      agent = await res.json();
    }
  } catch (error) {
    console.error("Failed to fetch agent details:", error);
  }

  return (
    <Container>
      <div className="md:flex justify-between gap-10 text-seaBlue mt-5 md:mt-16 p-3 md:p-0">
        <div className="md:w-8/12">
          <h3 className="text-4xl font-bold">{agent?.name || "Agent Details"}</h3>
          <p className="mt-1">Licensed Associate Real Estate Broker</p>
          <li className="flex gap-3 items-center mt-10">
            <FiPhoneCall className="text-lg" /> {agent?.number || "N/A"}
          </li>
          <li className="flex gap-3 items-center">
            <MdOutlineAttachEmail className="text-lg" />
            {agent?.email || "N/A"}
          </li>
          <button className="py-3 px-5 bg-seaBlue text-white font-semibold rounded-md uppercase mt-10">
            Work with {agent?.name || "Agent"}
          </button>

          <p className="text-xl font-bold mt-10 capitalize">
            About {agent?.name || "Agent"}
          </p>
          <p className="mt-3">
            Award winner and nominee, Erika Tillman, is one of NYC’s top
            producing agents. In 2016 she was a Top Producer Individual by sales
            volume and GCI. This high achiever received, among other
            recognitions, a Quadruple Platinum Award and was cover of Outfront
            Magazine in December 2016.
          </p>
        </div>
        <div className="mt-5 md:mt-0">
          {agent?.image ? (
            <Image
              src={agent?.image}
              alt="agentImg"
              height={300}
              width={300}
              className="rounded-lg"
            />
          ) : (
            <div className="w-[300px] h-[300px] bg-gray-200 rounded-lg flex items-center justify-center text-5xl text-seaBlue font-bold">
              {agent?.name?.charAt(0) || "A"}
            </div>
          )}
          <p className="text-xl font-bold mt-5">Specialities</p>
          <p className="mt-3">International Buyers and Sellers Investors</p>
          <p className="text-xl font-bold mt-5">Social Media</p>
          <ul className="flex gap-3 mt-3">
            <li className="border border-seaBlue p-2 rounded-full hover:bg-seaBlue hover:text-white transition-all duration-700 ease-in-out cursor-pointer">
              <FaFacebook />
            </li>
            <li className="border border-seaBlue p-2 rounded-full hover:bg-seaBlue hover:text-white transition-all duration-700 ease-in-out cursor-pointer">
              <IoLogoYoutube />
            </li>
            <li className="border border-seaBlue p-2 rounded-full hover:bg-seaBlue hover:text-white transition-all duration-700 ease-in-out cursor-pointer">
              <FaLinkedinIn />
            </li>
            <li className="border border-seaBlue p-2 rounded-full hover:bg-seaBlue hover:text-white transition-all duration-700 ease-in-out cursor-pointer">
              <FaTwitterSquare />
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-10">
        <h3 className="text-2xl font-bold text-seaBlue p-3 md:p-0">
          Listing by {agent?.name || "Agent"}
        </h3>
        <ListingByAgent email={agent?.email || ""} />
        <Review email={agent?.email || ""} />
      </div>
    </Container>
  );
};

export default AgentDetails;
