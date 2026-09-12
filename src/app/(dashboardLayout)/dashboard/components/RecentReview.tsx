"use client";
import Image from "next/image";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import proImg from "../../../../assets/images/profileImg01.jpg";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { useGetReviewQuery } from "../../../../shared/redux/api/ReviewApi";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useEffect } from "react";
import { TArrowProps, TReview } from "../../../../shared/types/types";

const NextArrow = ({ onClick }: TArrowProps) => {
  return (
    <div className="absolute -bottom-16 right-0 flex md:px-0">
      <div
        className="custom-arrow prev-arrow bg-yellow p-2 rounded-md shadow-md cursor-pointer hover:bg-seaBlue transition-colors"
        onClick={onClick}
      >
        <MdChevronRight className="text-xl text-white" />
      </div>
    </div>
  );
};

const PrevArrow = ({ onClick }: TArrowProps) => {
  return (
    <div className="absolute -bottom-16 right-12 flex md:px-0 z-10">
      <div
        className="custom-arrow next-arrow bg-white border border-gray-200 p-2 rounded-md shadow-md cursor-pointer hover:bg-seaBlue transition-colors z-10"
        onClick={onClick}
      >
        <MdChevronLeft className="text-xl text-yellow" />
      </div>
    </div>
  );
};

const RecentReview = () => {
  const { data, refetch } = useGetReviewQuery("");
  const recentReview = data
    ? [...data].sort(
        (a: TReview, b: TReview) => new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime()
      )
    : [];

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      refetch();
    }, 3000);
    return () => clearInterval(intervalId);
  }, [refetch]);

  return (
    <div className="w-full mt-8 text-seaBlue bg-white p-5 pb-20 shadow-md rounded-lg relative">
      <h5 className="font-semibold text-lg mb-4">Recent Reviews</h5>
      <Slider {...settings}>
        {recentReview?.map((review: TReview) => (
          <div key={review._id} className="bg-gray-50 p-4 rounded-md">
            <div className="md:flex justify-between items-center">
              <div className="flex gap-3 items-center">
                <Image
                  className="rounded-full w-10 h-10 object-cover"
                  src={proImg}
                  alt="proImg"
                  width={40}
                  height={40}
                />
                <div>
                  <p className="font-semibold text-sm">{review?.name}</p>
                  <p className="text-xs text-gray-500">{review?.date}</p>
                </div>
              </div>
              <div className="mt-2 md:mt-0">
                <Rating style={{ maxWidth: 80 }} value={review?.rating || 5} readOnly />
              </div>
            </div>
            <p className="mt-3 text-sm text-gray-700">{review?.review}</p>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default RecentReview;
