import { Status } from "../types/global-types"

export interface User {
  id: string
  email: string
  username: string
}

export interface Category {
  id: string
  categoryName: string
}

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

export interface ProductState {
  product: Product[]
  status: Status
  singleProduct: Product | null
}