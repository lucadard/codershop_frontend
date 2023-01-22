import React, { useState } from 'react'
import { baseUrl } from '../../api'
import { CoderLogo } from '../../assets/coder-logo'
import { Wave } from '../../assets/Wave'
import { useSession } from '../../context/SessionContext'
import Button from '../ui/Button'
import Menu from './Menu'

type Props = {
  title?: string
}

const Navbar = ({ title = 'Coder Shop' }: Props) => {
  const [showMenu, setShowMenu] = useState(false)
  const { userData, cartDetails, ordersDetails, logout } = useSession()
  const [logoutHover, setLogoutHover] = useState(false)

  function handleLogout() {
    logout()
    location.assign('/')
  }

  return (
    <>
      <Menu
        onLogout={handleLogout}
        isLogged={Boolean(userData)}
        show={showMenu}
        onClose={() => setShowMenu(false)}
        admin={userData?.admin}
      />
      <nav className="select-none relative overflow-hidden">
        <div className="z-30 relative grid grid-cols-3 items-center bg-primary text-secondary h-24 px-6 lg:px-12">
          <div className="justify-self-start items-center flex mde:flex-col md:gap-4 ">
            <Button
              redirect="/"
              className="border-secondary h-12 lg:h-10 px-0 py-0 aspect-square mr-auto hover:bg-secondary"
            >
              <CoderLogo className=" fill-secondary group-hover:fill-primary transition-colors duration-300 lg:scale-[0.75]" />
            </Button>
            {userData?.admin && (
              <Button
                redirect="/admin"
                className="border-secondary h-12 lg:h-10 px-0 py-0 aspect-square mr-auto hover:bg-secondary hidden lg:flex hover:text-primary"
              >
                <span className="material-symbols-outlined">
                  admin_panel_settings
                </span>
              </Button>
            )}
          </div>
          <h1 className="justify-self-center text-3xl font-logo whitespace-nowrap">
            {title}
          </h1>
          <Button
            action={() => setShowMenu(true)}
            className="border-secondary h-12 px-0 py-0 aspect-square ml-auto hover:text-primary hover:bg-secondary lg:hidden"
          >
            <span className="material-symbols-outlined scale-125 lg:scale-90">
              menu
            </span>
          </Button>
          <div className="justify-self-end items-center hidden lg:flex mde:flex-col md:gap-4 ">
            <Button
              redirect={userData ? '/shoppingcart' : '/login'}
              className="px-4 text-md shadow-lg shadow-black text-secondary border-secondary hover:text-primary hover:bg-secondary"
            >
              <span className="material-symbols-outlined scale-[.8]">
                local_mall
              </span>
              {cartDetails && <span>{cartDetails?.amount}</span>}
            </Button>
            {userData ? (
              <>
                <Button
                  redirect="/orders"
                  className="px-4 text-md shadow-lg shadow-black text-secondary border-secondary hover:text-primary hover:bg-secondary"
                >
                  <span className="material-symbols-outlined scale-[.8]">
                    order_approve
                  </span>
                  <span>{ordersDetails?.length}</span>
                </Button>
                <Button
                  redirect="/profile"
                  className="px-0 py-0 aspect-square shadow-lg overflow-hidden rounded-full shadow-black border-secondary"
                >
                  <img
                    src={
                      userData.image.includes('http')
                        ? userData.image
                        : baseUrl + userData.image
                    }
                    alt=""
                    className="h-full object-cover bg-white"
                  />
                </Button>
                <div
                  onMouseEnter={() => setLogoutHover(true)}
                  onMouseLeave={() => setLogoutHover(false)}
                >
                  <Button
                    action={handleLogout}
                    redirect="/"
                    className="px-3 text-md shadow-lg shadow-black text-secondary border-secondary hover:text-primary hover:bg-secondary"
                  >
                    <span className="material-symbols-outlined scale-[.8]">
                      {logoutHover ? 'door_open' : 'door_front'}
                    </span>
                  </Button>
                </div>
              </>
            ) : null}
          </div>
        </div>
        <Wave className="fill-primary" />
      </nav>
    </>
  )
}

export default Navbar
