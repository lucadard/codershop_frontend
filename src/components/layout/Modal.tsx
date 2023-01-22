import React from 'react'
import Button from '../ui/Button'

type Props = {
  show: boolean
  onClose: () => void
  children: React.ReactNode[]
}

const Modal = ({ children, show, onClose }: Props) => {
  if (!show) return null
  return (
    <div
      onClick={onClose}
      className={`z-[100] fixed top-0 left-0 h-screen w-full bg-primary bg-opacity-50`}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="w-full max-w-[500px] py-10 mx-auto mt-[30vh] bg-secondary rounded-3xl flex flex-col items-center gap-4 text-lg shadow-lg"
      >
        <p className="text-3xl font-semibold">{children[0]}</p>
        <p className="text-2xl">{children[1]}</p>
        <div className="flex w-full justify-evenly mt-2">
          {children[2]}
          <Button action={onClose}>Aceptar</Button>
        </div>
      </div>
    </div>
  )
}

export default Modal
