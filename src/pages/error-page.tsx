import { useRouteError } from 'react-router-dom'

export default function ErrorPage() {
  return (
    <div className="grid place-content-center text-center min-h-screen">
      <h1>Oops!</h1>
      <p>
        <i>La Pagina que estas buscando no existe.</i>
      </p>
      <a href="/" className="text-bold text-blue-800 text-lg">
        Volver al home
      </a>
    </div>
  )
}
