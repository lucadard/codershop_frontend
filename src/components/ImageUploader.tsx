import React, { useState } from 'react'
import api, { baseUrl } from '../api'
import { Spinner } from '../assets/Spinner'

type Props = {
  fileUrl: string | undefined
  setFileUrl: (url: string | undefined) => void
  isUploading: boolean
  setIsUploading: (bool: boolean) => void
}

const ImageUploader = ({
  fileUrl,
  setFileUrl,
  isUploading,
  setIsUploading
}: Props) => {
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  )
  const handleFileInput = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    try {
      const [file] = event.target.files!
      setIsUploading(true)
      const res = await api.post.image({ image: file })
      setFileUrl(res.imageUrl)
    } catch (err: any) {
      setErrorMessage(err.message)
    }
    setIsUploading(false)
  }

  const handleResetImageUrl = () => {
    setErrorMessage(undefined)
    setFileUrl(undefined)
  }
  if (errorMessage)
    return (
      <div className="flex gap-2 items-center h-16">
        <span>{errorMessage}</span>
        <div
          onClick={handleResetImageUrl}
          className="ml-auto h-9 cursor-pointer rounded-3xl border-2 border-primary px-5 py-1 hover:text-secondary hover:bg-primary transition-colors duration-200"
        >
          Subí otro
        </div>
      </div>
    )
  if (fileUrl)
    return (
      <div className="flex gap-2 items-center h-16">
        <div className="aspect-square h-full rounded-full overflow-hidden">
          <img
            src={fileUrl.includes('http') ? fileUrl : baseUrl + fileUrl}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <span>Imagen subida con exito!</span>
        <div
          onClick={handleResetImageUrl}
          className="ml-auto h-9 cursor-pointer rounded-3xl border-2 border-primary px-5 py-1 hover:text-secondary hover:bg-primary transition-colors duration-200"
        >
          Cambiar
        </div>
      </div>
    )
  if (isUploading)
    return (
      <div className="flex justify-center h-16 items-center">
        <Spinner size={30} />
      </div>
    )

  return (
    <div className="flex gap-2 items-center h-16">
      <label>
        <input
          type="file"
          name="image"
          onChange={handleFileInput}
          className="hidden"
        />
        <span className="h-9 cursor-pointer material-symbols-outlined rounded-3xl border-2 border-primary px-5 py-1 hover:text-secondary hover:bg-primary transition-colors duration-200">
          upload_file
        </span>
      </label>
      <label className="">Subir imagen</label>
    </div>
  )
}

export default ImageUploader
