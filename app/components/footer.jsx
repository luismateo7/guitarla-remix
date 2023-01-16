import Navegacion from "./navegacion"

function Footer() {
  return (
    <footer className="footer">
        <div className="contenido contenedor">
            <Navegacion />
            <p className="copyright">&copy; Todos los derechos reservados {new Date().getFullYear()}</p>
        </div>
    </footer>
  )
}

export default Footer