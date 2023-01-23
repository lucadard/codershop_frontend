import React from 'react'
import { useLoaderData, useParams } from 'react-router-dom'
import GoBackButton from '../../components/ui/GoBackButton'
import ProductForm from '../../components/ProductForm'
import { Product } from '../../types'

type Props = {}

const ProductEditPage = (props: Props) => {
  const product = useLoaderData() as Product

  return (
    <div className="w-full max-w-[500px] p-8 mx-auto mb-20">
      <GoBackButton />
      <ProductForm action={{ type: 'edit', payload: product }} />
    </div>
  )
}

export default ProductEditPage
