"use client";
import React, { useState } from "react";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { useCreateReviewMutation } from "../../shared/redux/api/ReviewApi";
import toast from "react-hot-toast";

const ReviewForm = ({ email }: { email: string }) => {
  const [rating, setRating] = useState(5);
  const [name, setName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [review, setReview] = useState("");
  const [createReview] = useCreateReviewMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !review) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      await createReview({
        name,
        email: userEmail,
        review,
        rating,
        reviewGet: email,
        date: new Date().toISOString().split("T")[0],
      }).unwrap();
      toast.success("Review submitted successfully!");
      setName("");
      setUserEmail("");
      setReview("");
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error("Failed to submit review");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg border shadow-sm mt-6">
      <h5 className="font-bold text-lg text-seaBlue mb-4">Leave a Review</h5>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-seaBlue mb-1">
            Rating
          </label>
          <Rating
            style={{ maxWidth: 120 }}
            value={rating}
            onChange={setRating}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-seaBlue mb-1">
              Your Name *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded-md text-sm outline-none text-black"
              placeholder="Full name"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-seaBlue mb-1">
              Your Email
            </label>
            <input
              type="email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              className="w-full p-2 border rounded-md text-sm outline-none text-black"
              placeholder="youremail@example.com"
            />
          </div>
        </div>
        <div>
          <label className="block text-xs font-semibold text-seaBlue mb-1">
            Your Review *
          </label>
          <textarea
            rows={4}
            value={review}
            onChange={(e) => setReview(e.target.value)}
            className="w-full p-2 border rounded-md text-sm outline-none text-black"
            placeholder="Write your experience..."
            required
          />
        </div>
        <button
          type="submit"
          className="px-6 py-2 bg-yellow text-white font-semibold text-sm rounded hover:bg-seaBlue transition-colors"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
