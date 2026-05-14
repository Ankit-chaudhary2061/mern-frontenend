import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Status } from "../types/global-types";
import { CartItem, CartState } from "./cart-slice-types";
import { AppDispatch } from "../store";
import api from "../../http/api";

const initialState: CartState = {
  items: [],
  status: Status.IDLE,
};

interface DeleteAction {
  productId: string;
}

interface UpdateAction {
  productId: string;
  quantity: number;
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<CartItem[]>) {
      state.items = action.payload;
    },

    setStatus(state, action: PayloadAction<Status>) {
      state.status = action.payload;
    },

    // ✅ FIXED DELETE
    setDeleteItem(state, action: PayloadAction<DeleteAction>) {
      state.items = state.items.filter(
        (item) => item.productId !== action.payload.productId
      );
    },

    clearCart(state) {
      state.items = [];
    },


    setUpdateItem(state, action: PayloadAction<UpdateAction>) {
      const index = state.items.findIndex(
        (item) => item.productId === action.payload.productId
      );

      if (index !== -1) {
        state.items[index].quantity = action.payload.quantity;
      }
    },
  },
});

export default cartSlice.reducer;

export const {
  setItems,
  setStatus,
  setDeleteItem,
  clearCart,
  setUpdateItem,
} = cartSlice.actions;

export function addToCart(productId: string) {
  return async function addToCartThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
    const response = await api.post("/cart", { productId, quantity: 1 });
      if (response.status === 200) {
      const cart = response.data.data;

dispatch(setItems(cart.items || []));
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
        const cart = response.data.data;
       dispatch(setItems(cart.items || []));
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
        dispatch(setDeleteItem({ productId }));
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

export function updateCartItem(productId: string, quantity: number) {
  return async function updateCartItemAsyncThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
    const response = await api.patch(`/cart/${productId}`, { quantity });;
      if (response.status === 200) {
        const cart = response.data.data;

dispatch(setItems(cart.items || []));
dispatch(setStatus(Status.SUCCESS));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      dispatch(setStatus(Status.ERROR));
    }
  };
}
