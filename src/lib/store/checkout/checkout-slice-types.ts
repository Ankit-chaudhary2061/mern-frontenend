import { Product } from "../product/product-slice-types";
import { Status } from "../types/global-types";

// ================= PAYMENT =================

export enum PaymentMethod {
  COD = "cod",
  ESEWA = "esewa",
  KHALTI = "khalti",
}

export enum PaymentStatus {
  UNPAID = "unpaid",
  PAID = "paid",
}

// ================= ORDER STATUS =================

export enum OrderStatus {
  PENDING = "pending",
  PROCESSING = "processing",
  SHIPPED = "shipped",
  DELIVERED = "delivered",
  CANCELED = "canceled",
}

// ================= TRANSACTION STATUS =================

export enum TransactionStatus {
  COMPLETED = "Completed",
  PENDING = "Pending",
}

// ================= PAYMENT INTERFACE =================

export interface PaymentDetails {
  paymentMethod: PaymentMethod;
}

export interface OrderPaymentData extends PaymentDetails {
  _id?: string;
  paymentStatus: PaymentStatus;
  amount?: number;
  transactionId?: string;
  pidx?: string;
}

// ================= ORDER ITEMS =================

export interface ItemDetails {
  productId: string;
  quantity: number;
}

export interface OrderResponseItems extends ItemDetails {
  orderId: string;
}

// ================= CREATE ORDER DATA =================

export interface OrderData {
  shippingAddress: string;
  phoneNumber: string;
  totalAmount: number;
  paymentDetails: PaymentDetails;
  items: ItemDetails[];
}

// ================= USER =================

export interface UserData {
  _id?: string;
  username: string;
  email: string;
}

// ================= MY ORDER =================

export interface MyOrderData {
  _id: string;

  user?: string;

  shippingAddress: string;

  phoneNumber: string;

  totalAmount: number;

  orderStatus: OrderStatus;

  createdAt: string;

  updatedAt?: string;

  payment?: OrderPaymentData;

  paymentId?: string;

  userId?: UserData;
}

// ================= ORDER DETAILS =================

export interface OrderDetails {
  _id: string;

  quantity: number;

  price: number;

  createdAt?: string;

  updatedAt?: string;

  product: Product;

  order: MyOrderData;
}

// ================= KHALTI =================

export interface KhaltiResponse {
  pidx: string;
  payment_url: string;
}

export interface TransactionVerificationResponse {
  pidx: string;

  status: TransactionStatus;

  total_amount: number;

  transaction_id: string;
}

// ================= REDUX STATE =================

export interface OrderResponseData {
  status: Status;

  items: OrderResponseItems[];

  khaltiUrl: string | null;

  myorders: MyOrderData[];

  orderDetails: OrderDetails[];
}