import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Status } from "../types/global-types";
import { Product, ProductState } from "./product-slice-types";
import { AppDispatch, RootState } from "../store";
import api from "../../http/api";

const initialState: ProductState = {
  product: [],
  status: Status.IDLE,
  singleProduct: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,

  reducers: {
    setProduct(state: ProductState, action: PayloadAction<Product[]>) {
      state.product = action.payload;
    },

    setStatus(state: ProductState, action: PayloadAction<Status>) {
      state.status = action.payload;
    },

    setSingleProduct(
      state: ProductState,
      action: PayloadAction<Product | null>
    ) {
      state.singleProduct = action.payload;
    },
  },
});

export default productSlice.reducer;

export const {
  setProduct,
  setStatus,
  setSingleProduct,
} = productSlice.actions;

// Fetch all products
export function fetchProduct() {
  return async function fetchProductThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));

    try {
      const response = await api.get("/products");

      if (response.status === 200) {
        const { data } = response.data;

        console.log(data, ":products");

        dispatch(setProduct(data));
        dispatch(setStatus(Status.SUCCESS));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error: any) {
      console.error(error);
      dispatch(setStatus(Status.ERROR));
    }
  };
}

// Fetch single product
export function fetchSingleProduct(productId: string) {
  return async function fetchSingleProductThunk(
    dispatch: AppDispatch,
    getState: () => RootState
  ) {
    const state = getState();

    const existingProduct = state.product.product.find(
      (product) => product.id === productId
    );

    // If product already exists in redux store
    if (existingProduct) {
      dispatch(setSingleProduct(existingProduct));
      dispatch(setStatus(Status.SUCCESS));
      return;
    }

    dispatch(setStatus(Status.LOADING));

    try {
      const response = await api.get(`/products/${productId}`);

      if (response.status === 200) {
        const { data } = response.data;

        console.log(data, ":single product");

        dispatch(setSingleProduct(data));
        dispatch(setStatus(Status.SUCCESS));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error: any) {
      console.error(error);
      dispatch(setStatus(Status.ERROR));
    }
  };
}