import axios, { AxiosError } from 'axios'
import {
  FileData,
  LoginData,
  Order,
  Product,
  ProductData,
  RegisterData,
  UserData
} from '../types'

export const baseUrl = import.meta.env.VITE_API_BASE_URL

type AxiosResponse<T> = {
  data: T
}

export default {
  get: {
    products: async () => {
      const res: AxiosResponse<{ products: Product[] }> = await axios.get(
        baseUrl + '/api/products'
      )
      return res.data.products
    },
    userData: async (token: string) => {
      const res: AxiosResponse<{ userData: UserData }> = await axios.get(
        baseUrl + '/api/users',
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )
      return res.data.userData
    },
    cartProducts: async (token: string) => {
      const res: AxiosResponse<{
        products: { prod: Product; cant: number }[]
      }> = await axios.get(baseUrl + '/api/shoppingcartproducts', {
        headers: { Authorization: `Bearer ${token}` }
      })
      return res.data.products
    },
    productDetails: async (productId: string) => {
      const res: AxiosResponse<{ product: Product }> = await axios.get(
        baseUrl + '/api/products/' + productId
      )
      return res.data.product
    },
    orders: async (token: string) => {
      const res: AxiosResponse<{ orders: Order[] }> = await axios.get(
        baseUrl + '/api/orders',
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )
      return res.data.orders
    }
  },
  post: {
    login: async (body: LoginData) => {
      try {
        const { data } = await axios.post(baseUrl + '/login', body)
        return data
      } catch (err: any) {
        if (!err.response) return { error: 'Ocurrió un error' }
        else return { error: err.response.data.message }
      }
    },
    register: async (body: RegisterData) => {
      try {
        const { data } = await axios.post(baseUrl + '/api/users', body)
        return data
      } catch (err: any) {
        if (!err.response) return { error: 'Ocurrió un error' }
        else return { error: err.response.data.message }
      }
    },
    image: async (file: FileData) => {
      try {
        const { data } = await axios.post(baseUrl + '/api/images', file, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        return data
      } catch (err: any) {
        if (!err.response) return { error: 'Ocurrió un error' }
        else return { error: err.response.data.message }
      }
    },
    addProductToCart: async (token: string, productId: string) => {
      try {
        const { data } = await axios.post(
          baseUrl + '/api/shoppingcartproducts/' + productId,
          {},
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        )
        return data
      } catch (err: any) {
        if (!err.response) return { error: 'Ocurrió un error' }
        else return { error: err.response.data.message }
      }
    },
    removeProductFromCart: async (token: string, productId: string) => {
      try {
        const { data } = await axios.delete(
          baseUrl + '/api/shoppingcartproducts/' + productId,
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        )
        return data
      } catch (err: any) {
        if (!err.response) return { error: 'Ocurrió un error' }
        else return { error: err.response.data.message }
      }
    },
    order: async (token: string) => {
      try {
        const { data } = await axios.post(
          baseUrl + '/api/orders/',
          {},
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        )
        return data
      } catch (err: any) {
        if (!err.response) return { error: 'Ocurrió un error' }
        else return { error: err.response.data.message }
      }
    }
  },
  admin: {
    deleteProduct: async (token: string, productId: string) => {
      try {
        const { data } = await axios.delete(
          baseUrl + '/api/products/' + productId,
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        )
        return data
      } catch (err: any) {
        if (!err.response) return { error: 'Ocurrió un error' }
        else return { error: err.response.data.message }
      }
    },
    addProduct: async (token: string, body: ProductData) => {
      try {
        const { data } = await axios.post(baseUrl + '/api/products/', body, {
          headers: { Authorization: `Bearer ${token}` }
        })
        return data
      } catch (err: any) {
        if (!err.response) return { error: 'Ocurrió un error' }
        else return { error: err.response.data.message }
      }
    },
    editProduct: async (
      token: string,
      productId: string,
      body: ProductData
    ) => {
      try {
        const { data } = await axios.put(
          baseUrl + '/api/products/' + productId,
          body,
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        )
        return data
      } catch (err: any) {
        if (!err.response) return { error: 'Ocurrió un error' }
        else return { error: err.response.data.message }
      }
    }
  }
}
