import { Category, User } from "../product/product-slice-types"
import { Status } from "../types/global-types"



export interface Product {
  _id: string

  name: string
  description: string
  price: number

  coverImage: {
    path: string
    publicId: string
  }

  image: {
    path: string
    publicId: string
  }[]

  isFeatured: boolean
  newArrival: boolean
  stock: number

  createdAt: string
  updatedAt: string

  createdBy: User
  category: Category
}
export interface CartItem {
  product: Product;   
  quantity: number;
  productId?: string;
}

export interface CartState{
    items : CartItem[],
    status:Status
}