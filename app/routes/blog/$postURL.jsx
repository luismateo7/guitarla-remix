import { useLoaderData } from "@remix-run/react";
import { getPost } from "~/models/post.server"
import { formatearFecha } from "~/utils/helpers";

export async function loader({params}){
    const { postURL } = params
    const post = await getPost(postURL)

    if(post.data.length == 0){
        throw new Response('',{
            status: 404,
            statusText: 'Entrada del Blog no encontrada'
        })
    }

    return post;
}

export function meta(data){

    if(data.data == undefined){
        return{
            title: 'Entrada No Encontrada',
            descripcion: `Guitarras, venta de guitarras`
        }
    }

    const nombreDeEntrada = data.data.data[0].attributes.titulo

    return{
        title: `GuitarLA - ${nombreDeEntrada}`,
        descripcion: `Guitarras, venta de guitarras, ${nombreDeEntrada}`
    }
}


export default function Post(){

    const post = useLoaderData();
    
    const { titulo, contenido, imagen, publishedAt} = post?.data[0]?.attributes

    return(
        <main className="contenedor post mt-3">
            <img className="imagen" src={imagen?.data[0]?.attributes?.url} alt={`imagen del post ${titulo}`} />
            <div className="contenido">
                <h3>{titulo}</h3>
                <p className="fecha">{formatearFecha(publishedAt)}</p>
                <p className="texto">{contenido}</p>
            </div>
        </main>
    )
}
