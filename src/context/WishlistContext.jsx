import React, { createContext, useReducer, useEffect } from "react";

export const WishlistContext = createContext();

// ✅ Function to get initial wishlist (based on logged-in user)
function getInitialWishlist() {
  const authUser = JSON.parse(localStorage.getItem("authUser"));
  const key = authUser ? `wishlist_${authUser.email}` : "wishlist_guest";
  return JSON.parse(localStorage.getItem(key)) || [];
}

// ✅ Reducer
function wishlistReducer(state, action) {
  switch (action.type) {
    case "ADD_TO_WISHLIST":
      if (state.find((item) => item.id === action.payload.id)) return state;
      return [...state, action.payload];

    case "REMOVE_FROM_WISHLIST":
      return state.filter((item) => item.id !== action.payload);

    case "CLEAR_WISHLIST":
      return [];

    default:
      return state;
  }
}

// ✅ Provider
export const WishlistProvider = ({ children }) => {
  const [wishlist, dispatch] = useReducer(wishlistReducer, [], getInitialWishlist);

  // ✅ Save wishlist in localStorage (per user)
  useEffect(() => {
    const authUser = JSON.parse(localStorage.getItem("authUser"));
    const key = authUser ? `wishlist_${authUser.email}` : "wishlist_guest";
    localStorage.setItem(key, JSON.stringify(wishlist));
  }, [wishlist]);

  // ✅ Functions
  const addToWishlist = (room) =>
    dispatch({ type: "ADD_TO_WISHLIST", payload: room });

  const removeFromWishlist = (id) =>
    dispatch({ type: "REMOVE_FROM_WISHLIST", payload: id });

  const isFavorite = (id) => wishlist.some((item) => item.id === id);

  const clearWishlist = () => dispatch({ type: "CLEAR_WISHLIST" });

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        isFavorite,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
