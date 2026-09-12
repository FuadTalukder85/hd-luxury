"use client";
import Image from "next/image";
import { useGetUserQuery } from "../../../../../shared/redux/api/UserApi";
import { LoginInputs } from "../../../../../shared/types/types";

type ContactSellerProps = {
  contactSeller: { email?: string };
};

const ContactSeller = ({ contactSeller }: ContactSellerProps) => {
  const { data } = useGetUserQuery("");
  const listedBy = data?.find(
    (dt: LoginInputs) => dt?.email === contactSeller?.email
  );

  return (
    <div className="md:w-[480px]">
      <div className="w-full mx-auto bg-white border shadow-md rounded-lg p-3 md:p-5">
        <h2 className="text-xl font-semibold text-seaBlue mb-4 uppercase">
          Listed By
        </h2>
        <div className="flex items-center mb-4">
          <Image
            src={listedBy?.image || "/banner01.jpg"}
            width={64}
            height={64}
            alt="seller"
            className="w-16 h-16 rounded-lg mr-4 object-cover"
          />
          <div>
            <p className="font-medium text-seaBlue">{listedBy?.name}</p>
            <p className="text-sm text-seaBlue">{listedBy?.number}</p>
            <p className="text-sm text-seaBlue">{listedBy?.email}</p>
          </div>
        </div>
        <div>
          <h3 className="text-center font-semibold text-xl text-seaBlue uppercase mb-3">
            Contact Agent
          </h3>
        </div>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-seaBlue mb-1"
              htmlFor="fullName"
            >
              Full Name:
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              placeholder="Your name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none text-black"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-seaBlue mb-1"
              htmlFor="phoneNumber"
            >
              Phone Number:
            </label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              placeholder="ex 01756000000"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none text-black"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-seaBlue mb-1"
              htmlFor="emailAddress"
            >
              Email Address:
            </label>
            <input
              type="email"
              id="emailAddress"
              name="emailAddress"
              placeholder="youremail@gmail.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none text-black"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-seaBlue mb-1"
              htmlFor="message"
            >
              Your Message:
            </label>
            <textarea
              id="message"
              name="message"
              placeholder="Message"
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none text-black"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-yellow text-white uppercase font-semibold text-sm py-3 px-4 rounded-md hover:bg-seaBlue transition-all duration-300 focus:outline-none"
          >
            Send Message
          </button>
        </form>
      </div>

      <div
        className="relative mt-10 shadow-md bg-cover bg-center bg-no-repeat md:rounded-lg w-full h-[300px] md:h-[520px] p-5 text-white overflow-hidden"
        style={{ backgroundImage: "url('/ads.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent md:rounded-lg"></div>
        <div className="relative z-10">
          <h5 className="mt-12 md:mt-72 text-xl md:text-3xl font-bold">
            We can help you find a local real estate agent
          </h5>
          <p className="mt-3 text-sm text-white/90">
            Connect with a trusted agent who knows the market inside out - whether you&apos;re buying or selling.
          </p>
          <button className="mt-5 w-full bg-yellow text-white text-sm font-semibold uppercase py-3 px-4 rounded-md hover:bg-seaBlue transition-all duration-300">
            Make an appointment
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactSeller;
