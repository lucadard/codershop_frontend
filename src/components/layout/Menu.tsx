import React from 'react'
import { Link } from 'react-router-dom'

type Props = {
  show: boolean
  onClose: () => void
  onLogout: () => void
  isLogged: boolean
  admin: boolean | undefined
}

const Menu = ({ show, onClose, onLogout, isLogged, admin = false }: Props) => {
  if (!show) return null
  return (
    <div
      onClick={onClose}
      className="z-[200] fixed left-0 top-0 w-full h-screen overflow-hidden bg-primary bg-opacity-50 lg:hidden"
    >
      <ul
        onClick={(event) => event.stopPropagation()}
        className="flex flex-col py-4 text-lg font-semibold right-0 top-0 absolute h-screen w-[300px] bg-secondary"
      >
        {isLogged ? (
          <>
            {admin && <Link
              to="/admin"
              className="cursor-pointer flex flex-col group py-2 px-8"
            >
              <span>Panel de administrador</span>
              <span className="w-full h-[2px] bg-primary origin-left scale-0 group-hover:scale-100 duration-200" />
            </Link>}
            <Link
              to="/profile"
              className="cursor-pointer flex flex-col group py-2 px-8"
            >
              <span>Perfil</span>
              <span className="w-full h-[2px] bg-primary origin-left scale-0 group-hover:scale-100 duration-200" />
            </Link>
            <Link
              to="/shoppingcart"
              className="cursor-pointer flex flex-col group py-2 px-8"
            >
              <span>Carrito</span>
              <span className="w-full h-[2px] bg-primary origin-left scale-0 group-hover:scale-100 duration-200" />
            </Link>
            <Link
              to="/orders"
              className="cursor-pointer flex flex-col group py-2 px-8"
            >
              <span>Órdenes</span>
              <span className="w-full h-[2px] bg-primary origin-left scale-0 group-hover:scale-100 duration-200" />
            </Link>
            <Link
              to="/"
              className="cursor-pointer flex flex-col group py-2 px-8"
              onClick={onLogout}
            >
              <span>Cerrar sesión</span>
              <span className="w-full h-[2px] bg-primary origin-left scale-0 group-hover:scale-100 duration-200" />
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="cursor-pointer flex flex-col group py-2 px-8"
            >
              <span>Iniciar sesión</span>
              <span className="w-full h-[2px] bg-primary origin-left scale-0 group-hover:scale-100 duration-200" />
            </Link>
            <Link
              to="/signup"
              className="cursor-pointer flex flex-col group py-2 px-8"
            >
              <span>Registrate</span>
              <span className="w-full h-[2px] bg-primary origin-left scale-0 group-hover:scale-100 duration-200" />
            </Link>
          </>
        )}
      </ul>
    </div>
  )
}

export default Menu
