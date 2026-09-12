import Image from "next/image";
import bannerImg from "../../../../../assets/images/bannerImg/banner01.jpg";
import { IoLocationOutline } from "react-icons/io5";
import { FaBath, FaBed } from "react-icons/fa";
import { SlCalender } from "react-icons/sl";
import { RxSize } from "react-icons/rx";
import { MdOutlineReviews } from "react-icons/md";
import { GiCheckMark } from "react-icons/gi";
import PropertyAgent from "./components/PropertyAgent";

interface DashPropertyDetailsProps {
  params: Promise<{ AllPropertyId: string }>;
}

const DashPropertyDetails = async ({ params }: DashPropertyDetailsProps) => {
  const { AllPropertyId } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:4900/";
  const cleanBaseUrl = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;

  let singleProperty = null;
  try {
    const res = await fetch(`${cleanBaseUrl}property/${AllPropertyId}`, {
      cache: "no-store",
    });
    if (res.ok) {
      singleProperty = await res.json();
    }
  } catch (error) {
    console.error("Error fetching property:", error);
  }

  return (
    <div className="p-3 md:p-10">
      <p className="text-seaBlue font-semibold text-xl">Property Overview</p>
      <div className="md:grid grid-cols-12 gap-5 mt-5">
        <div className="col-span-3">
          <PropertyAgent singleProperty={singleProperty} />
        </div>
        <div className="col-span-9">
          <Image className="rounded-md" src={bannerImg} alt="bannerImg" />
          <h3 className="text-seaBlue font-semibold text-xl mt-5">
            {singleProperty?.propertyName}
          </h3>
          <li className="flex gap-2 items-center mt-2 text-seaBlue font-medium hover:text-yellow transition-all duration-700 list-none">
            <IoLocationOutline className="text-yellow text-lg" />{" "}
            {singleProperty?.address}, {singleProperty?.city}
          </li>
          <p className="md:flex items-center justify-between text-center text-seaBlue font-semibold text-lg mt-5">
            <span>${singleProperty?.price}.00</span>
            <span className="flex items-center justify-center gap-2">
              <SlCalender /> {singleProperty?.date}
            </span>
          </p>
          <ul className="grid grid-cols-2 md:grid-cols-6 gap-3 justify-between text-seaBlue font-semibold mt-5 rounded-md">
            <li className="bg-white p-3 shadow-md">
              <p className="flex gap-2 items-center">
                <FaBed className="text-yellow" />
                <span>{singleProperty?.bedroom}</span>
                <span>Bedroom</span>
              </p>
            </li>
            <li className="bg-white p-3 shadow-md">
              <p className="flex gap-2 items-center">
                <FaBath className="text-yellow" />
                <span>{singleProperty?.bathroom}</span>
                <span>Bathroom</span>
              </p>
            </li>
            <li className="bg-white p-3 shadow-md">
              <p className="flex gap-2 items-center">
                <RxSize className="text-yellow" />{" "}
                <span>{singleProperty?.squareFoot}</span>
                <span>sqft</span>
              </p>
            </li>
            <li className="bg-white p-3 shadow-md">
              <p className="flex gap-2 items-center">
                <RxSize className="text-yellow" />
                <span>{singleProperty?.buildYear}</span>
                <span>Build</span>
              </p>
            </li>
            <li className="bg-white p-3 shadow-md">
              <p className="flex gap-2 items-center">
                <MdOutlineReviews className="text-yellow" /> <span>2</span>
                <span>Review</span>
              </p>
            </li>
            <li className="bg-white p-3 shadow-md">
              <p className="flex gap-2 items-center">
                <GiCheckMark className="text-yellow" />
                <span>For Sale</span>
              </p>
            </li>
          </ul>
          <p className="text-seaBlue font-semibold mt-5">Property Details :</p>
          <p className="text-seaBlue md:pr-36">{singleProperty?.description}</p>
        </div>
      </div>
    </div>
  );
};

export default DashPropertyDetails;
