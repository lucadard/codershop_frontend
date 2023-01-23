export default function NotFoundPage() {
  return (
    <div className="grid place-content-center text-center min-h-screen">
      <h1>404</h1>
      <p>
        <i>La página que estas buscando no existe.</i>
      </p>
      <a href="/" className="text-bold text-blue-800 text-lg">
        Volver al home
      </a>
    </div>
  )
}
