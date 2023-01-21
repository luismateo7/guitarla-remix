import { useLoaderData } from "@remix-run/react";
import { getGuitarra } from "~/models/guitarra.server";
import styles from '~/styles/guitarras.css'

export async function loader({request, params}){
    const { guitarraURL } = params
    const guitarra = await getGuitarra(guitarraURL)

    if(guitarra.data.length == 0){
        throw new Response('',{
            status: 404,
            statusText: 'Guitarra No Encontrada'
        })
    }

    return guitarra;
}

export function meta(data){

    if(data[0] == undefined){
        return{
            title: 'Guitarra No Encontrada',
            descripcion: `Guitarras, venta de guitarras`
        }
    }

    const nombreDeGuitarra = data.data.data[0].attributes.nombre

    return{
        title: `GuitarLA - ${nombreDeGuitarra}`,
        descripcion: `Guitarras, venta de guitarras, guitarra ${nombreDeGuitarra}`
    }
}

export function links(){
    return[{
        rel: 'stylesheet',
        href: styles
    }]
}

const GuitarraURL = () => {

    const guitarra = useLoaderData();
    const { nombre, descripcion, imagen, precio } = guitarra.data[0].attributes
    return (
        <main className="contenedor guitarra">
            <img className="imagen" src={imagen.data.attributes.url} alt={`imagen de la guitarra ${nombre}`} />
            <div className="contenido">
                <h3>{nombre}</h3>
                <p className="texto">{descripcion}</p>
                <p className="precio">{precio}</p>
            </div>
        </main>
    )
}

export default GuitarraURL