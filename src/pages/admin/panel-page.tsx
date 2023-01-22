import React, { useEffect, useState } from 'react'
import { Link, Navigate, useLoaderData, useNavigate } from 'react-router-dom'
import api, { baseUrl } from '../../api'
import ProtectedRoute from '../../components/ProtectedRoute'
import Button from '../../components/ui/Button'
import GoBackButton from '../../components/ui/GoBackButton'
import { useSession } from '../../context/SessionContext'
import PageLayout from '../../PageLayout'
import { Product } from '../../types'

type Props = {}

const AdminPage = (props: Props) => {
  const navigate = useNavigate()
  const { userData } = useSession()
  const products = useLoaderData() as Product[]
  const [message, setMessage] = useState<string | undefined>(undefined)

  const handleRemoveProduct = async (productId: string) => {
    if (!userData) return
    const res = await api.admin.deleteProduct(userData?.token, productId)
    if (res.error) return console.log(res.error)
    setMessage('Borraste el producto ' + productId)
    navigate(0)
  }

  return (
    <>
      {message && <p className="text-center text-red-600">{message}</p>}
      <div className="w-full max-w-[1000px] mx-auto px-8 mb-20">
        <GoBackButton />
        <Button redirect="/admin/add-product" className="w-min">
          Agregar un producto
        </Button>
        {products?.length ? (
          products.map((prod) => (
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
                  <Link
                    className="font-semibold cursor-pointer"
                    to={`/admin/edit-product/${prod.id}`}
                  >
                    Editar
                  </Link>
                  <button
                    className="font-semibold cursor-pointer"
                    onClick={() => handleRemoveProduct(prod.id)}
                  >
                    Quitar
                  </button>
                </div>
              </div>
            </li>
          ))
        ) : (
          <p className="text-center text-2xl pt-10">No hay productos</p>
        )}
      </div>
    </>
  )
}

export default AdminPage
