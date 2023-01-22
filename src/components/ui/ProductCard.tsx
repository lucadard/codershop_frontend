import React from 'react'
import { Product } from '../../types'
import { Link } from 'react-router-dom'
import { baseUrl } from '../../api'

type Props = {
  data: Product
}

const ProductCard = ({ data }: Props) => {
  return (
    <Link to={`/products/${data.id}`} className="max-w-[300px] group">
      <div className="border-2 border-gray-200 rounded-xl relative overflow-hidden bg-white">
        <div className="absolute w-full h-full bg-secondary bg-opacity-50 grid place-content-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="material-symbols-outlined text-4xl">local_mall</span>
        </div>
        <img
          src={data.image.includes('http') ? data.image : baseUrl + data.image}
          alt=""
          className="aspect-[19/20] px-4 object-contain w-full"
        />
      </div>
      <div className="flex justify-between gap-2 pt-3 text-lg capitalize">
        <div className="relative w-full overflow-hidden">
          <p className="whitespace-nowrap overflow-hidden text-ellipsis">
            {data.name}
          </p>
          <div className="-bottom-[1px] absolute w-full h-[3px] bg-black scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-150" />
        </div>
        <span className="font-bold">
          ${Number(data.price).toLocaleString('es')}
        </span>
      </div>
    </Link>
  )
}

export default ProductCard
