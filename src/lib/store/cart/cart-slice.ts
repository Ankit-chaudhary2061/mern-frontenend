import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Status } from "../types/global-types";
import { CartItem, CartState } from "./cart-slice-types";
import { AppDispatch } from "../store";
import api from "../../http/api";

const initialState: CartState = {
  items: [],
  status: Status.IDLE,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setItems(state: CartState, action: PayloadAction<CartItem[]>) {
      state.items = action.payload;
    },
    setStatus(state: CartState, action: PayloadAction<Status>) {
      state.status = action.payload;
    },
    setDeleteItem(state: CartState, action: PayloadAction<string>) {
      state.items = state.items.filter(item => item.productId !== action.payload);
    },
    clearCart(state: CartState) {
      state.items = [];
    },
    updateCartItem(state: CartState, action: PayloadAction<{ productId: string, quantity: number }>) {
      const { productId, quantity } = action.payload;
      const itemIndex = state.items.findIndex(item => item.productId === productId);
      if (itemIndex !== -1) {
        state.items[itemIndex].quantity = quantity;
      }
    }
  }
});

export default cartSlice.reducer;
export const { setItems, setStatus, setDeleteItem, clearCart, updateCartItem } = cartSlice.actions;

export function addToCart(productId: string) {
  return async function addToCartThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await api.post("/cart", { productId, quantity: 1 });
      if (response.status === 200) {
        const { data } = response.data;
        dispatch(setItems(data));
        dispatch(setStatus(Status.SUCCESS));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      dispatch(setStatus(Status.ERROR));
    }
  };
}

export function fetchCartItems() {
  return async function fetchCartItemsThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await api.get("/cart");
      if (response.status === 200) {
        const { data } = response.data;
        dispatch(setItems(data));
        dispatch(setStatus(Status.SUCCESS));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      dispatch(setStatus(Status.ERROR));
    }
  };
}

export function deleteCartItem(productId: string) {
  return async function deleteCartItemThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await api.delete(`/cart/${productId}`);
      if (response.status === 200) {
        dispatch(setDeleteItem(productId));
        dispatch(setStatus(Status.SUCCESS));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error: any) {
      console.error("DELETE error:", error?.response || error);
      dispatch(setStatus(Status.ERROR));
    }
  };
}

export function updateCartItemThunk(productId: string, quantity: number) {
  return async function updateCartItemAsyncThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await api.put(`/cart/${productId}`, { quantity });
      if (response.status === 200) {
        const { data } = response.data;
        dispatch(setItems(data));
        dispatch(setStatus(Status.SUCCESS));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      dispatch(setStatus(Status.ERROR));
    }
  };
}
