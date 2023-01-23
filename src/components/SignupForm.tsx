import React, { useState } from 'react'
import api from '../api'
import { Spinner } from '../assets/Spinner'
import ImageUploader from './ImageUploader'

const SignupForm = () => {
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | undefined>(
    undefined
  )
  const [isImageUploading, setIsImageUploading] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  )

  const handleSignup = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const {
      emailInput,
      passwordInput,
      repeat_passwordInput,
      nameInput,
      lastnameInput
    } = event.currentTarget

    if (passwordInput.value !== repeat_passwordInput.value)
      return setErrorMessage('Las contraseñas no coinciden.')

    const body = {
      email: emailInput.value,
      password: passwordInput.value,
      name: nameInput.value,
      lastname: lastnameInput.value,
      image: uploadedImageUrl
    }

    setIsLoading(true)
    const res = await api.post.register(body)
    setIsLoading(false)
    if (res.error) return setErrorMessage(res.error)

    location.assign('/login')
  }

  return (
    <form onSubmit={handleSignup} className="flex flex-col gap-4">
      <input
        autoFocus
        type="text"
        name="emailInput"
        placeholder="Correo electrónico *"
        className="bg-white border-2 border-gray-200 rounded-lg py-1 px-2"
      />
      <input
        type="password"
        name="passwordInput"
        placeholder="Contraseña *"
        className="bg-white border-2 border-gray-200 rounded-lg py-1 px-2"
      />
      <input
        type="password"
        name="repeat_passwordInput"
        placeholder="Repetir contraseña *"
        className="bg-white border-2 border-gray-200 rounded-lg py-1 px-2"
      />
      <input
        type="text"
        name="nameInput"
        placeholder="Nombre *"
        className="bg-white border-2 border-gray-200 rounded-lg py-1 px-2"
      />
      <input
        type="text"
        name="lastnameInput"
        placeholder="Apellido *"
        className="bg-white border-2 border-gray-200 rounded-lg py-1 px-2"
      />
      <ImageUploader
        fileUrl={uploadedImageUrl}
        setFileUrl={setUploadedImageUrl}
        isUploading={isImageUploading}
        setIsUploading={setIsImageUploading}
      />
      <button
        className={`border-2 border-primary py-1 px-5 h-9 self-center rounded-3xl font-bold hover:text-white hover:bg-primary duration-150 transition-color${
          isImageUploading && isLoading ? 'pointer-events-none opacity-20' : ''
        }`}
      >
        {isLoading ? <Spinner size={20} /> : <span>Enviar</span>}
      </button>
      {errorMessage ? (
        <p className="text-center text-red-600">{errorMessage}</p>
      ) : null}
    </form>
  )
}

export default SignupForm
