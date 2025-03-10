import { IProduct } from "@/types/product";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface WishlistProduct extends IProduct {}

type TInitialState = {
  products: WishlistProduct[];
};

const initialState: TInitialState = {
  products: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addProductToWishList: (state, action) => {
      const existingProduct = state.products.find(
        (p) => p._id === action.payload._id
      );
      if (!existingProduct) {
        state.products.push(action.payload);
      }
    },

    removeProductFromWishlist: (state, action) => {
      state.products = state.products.filter(
        (product) => product._id !== action.payload
      );
    },

    clearWishlist: (state) => {
      state.products = [];
    },
  },
});

export const wishlistProductsSelector = (state: RootState) =>
  state.wishlist.products;

export const {
  addProductToWishList,
  removeProductFromWishlist,
  clearWishlist,
} = wishlistSlice.actions;
export default wishlistSlice.reducer;
