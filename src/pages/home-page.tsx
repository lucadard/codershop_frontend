import { useEffect, useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import api from '../api'
import { Spinner } from '../assets/Spinner'
import ProductList from '../components/ProductList'
import PageLayout from '../PageLayout'
import { Product } from '../types'

function HomePage() {
  const products = useLoaderData() as Product[]

  return <ProductList products={products} />
}

export default HomePage
