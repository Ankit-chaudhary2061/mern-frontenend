import { configureStore } from "@reduxjs/toolkit";

import productSllice from "./product/product-slice";
import cartSlice from "./cart/cart-slice";
import orderSlice from "./checkout/checkout-slice";


const store = configureStore({
  reducer: {
    product:productSllice,
    cart:cartSlice,
    order:orderSlice

  },
});

export default store;


// types for redux
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;