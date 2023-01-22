export type Product = {
  id: string
  name: string
  description: string
  price: number
  image: string
}
export type UserData = {
  token: string
  name: string
  lastname: string
  image: string
  email: string
  admin: boolean
}
export type ProductData = {
  name: string
  description: string
  price: number
  image: string | undefined
}
export type Order = {
  id: string
  clientId: string
  prods: { prod: Product; cant: number }[]
  createdAt: string
}

export type Cart = {
  products: { prod: Product; cant: number }[]
  amount: number
}

export type LoginData = {
  email: string
  password: string
}

export type RegisterData = {
  email: string
  password: string
  name: string
  lastname: string
  image: string | undefined
}

export type FileData = {
  image: any
}
