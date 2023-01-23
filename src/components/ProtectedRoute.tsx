import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { Spinner } from '../assets/Spinner'
import { useSession } from '../context/SessionContext'
import ErrorPage from '../pages/error/error'

type Props = {
  element: React.ReactNode
  admin?: boolean
}

const ProtectedRoute = ({ element, admin = false }: Props) => {
  const { isToken, userData } = useSession()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isToken) return
    if (userData) setLoading(false)
  }, [userData])

  if (!isToken) {
    return <Navigate to="/login" replace />
  }
  if (loading) {
    return (
      <section className="mx-auto mt-48">
        <Spinner size={50} />
      </section>
    )
  }
  if (admin && !userData?.admin) return <ErrorPage />

  return <>{element}</>
}

export default ProtectedRoute
