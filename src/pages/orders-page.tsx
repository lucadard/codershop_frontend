import React from 'react'
import { Link } from 'react-router-dom'
import { baseUrl } from '../api'
import GoBackButton from '../components/ui/GoBackButton'
import { useSession } from '../context/SessionContext'

type Props = {}

const OrdersPage = (props: Props) => {
  const { ordersDetails } = useSession()
  return (
      <ul className="flex flex-col mx-auto w-full max-w-[600px] px-8 mb-20">
        <GoBackButton />
        <h2 className="text-3xl font-semibold">Órdenes:</h2>
        {!ordersDetails?.length ? (
          <p className="text-xl">
            No tenés ordenes hechas, agregá{' '}
            <Link to="/" className="text-blue-700 hover:text-blue-900">
              un producto
            </Link>{' '}
            a tu carrito.
          </p>
        ) : (
          ordersDetails?.map(({ id, prods, createdAt }) => {
            const totalPrice = prods.reduce(
              (acc, cur) => acc + cur.cant * cur.prod.price,
              0
            )
            return (
              <li key={id}>
                <p className="text-lg font-semibold">Órden #{id}</p>
                <p className="text-lg font-semibold">
                  Creada: {new Date(createdAt).toLocaleString()}
                </p>
                <p className="text-lg font-semibold">
                  Total de la orden: ${Number(totalPrice).toLocaleString('es')}
                </p>
                <ul>
                  {prods.map(({ prod, cant }) => (
                    <li key={prod.id} className="flex py-6 gap-8">
                      <div className="w-48 aspect-[19/20] rounded-lg border-2 border-gray-300 overflow-hidden flex justify-center">
                        <img
                          src={prod.image.includes('http') ? prod.image : baseUrl+prod.image}
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
                            Cantidad:{' '}
                            <span className="font-semibold">{cant}</span>
                          </p>
                          <p className="text-lg font-semibold">
                            Total: ${Number(prod.price).toLocaleString('es')}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </li>
            )
          })
        )}
      </ul>
  )
}

export default OrdersPage
