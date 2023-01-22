import { stringify } from 'querystring'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import api from '../api'
import useLocalStorage from '../hooks/useLocalStorage'
import { Cart, Order, Product, UserData } from '../types'

type SessionContextProps = {
  children: React.ReactNode
}

const SessionContext = React.createContext<
  | {
      userData: UserData | undefined
      cartDetails: Cart | undefined
      ordersDetails: Order[] | undefined
      updateData: (token: string) => void
      setToken: (token: string) => void
      isToken: boolean
      logout: () => void
    }
  | undefined
>(undefined)

function SessionProvider({ children }: SessionContextProps) {
  const [userData, setUserData] = useState<UserData | undefined>(undefined)
  const [orders, setOrders] = useState<Order[] | undefined>(undefined)
  const [cart, setCart] = useState<Cart | undefined>(undefined)

  const { value: token, setValue: setToken } = useLocalStorage<
    string | undefined
  >('token', undefined)

  async function fetchOrdersDetails(token: string) {
    const orders = await api.get.orders(token)
    setOrders(orders)
  }
  async function fetchCartData(token: string) {
    const cartProducts = await api.get.cartProducts(token)
    setCart({
      products: cartProducts,
      amount: cartProducts.length
    })
  }
  async function fetchUserData(token: string) {
    const userData = await api.get.userData(token)
    setUserData({ ...userData, token })
  }

  useEffect(() => {
    if (!token) return
    try {
      fetchUserData(token)
      fetchCartData(token)
      fetchOrdersDetails(token)
    } catch (err) {
      console.log(err)
      setToken(undefined)
    }
  }, [token])

  const value = {
    userData,
    cartDetails: cart,
    ordersDetails: orders,
    updateData: (token: string) => {
      fetchCartData(token)
      fetchOrdersDetails(token)
    },
    setToken: (token: string) => setToken(token),
    isToken: Boolean(token),
    logout: () => setToken(undefined)
  }

  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  )
}

function useSession() {
  const context = React.useContext(SessionContext)
  if (context === undefined) {
    throw new Error('useSession must be used within a SessionProvider')
  }
  return context
}

export { SessionProvider, useSession }
