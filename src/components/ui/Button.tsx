import React from 'react'
import { Link } from 'react-router-dom'

type Props = {
  action?: (args: any) => any
  children: React.ReactNode
  disabled?: boolean
  redirect?: string
  className?: string
}

const Button = ({
  action = () => {},
  children,
  disabled = false,
  redirect = '',
  className = ''
}: Props) => {
  return (
    <Link
      to={redirect}
      className={`flex items-center justify-center gap-2 border-2 border-primary py-1 px-5 h-9 whitespace-nowrap rounded-3xl font-semibold hover:text-white hover:bg-primary duration-150 transition-color group
      ${disabled ? 'pointer-events-none opacity-20' : ''} ${className}`}
      onClick={action}
    >
      {children}
    </Link>
  )
}

export default Button
