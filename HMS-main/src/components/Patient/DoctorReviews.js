// src/components/DoctorReviews.js
import React, { useState, useEffect } from "react";
import api from "../../api";
import "./Styles/DoctorReviews.css"; // Importing the CSS for styling

const DoctorReviews = ({ doctorId }) => {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");
  const [rating, setRating] = useState(5);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await api.get(`/api/doctors/${doctorId}/reviews`);
        setReviews(response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
    fetchReviews();
  }, [doctorId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post(`/api/doctors/${doctorId}/reviews`, {
        review: newReview,
        rating,
      });
      setReviews([...reviews, response.data]); // Append new review to the list
      setNewReview(""); // Clear the form
      setRating(5); // Reset rating
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  return (
    <div className="doctor-reviews">
      <h3>Reviews</h3>
      {/* Displaying reviews */}
      {reviews.map((review) => (
        <div key={review._id} className="review-item">
          <p>{review.comment}</p>
          <p>Rating: {review.rating}</p>
        </div>
      ))}

      {/* New Review Form */}
      <form onSubmit={handleSubmit} className="review-form">
        <textarea
          value={newReview}
          onChange={(e) => setNewReview(e.target.value)}
          placeholder="Write your review"
          required
          className="review-input"
        />
        <select
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          className="rating-select"
        >
          {[...Array(5)].map((_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1} Star
            </option>
          ))}
        </select>
        <button type="submit" className="submit-review-btn">
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default DoctorReviews;
