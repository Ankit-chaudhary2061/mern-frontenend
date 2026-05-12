import { configureStore } from "@reduxjs/toolkit";

import productSllice from "./product/product-slice";
import cartSlice from "./cart/cart-slice";
import orderSlice from "./checkout/checkout-slice";
import authSlice from "./auth/auth-slice";
import gallerySlice from "./gallery/gallery-slice";


const store = configureStore({
  reducer: {
    product:productSllice,
    cart:cartSlice,
    order:orderSlice,
    auth:authSlice,
    gallery:gallerySlice

  },
});

export default store;


// types for redux
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;