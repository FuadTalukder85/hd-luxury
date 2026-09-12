import Image from "next/image";
import React from "react";
import { FiPhoneCall } from "react-icons/fi";
import { MdOutlineAttachEmail } from "react-icons/md";
import { FaFacebook, FaLinkedinIn, FaTwitterSquare } from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io";

interface AgentDetailsProps {
  params: Promise<{ AgentDetailsId: string }>;
}

const DashAgentDetails = async ({ params }: AgentDetailsProps) => {
  const { AgentDetailsId } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:4900/";
  const cleanBaseUrl = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;

  let agent = null;
  try {
    const res = await fetch(`${cleanBaseUrl}users/${AgentDetailsId}`, {
      cache: "no-store",
    });
    if (res.ok) {
      agent = await res.json();
    }
  } catch (error) {
    console.error("Failed to fetch agent details:", error);
  }

  return (
    <div className="p-3 md:p-10 text-seaBlue">
      <div className="bg-white p-6 rounded-lg border shadow-sm">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="relative w-48 h-56 rounded-lg overflow-hidden shrink-0 shadow">
            <Image
              src={agent?.image || "/banner01.jpg"}
              alt="agent"
              fill
              className="object-cover"
            />
          </div>
          <div className="space-y-3">
            <h2 className="text-3xl font-bold">{agent?.name || "Agent Details"}</h2>
            <p className="text-sm font-semibold text-yellow capitalize">Role: {agent?.role || "Agent"}</p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <FiPhoneCall className="text-yellow" />
                <span>{agent?.number || "N/A"}</span>
              </li>
              <li className="flex items-center gap-2">
                <MdOutlineAttachEmail className="text-yellow" />
                <span>{agent?.email || "N/A"}</span>
              </li>
            </ul>
            <p className="text-sm text-gray-600 mt-4 leading-relaxed">
              Professional agent handling property inquiries, listings verification, and customer relations.
            </p>
            <ul className="flex gap-3 pt-2">
              <li className="border p-2 rounded-full hover:bg-seaBlue hover:text-white transition-colors cursor-pointer">
                <FaFacebook />
              </li>
              <li className="border p-2 rounded-full hover:bg-seaBlue hover:text-white transition-colors cursor-pointer">
                <IoLogoYoutube />
              </li>
              <li className="border p-2 rounded-full hover:bg-seaBlue hover:text-white transition-colors cursor-pointer">
                <FaLinkedinIn />
              </li>
              <li className="border p-2 rounded-full hover:bg-seaBlue hover:text-white transition-colors cursor-pointer">
                <FaTwitterSquare />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashAgentDetails;
