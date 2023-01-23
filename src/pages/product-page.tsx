import React from 'react'
import { useLoaderData } from 'react-router-dom'
import { Spinner } from '../assets/Spinner'
import GoBackButton from '../components/ui/GoBackButton'
import ProductDetails from '../components/ui/ProductDetails'
import { Product } from '../types'

type Props = {}

const ProductPage = (props: Props) => {
  const productDetails = useLoaderData() as Product
  return (
      <section className="w-full max-w-[1100px] px-8 mx-auto mb-20">
        <GoBackButton />
        {productDetails ? (
          <ProductDetails
            id={productDetails?.id}
            description={productDetails?.description}
            imageUrl={productDetails?.image}
            name={productDetails?.name}
            price={productDetails?.price}
          />
        ) : (
          <div className="h-full grid place-content-center mt-48">
            <Spinner size={50} />
          </div>
        )}
      </section>
  )
}

export default ProductPage
