import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import api from './api'
import ErrorPage from './pages/error-page'
import HomePage from './pages/home-page'

type Props = {}

const App = (props: Props) => {
  return (
    <Routes>
      <Route
        path="/"
        element={<HomePage />}
        loader={async () => await api.get.products()}
        errorElement={<ErrorPage />}
      />
    </Routes>
  )
}

export default App
