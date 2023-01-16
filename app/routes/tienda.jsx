import { useLoaderData } from "@remix-run/react"
import { getGuitarras } from '~/models/guitarra.server'
import Guitarra from "~/components/guitarra"
import styles from '~/styles/guitarras.css'

export function meta(){
  return{
    title: 'GuitarLA - Tienda de Guitarras',
    description: 'GuitarLA - Nuestra colección de guitarras'
  }
}

export function links(){
  return[
    {
      rel: 'stylesheet',
      href: styles
    }
  ]
}

export async  function loader(){
  const guitarras = await getGuitarras()
  return guitarras.data
}

const Tienda = () => {

  const guitarras = useLoaderData();
  console.log(guitarras);

  return (
    <main className="contenedor">
      <h2 className="heading">Nuestra Colección</h2>
      {guitarras?.length && (
        <div className="guitarras-grid">
          {guitarras.map( guitarra => (
            <Guitarra 
              key={guitarra?.id}
              guitarra={guitarra?.attributes}
            />
          ))}
        </div>
      )}
    </main>
  )
}

export default Tienda