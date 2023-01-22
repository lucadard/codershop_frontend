import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api'
import { Spinner } from '../assets/Spinner'
import { useSession } from '../context/SessionContext'

const LoginForm = () => {
  const navigate = useNavigate()
  const { setToken } = useSession()
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  )

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const { email, password, repeat_password } = event.currentTarget

    if (password.value !== repeat_password.value)
      return setErrorMessage('Las contraseñas no coinciden.')

    const body = {
      email: email.value,
      password: password.value
    }

    setIsLoading(true)
    const res = await api.post.login(body)
    setIsLoading(false)
    if (res.error) return setErrorMessage(res.error)

    navigate('/')
    setToken(res.token)
  }
  return (
    <form onSubmit={handleLogin} className="flex flex-col gap-4">
      <input
        autoFocus
        type="text"
        name="email"
        placeholder="Correo electrónico"
        className="bg-white border-2 border-gray-200 rounded-lg py-1 px-2"
      />
      <input
        type="password"
        name="password"
        placeholder="Contraseña"
        className="bg-white border-2 border-gray-200 rounded-lg py-1 px-2"
      />
      <input
        type="password"
        name="repeat_password"
        placeholder="Repetir contraseña"
        className="bg-white border-2 border-gray-200 rounded-lg py-1 px-2"
      />
      <button
        className={`border-2 border-primary py-1 px-5 h-9 self-center rounded-3xl font-bold hover:text-white hover:bg-primary duration-150 transition-color 
        ${isLoading ? 'pointer-events-none opacity-20' : ''}`}
      >
        {isLoading ? <Spinner size={20} /> : <span>Enviar</span>}
      </button>
      {errorMessage ? (
        <p className="text-center text-red-600">{errorMessage}</p>
      ) : null}
    </form>
  )
}

export default LoginForm
