"use client";
import Image from "next/image";
import proImg from "../../assets/images/profileImg01.jpg";
import ReviewForm from "./ReviewForm";
import { useGetReviewQuery } from "../../redux/reviewApi/reviewApi";
import { TReview } from "../../types/types";
import { useEffect } from "react";

const Review = ({ email }: { email: string }) => {
  const { data, refetch } = useGetReviewQuery("");
  const matchReview = data?.filter((dt: TReview) => dt.reviewGet === email);
  useEffect(() => {
    const intervalId = setInterval(() => {
      refetch();
    }, 3000);
    return () => clearInterval(intervalId);
  }, [refetch]);
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-12 md:gap-10 mt-5 md:mt-16 text-seaBlue">
        <div className="col-span-7 order-last md:order-first shadow-md p-3 rounded-lg mt-5 md:mt-0">
          <div className="text-2xl font-bold text-seaBlue">
            {matchReview?.length === 0 ? (
              <div>
                <p>{matchReview?.length} Reviews</p>
                <p>No one has reviewed yet</p>
              </div>
            ) : (
              <p>{matchReview?.length} Reviews</p>
            )}
          </div>
          {matchReview?.map((review: TReview) => (
            <div key={review._id} className="flex gap-3 mt-5">
              <div>
                <Image
                  className="rounded-lg"
                  src={proImg}
                  alt="proImg"
                  width={200}
                  height={200}
                />
              </div>
              <div>
                <h3 className="text-lg font-semibold">{review.name}</h3>
                <p className="text-sm">{review.date}</p>
                <p className="mt-3">
                  {review.review || "Great service and professional approach."}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="col-span-5 order-first md:order-last">
          <div className="shadow-md p-3 rounded-lg">
            <h5 className="text-2xl font-bold text-seaBlue">Leave a review</h5>
            <ReviewForm email={email} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;
