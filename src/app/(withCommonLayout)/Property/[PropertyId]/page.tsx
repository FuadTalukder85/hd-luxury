"use client";
import Image from "next/image";
import propertyDetails01 from "../../../../assets/images/propertyImg/propertyDetails01.png";
import propertyDetails02 from "../../../../assets/images/propertyImg/propertyDetails02.png";
import propertyDetails03 from "../../../../assets/images/propertyImg/propertyDetails03.png";
import Container from "../../../../shared/components/ui/Container";
import { IoLocationOutline } from "react-icons/io5";
import { GiCheckMark } from "react-icons/gi";
import ContactSeller from "../../../../components/ContactSeller";
import { TParams } from "../../../../shared/types/types";
import Review from "../../../../components/Review/Review";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { IoIosStarOutline, IoMdClose } from "react-icons/io";
import { BsBoxArrowRight } from "react-icons/bs";
import { FaFacebook, FaLinkedinIn } from "react-icons/fa";
import { MdLink } from "react-icons/md";
import toast, { Toaster } from "react-hot-toast";
import ReusableBtn from "../../../../shared/components/ui/reusableBtn";

const PropertyDetails = () => {
  const params = useParams();
  const { PropertyId } = params as TParams;
  const [singleProperty, setSingleProperty] = useState<any>(null);

  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const shareRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownVisible((prev) => !prev);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      toast.success("Copied Listing URL", { position: "top-right" });
    });
  };

  const handleFacebookShare = () => {
    const url = encodeURIComponent(window.location.href);
    const fbShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
    window.open(fbShareUrl, "_blank");
  };

  const handleLinkedinShare = () => {
    const url = encodeURIComponent(window.location.href);
    const linkedinShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
    window.open(linkedinShareUrl, "_blank");
  };

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:4900/";
        const cleanBaseUrl = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
        const res = await fetch(`${cleanBaseUrl}/property/${PropertyId}`);
        if (res.ok) {
          const data = await res.json();
          setSingleProperty(data);
        }
      } catch (error) {
        console.error("Failed to fetch property:", error);
      }
    };

    if (PropertyId) {
      fetchProperty();
    }
  }, [PropertyId]);

  const [sliderRef] = useKeenSlider({
    loop: true,
    slides: {
      perView: 2,
      spacing: 20,
    },
    created: (instance) => {
      setInterval(() => {
        instance.next();
      }, 5000);
    },
  });

  return (
    <div>
      <Toaster />
      <div className="keen-slider" ref={sliderRef}>
        <div className="keen-slider__slide number-slide1">
          <Image
            className="w-full"
            src={singleProperty?.propertyImage01 || propertyDetails01}
            alt="propertyDetails01"
            width={600}
            height={400}
          />
        </div>
        <div className="keen-slider__slide number-slide2">
          <Image
            className="w-full"
            src={singleProperty?.propertyImage02 || propertyDetails02}
            alt="propertyDetails02"
            width={600}
            height={400}
          />
        </div>
        <div className="keen-slider__slide number-slide3">
          <Image
            className="w-full"
            src={singleProperty?.propertyImage03 || propertyDetails03}
            alt="propertyDetails03"
            width={600}
            height={400}
          />
        </div>
      </div>
      <Container>
        <div className="md:grid grid-cols-12 gap-10 mt-12">
          <div className="col-span-7">
            <div className="bg-white shadow-md p-3 md:p-5 rounded-lg">
              <div className="md:flex justify-between relative">
                <ul className="flex items-center justify-between gap-2 md:gap-5">
                  <li>
                    <ReusableBtn>For {singleProperty?.propertyFor || "Sale"}</ReusableBtn>
                  </li>
                  <li>
                    <button className="text-seaBlue font-semibold text-xl border-b-2 pb-1 border-yellow rounded-sm">
                      Build year :
                      <span className="text-yellow font-bold text-sm md:text-xl ps-2">
                        {singleProperty?.buildYear || 2023}
                      </span>
                    </button>
                  </li>
                </ul>
                <div className="mt-3 md:mt-0 flex justify-between gap-2">
                  <button className="flex items-center gap-1 font-semibold bg-seaBlue text-white p-1 px-3 rounded-[4px]">
                    <IoIosStarOutline />
                    Save
                  </button>
                  <button
                    onClick={toggleDropdown}
                    className="flex items-center gap-1 font-semibold bg-seaBlue text-white p-1 px-3 rounded-[4px]"
                  >
                    <BsBoxArrowRight />
                    Share
                  </button>
                  {singleProperty?.propertyFor === "Sale" ? (
                    <ReusableBtn>Buy Now</ReusableBtn>
                  ) : (
                    <ReusableBtn>Rent Now</ReusableBtn>
                  )}

                  {isDropdownVisible && (
                    <div
                      ref={shareRef}
                      className="absolute right-0 top-24 md:top-10 bg-white shadow-lg py-3 px-5 z-50"
                    >
                      <div
                        onClick={toggleDropdown}
                        className="flex justify-between items-center"
                      >
                        <span className="text-seaBlue font-semibold">
                          Share listing
                        </span>
                        <IoMdClose className="text-2xl p-1 rounded-md cursor-pointer hover:text-white hover:bg-seaBlue transition-all duration-700" />
                      </div>
                      <ul className="flex gap-3 mt-8 pr-16">
                        <li
                          onClick={handleCopy}
                          className="border border-seaBlue p-2 rounded-full hover:bg-seaBlue hover:text-white transition-all duration-700 ease-in-out cursor-pointer"
                        >
                          <MdLink />
                        </li>
                        <li
                          onClick={handleFacebookShare}
                          className="border border-seaBlue p-2 rounded-full hover:bg-seaBlue hover:text-white transition-all duration-700 ease-in-out cursor-pointer"
                        >
                          <FaFacebook />
                        </li>
                        <li
                          onClick={handleLinkedinShare}
                          className="border border-seaBlue p-2 rounded-full hover:bg-seaBlue hover:text-white transition-all duration-700 ease-in-out cursor-pointer"
                        >
                          <FaLinkedinIn />
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
              <div className="mt-5 md:mt-10 md:flex items-center justify-between">
                <h3 className="text-2xl md:text-4xl font-semibold text-seaBlue">
                  {singleProperty?.propertyName}
                </h3>
                <div className="flex md:flex-col items-center justify-between mt-3 md:mt-0">
                  <p className="text-seaBlue font-semibold text-2xl">
                    ${singleProperty?.price}.00
                  </p>
                  <p className="text-end font-semibold text-light">
                    {singleProperty?.squareFoot} / SqFt
                  </p>
                </div>
              </div>
              <div className="mt-7 font-semibold text-xl text-seaBlue">
                <li className="flex gap-3 items-center">
                  <IoLocationOutline className="text-yellow text-2xl" />
                  {singleProperty?.address}, {singleProperty?.city}
                </li>
              </div>

              <h5 className="mt-5 md:mt-10 text-seaBlue text-2xl font-semibold capitalize">
                description:
              </h5>
              <p className="mt-2 text-light pr-2">
                {singleProperty?.description}
              </p>
            </div>

            <div className="mt-5 md:mt-10 shadow-md p-3 md:p-5 rounded-lg">
              <h5 className="text-seaBlue text-2xl font-semibold capitalize">
                Properties Details:
              </h5>
              <div className="md:flex gap-16 justify-between text-seaBlue">
                <ul className="w-full">
                  <li className="flex justify-between font-semibold border-b py-3 mt-4">
                    <span>Property type : </span>
                    <span className="text-light">
                      {singleProperty?.propertyCategory}
                    </span>
                  </li>
                  <li className="flex justify-between font-semibold border-b py-3 mt-4">
                    <span>Area Size : </span>
                    <span className="text-light">
                      {singleProperty?.squareFoot} SqFt
                    </span>
                  </li>
                  <li className="flex justify-between font-semibold border-b py-3 mt-4">
                    <span>Bedroom : </span>
                    <span className="text-light">
                      0{singleProperty?.bedroom}
                    </span>
                  </li>
                  <li className="flex justify-between font-semibold border-b py-3 mt-4">
                    <span>Garage : </span>
                    <span className="text-yellow">
                      <GiCheckMark />
                    </span>
                  </li>
                </ul>
                <ul className="w-full">
                  <li className="flex justify-between font-semibold border-b py-3 mt-4">
                    <span>Build year : </span>
                    <span className="text-light">
                      {singleProperty?.buildYear}
                    </span>
                  </li>
                  <li className="flex justify-between font-semibold border-b py-3 mt-4">
                    <span>Price : </span>
                    <span className="text-light">
                      ${singleProperty?.price}.00
                    </span>
                  </li>
                  <li className="flex justify-between font-semibold border-b py-3 mt-4">
                    <span>Bathroom : </span>
                    <span className="text-light">
                      0{singleProperty?.bathroom}
                    </span>
                  </li>
                  <li className="flex justify-between font-semibold border-b py-3 mt-4">
                    <span>Security : </span>
                    <span className="text-yellow">
                      <GiCheckMark />
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-5 md:mt-10 shadow-md p-3 md:p-5 rounded-lg">
              <h5 className="text-seaBlue text-2xl font-semibold capitalize">
                What,s nearby?
              </h5>
              <p className="mt-2 text-light pr-2">
                Explore nearby amenities to precisely locate your property and
                identify surrounding conveniences, providing a comprehensive
                overview of the living environment and the property,s
                convenience.
              </p>
              <div className="md:flex gap-16 justify-between text-seaBlue">
                <ul className="w-full">
                  <li className="flex justify-between font-semibold border-b py-3 mt-4">
                    <span>School : </span>
                    <span className="text-light">0.07 km</span>
                  </li>
                  <li className="flex justify-between font-semibold border-b py-3 mt-4">
                    <span>University : </span>
                    <span className="text-light">2.3 km</span>
                  </li>
                  <li className="flex justify-between font-semibold border-b py-3 mt-4">
                    <span>Grocery center : </span>
                    <span className="text-light">0.3 km</span>
                  </li>
                  <li className="flex justify-between font-semibold border-b py-3 mt-4">
                    <span>Market : </span>
                    <span className="text-light">1.3 km</span>
                  </li>
                </ul>
                <ul className="w-full">
                  <li className="flex justify-between font-semibold border-b py-3 mt-4">
                    <span>Hospital : </span>
                    <span className="text-light">2.3 km</span>
                  </li>
                  <li className="flex justify-between font-semibold border-b py-3 mt-4">
                    <span>Metro station : </span>
                    <span className="text-light">1.1 km</span>
                  </li>
                  <li className="flex justify-between font-semibold border-b py-3 mt-4">
                    <span>Gym, wellness : </span>
                    <span className="text-light">0.9 km</span>
                  </li>
                  <li className="flex justify-between font-semibold border-b py-3 mt-4">
                    <span>River : </span>
                    <span className="text-light">3.3 km</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-span-5">
            {singleProperty && <ContactSeller contactSeller={singleProperty} />}
          </div>
        </div>
        <Review email={singleProperty?.email || ""} />
      </Container>
    </div>
  );
};

export default PropertyDetails;
