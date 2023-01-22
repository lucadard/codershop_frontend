import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import api, { baseUrl } from '../../api'
import { Spinner } from '../../assets/Spinner'
import { useSession } from '../../context/SessionContext'
import Button from './Button'
import Modal from '../layout/Modal'

type Props = {
  id: string
  name: string
  price: number
  description: string
  imageUrl: string
}

const ProductDetails = ({ id, name, price, description, imageUrl }: Props) => {
  const { userData, updateData } = useSession()
  const [isLoading, setIsLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const handleAddToCart = async () => {
    if (!userData?.token) return

    setIsLoading(true)
    const res = await api.post.addProductToCart(userData.token, id)
    setIsLoading(false)

    if (res.error) return console.log(res.error.message)
    updateData(userData.token)
    setShowModal(true)
  }
  return (
    <>
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <span>Felicitaciones!</span>
        <span>Agregaste el producto a tu carrito</span>
        <Button redirect="/shoppingcart">Ir al carrito</Button>
      </Modal>
      <div className="grid md:grid-cols-2 gap-16">
        <div className="flex flex-col gap-10">
          <div className="flex justify-between gap-2 font-bold text-lg">
            <span className="">{name}</span>
            <span className="h-11 px-5 bg-gray-200 grid place-content-center rounded-3xl ">
              ${Number(price).toLocaleString('es')}
            </span>
          </div>
          <div className="h-[2px] w-full bg-gray-200" />
          <p>{description}</p>
          <Button
            redirect={!userData ? '/login' : ''}
            action={handleAddToCart}
            disabled={isLoading}
            className="mt-auto rounded-md text-lg h-12 "
          >
            {isLoading ? <Spinner size={30} /> : <span>Add to cart</span>}
          </Button>
        </div>
        <img
          src={imageUrl.includes('http') ? imageUrl : baseUrl+imageUrl}
          alt=""
          className="w-full rounded-lg border-[2px] border-gray-200 bg-white aspect-[19/20] object-contain"
        />
      </div>
    </>
  )
}

export default ProductDetails
