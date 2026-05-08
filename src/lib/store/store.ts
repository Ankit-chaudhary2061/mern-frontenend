import { configureStore } from "@reduxjs/toolkit";

import productSllice from "./product/product-slice";
import cartSlice from "./cart/cart-slice";


const store = configureStore({
  reducer: {
    product:productSllice,
    cart:cartSlice,

  },
});

export default store;


// types for redux
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;