import React, { useContext } from "react";
import { HotelsContext } from "../../context/HotelsContext";
import { ThemeContext } from "../../context/ThemeContext"; 
import "./Filter.css";

function Filter({ filters, setFilters, clearFilters }) {
  const hotels = useContext(HotelsContext);
  const { theme } = useContext(ThemeContext); 

  // room types
  const roomTypes = hotels ? [...new Set(hotels.map((hotel) => hotel.roomType))] : [];

  // places
  const places = hotels ? [...new Set(hotels.map((hotel) => hotel.place))] : [];

  // price ranges
  const priceRanges = ["0-5000", "5000-6000", "6000-8000", "8000-9000"];

  const textClass = theme === "dark" ? "text-light" : "text-dark";
  const labelClass = theme === "dark" ? "text-light" : "text-muted";

  return (
    <div
      className={`filter-section shadow-sm rounded-3 ${
        theme === "dark" ? "filter-section-dark" : "bg-white"
      }`}
    >
      {/* Header */}
      <div className={`d-flex align-items-center justify-content-between px-4 py-3 border-bottom ${theme === "dark" ? "border-secondary" : ""}`}>
        <h6 className={`mb-0 fw-semibold ${textClass}`}>FILTERS</h6>
        <span
          className={`fw-semibold ${textClass}`}
          style={{ fontSize: "0.85rem", cursor: "pointer" }}
          onClick={clearFilters}
        >
          CLEAR
        </span>
      </div>

      <div className="px-4 py-4">
        {/* Room Type */}
        <p className={`fw-semibold ${textClass}`}>Room Type</p>
        {roomTypes.map((type) => (
          <div key={type} className="form-check small">
            <input
              className="form-check-input"
              type="radio"
              name="type"
              checked={filters.type === type}
              onChange={() => setFilters({ ...filters, type })}
            />
            <label className={`form-check-label ms-2 ${labelClass}`}>{type}</label>
          </div>
        ))}

        {/* Price Range */}
        <p className={`fw-semibold mt-4 ${textClass}`}>Price Range</p>
        {priceRanges.map((range) => (
          <div key={range} className="form-check small">
            <input
              className="form-check-input"
              type="radio"
              name="price"
              checked={filters.price === range}
              onChange={() => setFilters({ ...filters, price: range })}
            />
            <label className={`form-check-label ms-2 ${labelClass}`}>
              ₹{range.replace("-", " to ₹")}
            </label>
          </div>
        ))}

        {/* Place Dropdown */}
        <p className={`fw-semibold mt-4 ${textClass}`}>Place</p>
        <select
          className={`form-select form-select-sm mb-3 ${theme === "dark" ? "text-light bg-dark border-secondary" : ""}`}
          value={filters.place || ""}
          onChange={(e) => setFilters({ ...filters, place: e.target.value })}
        >
          <option value="">All Places</option>
          {places.map((place) => (
            <option key={place} value={place}>
              {place}
            </option>
          ))}
        </select>

        {/* Sort By */}
        <p className={`fw-semibold mt-4 ${textClass}`}>Sort By</p>
        {[
          { label: "Price Low to High", value: "low" },
          { label: "Price High to Low", value: "high" },
        ].map((sort) => (
          <div key={sort.value} className="form-check small">
            <input
              className="form-check-input"
              type="radio"
              name="sort"
              checked={filters.sort === sort.value}
              onChange={() => setFilters({ ...filters, sort: sort.value })}
            />
            <label className={`form-check-label ms-2 ${labelClass}`}>{sort.label}</label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Filter;
