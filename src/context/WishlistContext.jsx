import React, { createContext, useReducer, useEffect } from "react";

export const WishlistContext = createContext();

const initialState = JSON.parse(localStorage.getItem("wishlist")) || [];

function wishlistReducer(state, action) {
  switch (action.type) {
    case "ADD_TO_WISHLIST":
      if (state.find((item) => item.id === action.payload.id)) return state; // avoid duplicates
      return [...state, action.payload];

    case "REMOVE_FROM_WISHLIST":
      return state.filter((item) => item.id !== action.payload);

    case "CLEAR_WISHLIST":
      return [];

    default:
      return state;
  }
}

export const WishlistProvider = ({ children }) => {
  const [wishlist, dispatch] = useReducer(wishlistReducer, initialState);

  // ✅ persist wishlist in localStorage
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  // ✅ helper functions
  const addToWishlist = (room) => {
    dispatch({ type: "ADD_TO_WISHLIST", payload: room });
  };

  const removeFromWishlist = (id) => {
    dispatch({ type: "REMOVE_FROM_WISHLIST", payload: id });
  };

  const isFavorite = (id) => {
    return wishlist.some((item) => item.id === id);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        isFavorite,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
