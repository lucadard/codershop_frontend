export default function ErrorPage() {
  return (
    <div className="grid place-content-center text-center min-h-screen">
      <h1>Oops!</h1>
      <p>
        <i>
          Estamos teniendo problemas y no podemos conectarnos en este momento.
        </i>
      </p>
      <a href="/" className="text-bold text-blue-800 text-lg">
        Refresca la página
      </a>
    </div>
  )
}
