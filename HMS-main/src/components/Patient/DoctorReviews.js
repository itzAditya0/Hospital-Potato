import React, { useState, useEffect } from "react";
import "./Styles/DoctorReviews.css";

const DoctorReviews = ({ appointments }) => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [newRating, setNewRating] = useState(0);
  const [newReview, setNewReview] = useState("");

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = () => {
    // Mock data, replace with an API call when available
    setDoctors([
      {
        id: 1,
        name: "Dr. John Doe",
        fee: "$150",
        rating: 4.3,
        reviews: [{ rating: 4, comment: "Very attentive", patient: "Alice" }],
      },
      {
        id: 2,
        name: "Dr. Sarah Lee",
        fee: "$200",
        rating: 4.5,
        reviews: [{ rating: 5, comment: "Great experience", patient: "Bob" }],
      },
      {
        id: 3,
        name: "Dr. Emily Brown",
        fee: "$180",
        rating: 4.2,
        reviews: [{ rating: 4, comment: "Good doctor", patient: "Carol" }],
      },
    ]);
  };

  const handleReviewSubmit = () => {
    if (newRating > 0 && newRating <= 5 && newReview) {
      const updatedDoctors = doctors.map((doctor) => {
        if (doctor.id === selectedDoctor.id) {
          const newReviews = [
            ...doctor.reviews,
            { rating: newRating, comment: newReview, patient: "You" },
          ];
          const updatedRating =
            (doctor.rating * doctor.reviews.length + newRating) /
            (doctor.reviews.length + 1);

          return {
            ...doctor,
            reviews: newReviews,
            rating: updatedRating,
          };
        }
        return doctor;
      });
      setDoctors(updatedDoctors);
      setSelectedDoctor(null); // Close review form
      setNewRating(0);
      setNewReview("");
      alert("Review submitted successfully!");
    } else {
      alert("Please provide a rating between 1 and 5 and a review.");
    }
  };

  const eligibleDoctors = doctors.filter((doctor) =>
    appointments.some((appt) => appt.doctor === doctor.name)
  );

  return (
    <div className="doctor-reviews">
      <h2>Doctor Reviews and Ratings</h2>

      <table className="doctor-table">
        <thead>
          <tr>
            <th>Doctor</th>
            <th>Fee</th>
            <th>Rating</th>
            <th>Reviews</th>
            <th>Rate & Review</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((doctor) => (
            <tr key={doctor.id}>
              <td>{doctor.name}</td>
              <td>{doctor.fee}</td>
              <td>{doctor.rating.toFixed(1)} / 5</td>
              <td>
                {doctor.reviews.length > 0 ? (
                  <button onClick={() => setSelectedDoctor(doctor)}>
                    View Reviews
                  </button>
                ) : (
                  "No reviews yet"
                )}
              </td>
              <td>
                {eligibleDoctors.includes(doctor) ? (
                  <button onClick={() => setSelectedDoctor(doctor)}>
                    Add Review
                  </button>
                ) : (
                  "Not Eligible"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Review Form and Reviews Modal */}
      {selectedDoctor && (
        <div className="review-modal">
          <div className="modal-content">
            <h3>{selectedDoctor.name} - Rate & Review</h3>
            <label>Rating (1 to 5):</label>
            <input
              type="number"
              max="5"
              min="1"
              value={newRating}
              onChange={(e) =>
                setNewRating(Math.min(5, Number(e.target.value)))
              }
            />
            <label>Review:</label>
            <textarea
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
              placeholder="Write your review here..."
            />
            <button onClick={handleReviewSubmit}>Submit Review</button>
            <button onClick={() => setSelectedDoctor(null)}>Cancel</button>

            <h3>Previous Reviews</h3>
            <ul className="review-list">
              {selectedDoctor.reviews.map((review, index) => (
                <li key={index}>
                  <strong>{review.patient}:</strong> {review.comment} -{" "}
                  <span>{review.rating} / 5</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorReviews;
