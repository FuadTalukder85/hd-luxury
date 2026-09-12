"use client";
import React from "react";
import Image from "next/image";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import proImg from "../../assets/images/profileImg01.jpg";
import { useGetReviewQuery } from "../../shared/redux/api/ReviewApi";
import ReviewForm from "./ReviewForm";
import { TReview } from "../../shared/types/types";

const Review = ({ email }: { email: string }) => {
  const { data } = useGetReviewQuery("");

  const filteredReviews = data?.filter(
    (rev: TReview) => rev?.reviewGet === email
  );

  return (
    <div className="mt-12 text-seaBlue">
      <h4 className="text-2xl font-bold mb-6">Customer Reviews</h4>
      <div className="space-y-4">
        {filteredReviews && filteredReviews.length > 0 ? (
          filteredReviews.map((item: TReview) => (
            <div
              key={item._id}
              className="bg-white p-5 rounded-lg shadow-sm border border-gray-100"
            >
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-3">
                  <Image
                    src={proImg}
                    alt="user"
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h5 className="font-semibold text-sm">{item.name}</h5>
                    <p className="text-xs text-gray-400">{item.date}</p>
                  </div>
                </div>
                <Rating
                  style={{ maxWidth: 90 }}
                  value={item.rating}
                  readOnly
                />
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                {item.review}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 italic text-sm">No reviews yet for this listing/agent.</p>
        )}
      </div>

      <div className="mt-8">
        <ReviewForm email={email} />
      </div>
    </div>
  );
};

export default Review;
