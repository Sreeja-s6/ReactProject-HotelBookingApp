import React from "react";
import { assets } from "../assets/assets";

function StarRating({ rating = 4 }) {
    return (
        <div className="d-flex justify-content-center mb-3">
            {Array(5)
                .fill('')
                .map((_, index) => (
                    <img src={rating > index ? assets.starIconFilled : assets.starIconOutlined} alt="star-icon"
                        style={{ width: '1.125rem', height: '1.125rem' }} />
                ))}
        </div>
    );
}

export default StarRating;
