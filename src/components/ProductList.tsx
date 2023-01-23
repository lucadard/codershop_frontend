import React from 'react'
import { Product } from '../types'
import ProductCard from './ui/ProductCard'

type Props = {
  products: Product[]
}

const ProductList = ({ products }: Props) => {
  return (
    <section className="grid place-items-center px-8 mb-20">
      {products.length > 0 ? (
        <div className="grid gap-x-12 gap-y-8 lg:grid-cols-3 md:grid-cols-2">
          {products.map((product) => (
            <ProductCard key={product.id} data={product} />
          ))}
        </div>
      ) : (
        <div className="mt-48 text-2xl">
          No hay productos disponibles {':('}
        </div>
      )}
    </section>
  )
}

export default ProductList
