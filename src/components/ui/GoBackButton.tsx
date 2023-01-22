import React from 'react'
import { useNavigate } from 'react-router-dom'

type Props = {}

const GoBackButton = (props: Props) => {
  const navigate = useNavigate()
  return (
    <button
      onClick={() => navigate(-1)}
      className="flex gap-2 mb-8 w-max text-gray-400 hover:text-primary transition-colors curation-200 cursor-pointer"
    >
      <span className="material-symbols-outlined">west</span>Volver
    </button>
  )
}

export default GoBackButton
