import { useState } from 'react'
import { useLoaderData, useOutletContext } from "@remix-run/react";
import { getGuitarra } from "~/models/guitarra.server";

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
    if(data.data == undefined){
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

const GuitarraURL = () => {

    const { agregarCarrito } = useOutletContext()

    const [ cantidad, setCantidad ] = useState(0)
    const guitarra = useLoaderData();
    const { nombre, descripcion, imagen, precio } = guitarra.data[0].attributes


    const handleSubmit = e =>{
        e.preventDefault();

        if(cantidad < 1){
            alert('Debes seleccionar una cantidad')
            return
        }

        const guitarraSeleccionada = {
            id: guitarra.data[0].id,
            imagen: imagen.data.attributes.url,
            nombre,
            precio,
            cantidad
        }

        agregarCarrito(guitarraSeleccionada)
    }

    return (
        <div className="guitarra">
            <img className="imagen" src={imagen.data.attributes.url} alt={`imagen de la guitarra ${nombre}`} />
            <div className="contenido">
                <h3>{nombre}</h3>
                <p className="texto">{descripcion}</p>
                <p className="precio">{precio}</p>

                <form className="formulario" onSubmit={handleSubmit}>
                    <label htmlFor="cantidad">Cantidad</label>
                    
                    <select
                        id="cantidad"
                        onChange={e => setCantidad(parseInt(e.target.value))}
                    >
                        <option value="0">-- Seleccione --</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>

                    <input type="submit" value="Agregar al Carrito"/>
                </form>
            </div>
        </div>
    )
}

export default GuitarraURL