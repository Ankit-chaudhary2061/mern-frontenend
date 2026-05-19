import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OrderDetails, MyOrderData, OrderResponseData, OrderResponseItems, OrderStatus, PaymentStatus, OrderData } from "./checkout-slice-types";
import { Status } from "../types/global-types";
import { AppDispatch } from "../store";
import api from "../../http/api";


const initialState: OrderResponseData = {
  items: [],
  status: Status.LOADING,

  myorders: [],
  orderDetails: [],
};

const orderSlice = createSlice({
    name:'order',
    initialState,
    reducers:{
        setItems(state: OrderResponseData, action: PayloadAction<OrderResponseItems[]>) {
            state.items = action.payload;
        },
        setStatus(state: OrderResponseData, action: PayloadAction<Status>) {
            state.status = action.payload;
        },
     
        setMyOrders(state: OrderResponseData, action: PayloadAction<MyOrderData[]>) {
            state.myorders = action.payload;
        },
        setOrderDetails(state: OrderResponseData, action: PayloadAction<OrderDetails[]>) {
            state.orderDetails = action.payload;
        },
        updateOrderStatus(
      state: OrderResponseData,
      action: PayloadAction<{
        orderId: string;
        status: OrderStatus;
      }>
    ) {
      const { orderId, status } = action.payload;

      state.myorders = state.myorders.map((order) =>
        order._id === orderId
          ? {
              ...order,
              orderStatus: status,
            }
          : order
      );
    },
       updatePaymentStatus(
      state: OrderResponseData,
      action: PayloadAction<{
        orderId: string;
        paymentStatus: PaymentStatus;
      }>
    ) {
      const { orderId, paymentStatus } = action.payload;

      state.myorders = state.myorders.map((order) =>
        order._id === orderId
          ? {
              ...order,
              payment: {
                ...order.payment!,
                paymentStatus,
              },
            }
          : order
      );
    },

    }
})
export default orderSlice.reducer;

export const { setItems, setStatus,  setMyOrders, setOrderDetails, updateOrderStatus, updatePaymentStatus } = orderSlice.actions;

// ================= THUNKS =================
export function orderItem(data: OrderData) {
  return async function orderItemThunk(dispatch: AppDispatch) {
    try {
      dispatch(setStatus(Status.LOADING));

      const response = await api.post("/orders/create", data);

      console.log(response.data);

      // ================= eSewa =================
      if (
        response.data.payment_url &&
        response.data.data
      ) {

        dispatch(setStatus(Status.SUCCESS));

        window.location.href =
          response.data.payment_url;

        return;
      }

      // ================= Khalti =================
      if (
        response.data.payment_url &&
        response.data.pidx
      ) {

        dispatch(setStatus(Status.SUCCESS));

        window.location.href =
          response.data.payment_url;

        return;
      }

      // ================= COD =================
      if (response.data.order) {

        dispatch(
          setItems([
            {
              orderId:
                response.data.order._id,

              productId:
                data.items[0].productId,

              quantity:
                data.items[0].quantity,
            },
          ])
        );

        dispatch(setStatus(Status.SUCCESS));

        return;
      }

      dispatch(setStatus(Status.ERROR));

    } catch (error) {

      console.log(error);

      dispatch(setStatus(Status.ERROR));
    }
  };
}

// export function orderItem(data: OrderData) {
//   return async function orderItemThunk(
//     dispatch: AppDispatch
//   ) {

//     try {

//       dispatch(setStatus(Status.LOADING));

//       const response = await api.post(
//         "/orders/create",
//         data
//       );

//       dispatch(setStatus(Status.SUCCESS));

//       return response.data;

//     } catch (error) {

//       console.log(error);

//       dispatch(setStatus(Status.ERROR));

//       throw error;
//     }
//   };
// }
export function fetchMyOrders(page: number) {
  return async function fetchMyOrdersThunk(dispatch: AppDispatch) {
    try {
      dispatch(setStatus(Status.LOADING));
      const response = await api.get(`orders/my?page=${page}`);
          if (response.status === 200) {
        dispatch(setMyOrders(response.data.orders));

        dispatch(setStatus(Status.SUCCESS));
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      console.log(error);
      dispatch(setStatus(Status.ERROR));
    }
  };
}
export function fetchMyOrderDetails(orderId: string) {
    return async function fetchMyOrderDetailsThunk(dispatch: AppDispatch) {
        try {
            dispatch(setStatus(Status.LOADING));
            const response = await api.get(`orders/details/${orderId}`);
            if (response.status === 200) {
              dispatch(setOrderDetails(response.data.data));
                dispatch(setStatus(Status.SUCCESS));
            } else {
                dispatch(setStatus(Status.ERROR));
            }
        } catch (error) {
            console.log(error);
            dispatch(setStatus(Status.ERROR));
        }
    };
}
export function verifyKhaltiTransaction(
  pidx: string
) {
  return async function verifyKhaltiTransactionThunk(
    dispatch: AppDispatch
  ) {

    try {

      dispatch(setStatus(Status.LOADING));

      const response = await api.post(
        "/orders/verify-khalti",
        { pidx }
      );

      if (response.status === 200) {

        dispatch(setStatus(Status.SUCCESS));

      } else {

        dispatch(setStatus(Status.ERROR));
      }

    } catch (error) {

      console.log(error);

      dispatch(setStatus(Status.ERROR));
    }
  };
}
export const updateOrderStatusAsync =
  (orderId: string, orderStatus: OrderStatus) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(setStatus(Status.LOADING));

      const response = await api.patch(
        `/orders/status/${orderId}`,
        {
          orderStatus,
        }
      );

      dispatch(
        updateOrderStatus({
          orderId,
          status: orderStatus,
        })
      );

      dispatch(setStatus(Status.SUCCESS));

      return response.data;
    } catch (error) {
      console.log("UPDATE ORDER ERROR:", error);
      dispatch(setStatus(Status.ERROR));
      throw error;
    }
  };

// export function cancelOrder(orderId: string) {
//   return async function cancelOrderThunk(dispatch: AppDispatch) {
//     try {
//         dispatch(setStatus(Status.LOADING));    
//         const response = await api.post(`/orders/${orderId}/cancel`);   
//         if (response.status === 200) {
//             dispatch(updateOrderStatus({ orderId, orderStatus: OrderStatus.CANCELED }));
//             dispatch(setStatus(Status.SUCCESS));
//         } else {
//             dispatch(setStatus(Status.ERROR));
//         }
//     } catch (error) {
//         console.log(error);
//         dispatch(setStatus(Status.ERROR));
//     }
// }
// }
// export function deleteOrder(orderId: string) {
//     return async function deleteOrderThunk(dispatch: AppDispatch) {
//         try {
//            const response = await api.delete(`/orders/${orderId}`);
//            if (response.status === 200) {
//         dispatch(fetchMyOrders());

//         dispatch(setStatus(Status.SUCCESS));
//       } else {
//         dispatch(setStatus(Status.ERROR));
//       } 
//         } catch (error) {
//             console.log(error);
//             dispatch(setStatus(Status.ERROR));
//         }
//     }
    
// }

