import React, { useEffect, useRef, useState } from 'react'
import api from '../api'
import { Spinner } from '../assets/Spinner'
import { useSession } from '../context/SessionContext'
import { Product } from '../types'
import ImageUploader from './ImageUploader'

type Props = {
  action?: { type: 'add' } | { type: 'edit'; payload: Product }
}

const ProductForm = ({ action = { type: 'add' } }: Props) => {
  const formRef = useRef<any>(undefined)
  const { userData } = useSession()
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | undefined>(
    undefined
  )
  const [isImageUploading, setIsImageUploading] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  )
  useEffect(() => {
    if (action.type === 'edit') {
      formRef.current.nameInput.value = action.payload.name
      formRef.current.descriptionInput.value = action.payload.description
      formRef.current.priceInput.value = action.payload.price
      setUploadedImageUrl(action.payload.image)
    }
  }, [])

  const handleAddProduct = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const { nameInput, descriptionInput, priceInput } = event.currentTarget
    const body = {
      name: nameInput.value,
      description: descriptionInput.value,
      price: priceInput.value,
      image: uploadedImageUrl
    }

    setIsLoading(true)
    const res =
      action.type === 'add'
        ? await api.admin.addProduct(userData?.token!, body)
        : await api.admin.editProduct(userData?.token!, action.payload.id, body)
    setIsLoading(false)
    if (res.error) return setErrorMessage(res.error)

    setErrorMessage(
      `Producto ${action.type === 'add' ? 'agregado' : 'editado'} con exito`
    )
  }

  return (
    <form
      onSubmit={handleAddProduct}
      className="flex flex-col gap-4"
      ref={formRef}
    >
      <h2 className="text-center mb-4 text-3xl">
        {action.type === 'add' ? 'Agregá un' : 'Editá el '} producto
      </h2>
      <input
        autoFocus
        type="text"
        name="nameInput"
        placeholder="Título *"
        className="bg-white border-2 border-gray-200 rounded-lg py-1 px-2"
      />
      <textarea
        name="descriptionInput"
        placeholder="Descripción"
        className="bg-white border-2 border-gray-200 rounded-lg py-1 px-2 h-32 resize-none"
      />
      <input
        type="number"
        min="1"
        name="priceInput"
        placeholder="Precio *"
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

export default ProductForm
