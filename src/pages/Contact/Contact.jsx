import React, { useEffect, useState } from "react";
import axios from "axios";
import './Contact.css';

const Contact = () => {
  const [offerImage, setOfferImage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Fetch exclusiveOffers from db.json
    axios
      .get("http://localhost:5001/exclusiveOffers")
      .then((res) => {
        if (res.data.length > 0) {
          setOfferImage(res.data[0].image);
        }
      })
      .catch((err) => console.error("Error fetching offer image:", err));
  }, []);

  // Regex patterns
  const namePattern = /^[A-Za-z ]*$/;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phonePattern = /^[0-9]{0,10}$/; // max 10 digits while typing
  const messagePattern = /^[A-Za-z ]*$/;

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Update form data
    setFormData({ ...formData, [name]: value });

    // Validate onChange
    let error = "";
    switch (name) {
      case "name":
        if (!value.trim()) {
          error = "Name is required";
        } else if (!namePattern.test(value)) {
          error = "Name can contain only letters and spaces";
        }
        break;

      case "email":
        if (!value.trim()) {
          error = "Email is required";
        } else if (!emailPattern.test(value)) {
          error = "Invalid email address";
        }
        break;

      case "phone":
        if (!value.trim()) {
          error = "Contact number is required";
        } else if (!/^\d{10}$/.test(value)) {
          error = "Enter a valid 10-digit number";
        }
        break;

      case "message":
        if (value && !messagePattern.test(value)) {
          error = "Message cannot contain numbers or special characters";
        }
        break;

      default:
        break;
    }

    setErrors({ ...errors, [name]: error });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Final validation before submit
    const hasErrors = Object.values(errors).some((err) => err !== "");
    if (!hasErrors && formData.name && formData.email && formData.phone) {
      alert("Form submitted successfully!");
      setFormData({ name: "", email: "", phone: "", message: "" });
      setErrors({});
    } else {
      alert("Please fix errors before submitting!");
    }
  };

  return (
    <div className="contact-container">
      {offerImage && (
        <div
          className="contact-hero"
          style={{ backgroundImage: `url(${offerImage})` }}
        >
          <h1 className="contact-hero-heading">Contact Us</h1>
        </div>
      )}

      <div className="contact-form-container">
        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-group">
            <label>Name<span>*</span></label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
            />
            {errors.name && <span className="error">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label>Email<span>*</span></label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label>Contact Number<span>*</span></label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your contact number"
            />
            {errors.phone && <span className="error">{errors.phone}</span>}
          </div>

          <div className="form-group">
            <label>Message (Optional)</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Enter your message"
              rows="4"
            />
            {errors.message && <span className="error">{errors.message}</span>}
          </div>

          <button type="submit" className="submit-btn">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
