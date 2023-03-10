import React from 'react'
import { Link } from 'react-router-dom'
import LoginForm from '../components/LoginForm'

type Props = {}

const LoginPage = (props: Props) => {
  return (
    <div className="w-full max-w-[500px] p-8 mt-[10vh] mx-auto">
      <h2 className="text-center mb-4 text-3xl">Login</h2>
      <LoginForm />
      <p className="text-center mt-4 text-md">
        No tenes cuenta?{' '}
        <Link to="/signup" className="text-blue-800">
          Registrate!
        </Link>
      </p>
    </div>
  )
}

export default LoginPage
