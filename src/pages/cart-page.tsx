import React, { useState } from 'react'
import { Link, redirect, useNavigate } from 'react-router-dom'
import api, { baseUrl } from '../api'
import { Spinner } from '../assets/Spinner'
import Button from '../components/ui/Button'
import GoBackButton from '../components/ui/GoBackButton'
import Modal from '../components/layout/Modal'
import { useSession } from '../context/SessionContext'
import PageLayout from '../PageLayout'

type Props = {}

const CartPage = (props: Props) => {
  const { userData, cartDetails, updateData } = useSession()
  const [isSendingOrder, setIsSendingOrder] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const totalPrice = cartDetails?.products.reduce(
    (acc, cur) => acc + cur.cant * cur.prod.price,
    0
  )
  const handleSendOrder = async () => {
    if (!userData) return
    const { token } = userData!
    setIsSendingOrder(true)
    const res = await api.post.order(token)
    setIsSendingOrder(false)
    if (res.error) return setErrorMessage(res.error)
    updateData(token)
    setShowModal(true)
  }
  const handleRemoveFromCart = async (productId: string) => {
    if (!userData) return
    const res = await api.post.removeProductFromCart(userData.token, productId)
    if (res.error) return setErrorMessage(res.error)
    updateData(userData.token)
  }

  return (
    <>
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <span>Muchas gracias!</span>
        <span>Se ha enviado la orden.</span>
        <Button redirect="/orders">Ir a mis órdenes</Button>
      </Modal>
      <div className="flex flex-col mx-auto w-full max-w-[600px] px-8 mb-20">
        <GoBackButton />
        <h2 className="text-3xl font-semibold">Carrito:</h2>
        {!cartDetails?.amount ? (
          <>
            <p className="text-xl">
              No hay productos que mostrar,{' '}
              <Link to="/" className="text-blue-700 hover:text-blue-900">
                agregá uno.
              </Link>
            </p>
            <p className="text-xl">
              O mira tus órdenes{' '}
              <Link to="/orders" className="text-blue-700 hover:text-blue-900">
                acá.
              </Link>
            </p>
          </>
        ) : (
          <>
            <ul className="py-4">
              {cartDetails?.products.map(({ prod, cant }) => (
                <li key={prod.id} className="flex py-6 gap-8">
                  <div className="w-48 aspect-[19/20] rounded-lg border-2 border-gray-300 overflow-hidden flex justify-center">
                    <img
                      src={
                        prod.image.includes('http')
                          ? prod.image
                          : baseUrl + prod.image
                      }
                      alt=""
                      className="h-full object-contain"
                    />
                  </div>
                  <div className="flex flex-col flex-1">
                    <div className="flex justify-between text-lg font-semibold">
                      <Link to={`/products/${prod.id}`}>{prod.name}</Link>
                      <p>${Number(prod.price).toLocaleString('es')}</p>
                    </div>
                    <div className="flex justify-between mt-auto">
                      <p className="text-gray-600">
                        Cantidad: <span className="font-semibold">{cant}</span>
                      </p>
                      <button
                        className="font-semibold cursor-pointer"
                        onClick={() => handleRemoveFromCart(prod.id)}
                      >
                        Quitar
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="flex justify-between items-center">
              <p className="text-xl text-gray-600">
                <span className="font-semibold">Total: </span>$
                {Number(totalPrice).toLocaleString('es')}
              </p>
              <Button action={handleSendOrder} disabled={isSendingOrder}>
                {isSendingOrder ? (
                  <Spinner size={20} />
                ) : (
                  <span>Enviar orden</span>
                )}
              </Button>
            </div>
            {errorMessage ? (
              <p className="text-center text-red-700">{errorMessage}</p>
            ) : null}
          </>
        )}
      </div>
    </>
  )
}

export default CartPage
