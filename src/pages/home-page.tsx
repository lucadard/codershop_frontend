import React from 'react'
import { useLoaderData } from 'react-router-dom'
import ProductList from '../components/ProductList'
import { Product } from '../types'

function HomePage() {
  const products = useLoaderData() as Product[]

  return <ProductList products={products} />
}

export default HomePage
