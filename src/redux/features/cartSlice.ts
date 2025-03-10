import { IProduct } from "@/types/product";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
export interface CartProduct extends IProduct {
  quantity: number;
}
type TInitialState = {
  products: CartProduct[];
};
const initialState: TInitialState = {
  products: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const product = state.products.find((p) => p._id === action.payload._id);
      if (product) {
        product.quantity += 1;
        return;
      }
      state.products.push({ ...action.payload, quantity: 1 });
    },
    increment: (state, action) => {
      const product = state.products.find((p) => p._id === action.payload);
      if (product) {
        product.quantity += 1;
        return;
      }
    },
    decrement: (state, action) => {
      const product = state.products.find((p) => p._id === action.payload);
      if (product && product.quantity > 1) {
        product.quantity -= 1;
        return;
      }
    },
    removeProduct: (state, action) => {
      state.products = state.products.filter((p) => p._id !== action.payload);
      return;
    },
    clearCart: (state) => {
      state.products = [];
    },
  },
});

export const orderProductsSelector = (state: RootState) => state.cart.products;
export const orderSelector = (state: RootState) => {
  return {
    products: state.cart.products.map((product) => ({
      productId: product._id,
      quantity: product.quantity,
    })),
  };
};
export const totalPriceSelector = (state: RootState) => {
  return state.cart.products.reduce((total, product) => {
    return total + product.price * product.quantity;
  }, 0);
};
export const { addProduct, increment, decrement, removeProduct, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
