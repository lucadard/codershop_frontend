import React from 'react'
import { Link } from 'react-router-dom'
import SignupForm from '../components/SignupForm'

type Props = {}

const SignupPage = (props: Props) => {
  return (
    <div className="w-full max-w-[500px] p-8 mt-[10vh] mx-auto">
      <h2 className="text-center mb-4 text-3xl">Signup</h2>
      <SignupForm />
      <p className="text-center mt-4 text-md">
        Ya tenés una cuenta?{' '}
        <Link to="/login" className="text-blue-800">
          Inicia sesión!
        </Link>
      </p>
    </div>
  )
}

export default SignupPage
