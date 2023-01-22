import { Link } from "@remix-run/react"
import { formatearFecha } from "~/utils/helpers";

const Post = ({post})=> {
    const { imagen, contenido, titulo, url, publishedAt} = post

    return (
        <article className="post">
            <img src={imagen.data[0].attributes.formats.small.url} alt={`Imagen de ${titulo}`} className="imagen" />
            <div className="contenido">
                <h3>{titulo}</h3>
                <p className="fecha">{formatearFecha(publishedAt)}</p>
                <p className="resumen">{contenido}</p>
                <Link className="enlace" to={`/blog/${url}`}>Leer Post</Link>
            </div>
        </article>
    )
}

export default Post
