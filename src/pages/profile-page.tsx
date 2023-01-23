import React from 'react'
import { baseUrl } from '../api'
import { useSession } from '../context/SessionContext'

type Props = {}

const ProfilePage = (props: Props) => {
  const { userData } = useSession()
  return (
      <div className="flex flex-col items-center lg:items-start lg:flex-row mx-auto w-full max-w-[1000px] px-8 gap-8">
        <div className="aspect-square w-[250px] overflow-hidden justify-self-center border-primary border-">
          <img
            src={
              userData?.image.includes('http')
                ? userData.image
                : baseUrl + userData?.image
            }
            alt=""
            className="h-full object-cover bg-white"
          />
        </div>
        <div className="text-bold text-xl p-4">
          <p>
            Nombre: <span className="capitalize">{userData?.name}</span>
          </p>
          <p>
            Apellido: <span className="capitalize">{userData?.lastname}</span>
          </p>
          <p>
            Correo electrónico: <span>{userData?.email}</span>
          </p>
          {userData?.admin && <p className="text-green-700">Administrador</p>}
        </div>
      </div>
  )
}

export default ProfilePage
