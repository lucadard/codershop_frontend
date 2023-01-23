import React from 'react'
import GoBackButton from '../../components/ui/GoBackButton'
import ProductForm from '../../components/ProductForm'

type Props = {}

const ProductAddPage = (props: Props) => {
  return (
    <div className="w-full max-w-[500px] p-8 mx-auto">
      <GoBackButton />
      <ProductForm />
    </div>
  )
}

export default ProductAddPage
