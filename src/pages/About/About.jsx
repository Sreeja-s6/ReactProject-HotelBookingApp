import React, { useEffect, useState } from "react";
import axios from "axios";
import './About.css';

const About = () => {
  const [offerImage, setOfferImage] = useState("");

  useEffect(() => {
    // Fetch exclusive offers from db.json
    axios
      .get("http://localhost:5001/exclusiveOffers")
      .then((res) => {
        if (res.data.length > 0) {
          // Get the first offer's image
          setOfferImage(res.data[0].image);
        }
      })
      .catch((err) => console.error("Error fetching offer image:", err));
  }, []);

  return (
    <div className="about-container">
      {offerImage && (
        <div
          className="about-hero"
          style={{ backgroundImage: `url(${offerImage})` }}
        >
          <h1 className="about-hero-heading">About Us</h1>
        </div>
      )}

      <div className="about-content">
        <p>
          Welcome to <strong>QuickStay</strong>, your trusted hotel booking platform. 
          We make finding and booking your perfect stay simple, fast, and hassle-free. 
          From luxurious resorts to cozy budget hotels, QuickStay offers a wide range of accommodations to suit every traveler’s needs.
        </p>
        <p>
          Our mission is to make travel comfortable and accessible for everyone. 
          With QuickStay, you can explore new destinations, discover hidden gems, and enjoy unforgettable experiences. 
          Our platform provides real-time availability, honest reviews, and competitive pricing so you can book with confidence.
        </p>
        <p>
          We value our customers and are committed to delivering exceptional service every step of the way. 
          Whether it’s a business trip, a family vacation, or a weekend getaway, QuickStay is your reliable companion for a seamless travel experience.
        </p>
      </div>
    </div>
  );
};

export default About;
