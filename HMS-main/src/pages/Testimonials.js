// src/components/Testimonials.js

import React from "react";
import "./Styles/Testimonials.css";

const testimonialsData = [
  {
    quote: "This hospital has changed my life for the better!",
    author: "John Doe",
    image: "path/to/john-image.jpg",
  },
  {
    quote: "The staff is incredibly caring and professional.",
    author: "Jane Smith",
    image: "path/to/jane-image.jpg",
  },
  {
    quote: "I received excellent treatment and support.",
    author: "Emily Johnson",
    image: "path/to/emily-image.jpg",
  },
];

const Testimonials = () => {
  return (
    <section className="testimonials-section" id="testimonials-section">
      <h2>What Our Patients Say</h2>
      <div className="testimonials">
        {testimonialsData.map((testimonial, index) => (
          <div className="testimonial" key={index}>
            <img
              src={testimonial.image}
              alt={testimonial.author}
              className="testimonial-image"
            />
            <p className="quote">"{testimonial.quote}"</p>
            <p className="author">- {testimonial.author}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
