import React from "react";
import Image from "next/image";
import { TPropertyTypes } from "../../../../../../shared/types/types";
import { FiPhoneCall } from "react-icons/fi";
import { MdOutlineAttachEmail } from "react-icons/md";

const PropertyAgent = ({ singleProperty }: { singleProperty: TPropertyTypes | null }) => {
  return (
    <div className="bg-white p-5 rounded-lg border shadow-sm text-seaBlue">
      <h4 className="font-bold text-lg mb-4">Listed By</h4>
      <div className="flex items-center gap-3 mb-4">
        <div className="relative w-14 h-14 rounded-full overflow-hidden shrink-0">
          <Image
            src="/banner01.jpg"
            alt="agent"
            fill
            className="object-cover"
          />
        </div>
        <div>
          <h5 className="font-semibold text-sm">{singleProperty?.postBy || "Agent"}</h5>
          <p className="text-xs text-gray-500">Real Estate Specialist</p>
        </div>
      </div>
      <ul className="space-y-2 text-xs font-medium border-t pt-3">
        <li className="flex items-center gap-2">
          <FiPhoneCall className="text-yellow" />
          <span>+1 (800) 555-0199</span>
        </li>
        <li className="flex items-center gap-2">
          <MdOutlineAttachEmail className="text-yellow" />
          <span>{singleProperty?.email || "agent@realestate.com"}</span>
        </li>
      </ul>
    </div>
  );
};

export default PropertyAgent;
