import React, { useEffect } from 'react'
import { ScrollRestoration } from 'react-router-dom'
import Footer from './components/layout/Footer'
import Navbar from './components/layout/Navbar'

type Props = {
  children: React.ReactNode
}

const PageLayout = ({ children }: Props) => {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <ScrollRestoration />
        <Navbar />
        {children}
      </div>
      <Footer />
    </>
  )
}

export default PageLayout
