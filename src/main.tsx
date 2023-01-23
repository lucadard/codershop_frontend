import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  Outlet,
  RouterProvider
} from 'react-router-dom'
import './index.css'

import { SessionProvider } from './context/SessionContext'

import HomePage from './pages/home-page'
import ProductPage from './pages/product-page'
import ProfilePage from './pages/profile-page'
import CartPage from './pages/cart-page'
import OrdersPage from './pages/orders-page'

import ErrorPage from './pages/error/error'

import LoginPage from './pages/login-page'
import SignupPage from './pages/signup-page'

import AdminPage from './pages/admin/panel-page'
import ProductEditPage from './pages/admin/edit-product-page'
import ProductAddPage from './pages/admin/add-product-page'
import api from './api'
import PageLayout from './PageLayout'
import ProtectedRoute from './components/ProtectedRoute'
import NotFoundPage from './pages/error/not-found'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <PageLayout>
        <Outlet />
      </PageLayout>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: '',
        loader: async () => await api.get.products(),
        element: <HomePage />
      },
      {
        path: 'products/:productId',
        loader: async ({ params }) =>
          await api.get.productDetails(params.productId as string),
        element: <ProductPage />
      },
      {
        path: 'profile',
        element: <ProtectedRoute element={<ProfilePage />} />
      },
      {
        path: 'shoppingcart',
        element: <ProtectedRoute element={<CartPage />} />
      },
      {
        path: 'orders',
        element: <ProtectedRoute element={<OrdersPage />} />
      },
      {
        path: 'admin',
        loader: async () => await api.get.products(),
        children: [
          {
            path: '',
            loader: async () => await api.get.products(),
            element: <ProtectedRoute element={<AdminPage />} admin={true} />
          },
          {
            path: 'edit-product/:productId',
            loader: async ({ params }) =>
              await api.get.productDetails(params.productId as string),
            element: (
              <ProtectedRoute element={<ProductEditPage />} admin={true} />
            )
          },
          {
            path: 'admin/add-product',
            element: (
              <ProtectedRoute element={<ProductAddPage />} admin={true} />
            )
          }
        ]
      }
    ]
  },
  {
    path: 'login',
    element: <LoginPage />
  },
  {
    path: 'signup',
    element: <SignupPage />
  },
  {
    path: '*',
    element: <NotFoundPage />
  }
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <SessionProvider>
    <RouterProvider router={router} />
  </SessionProvider>
)
