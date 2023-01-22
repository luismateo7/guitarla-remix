import { useState, useEffect } from 'react'

import{
    Meta,
    Links,
    Outlet,
    Scripts,
    LiveReload,
    useCatch,
    Link
  } from '@remix-run/react'
  
  import styles from '~/styles/index.css'
  import Header from '~/components/header'
  import Footer from './components/footer'
  
  export function meta(){
    return(
        {
            charset: "UTF-8",
            title: "GuitarLA - Remix",
            content:"width=device-width, initial-scale=1.0"
        }
    )
  }
  
  export function links(){
    return[
        {
            rel: 'stylesheet',
            href: 'https://necolas.github.io/normalize.css/8.0.1/normalize.css'
        },
        {
            rel: 'preconnect',
            href: 'https://fonts.googleapis.com'
        },
        {
            rel: 'preconnect',
            href: 'https://fonts.gstatic.com',
            crossOrigin: 'true'
        },
        {
            rel: 'stylesheet',
            href: 'https://fonts.googleapis.com/css2?family=Outfit:wght@400;700;900&display=swap'
        },
        {
            rel: 'stylesheet',
            href: styles
        }
    ]
  }
  
  export default function App(){

    const carritoLS = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('carrito')) ?? [] : null
    const [ carrito, setCarrito ] = useState(carritoLS)

    useEffect(()=>{
      localStorage.setItem('carrito', JSON.stringify(carrito))
    }, [carrito])

    const agregarCarrito = (guitarra)=>{

      if(carrito.some( guitarraState => guitarraState.id === guitarra.id )){ //Bool: Existe duplicado

        const carritoActualizado = carrito.map( guitarraState =>{  //Iterar e identificar el elemento duplicado
          if(guitarraState.id === guitarra.id) guitarraState.cantidad = guitarra.cantidad //Remplazar solo la cantidad
          return guitarraState
        })

        setCarrito(carritoActualizado)
      }

      else setCarrito([...carrito, guitarra]) //Registro nuevo - agregar al carrito
    }

    const actualizarCantidad = guitarra =>{
      const carritoActualizado = carrito.map( guitarraState =>{
        if(guitarraState.id === guitarra.id) guitarraState.cantidad = guitarra.cantidad
        return guitarraState
      })
      setCarrito(carritoActualizado)
    }

    const eliminarGuitarra = id =>{
      const carritoActualizado = carrito.filter( guitarraState => {
        if(guitarraState.id !== id)
        return guitarraState
      })
      setCarrito(carritoActualizado)
    }

    return(
      <Document>
        <Outlet
          context={{
            agregarCarrito,
            carrito,
            actualizarCantidad,
            eliminarGuitarra
          }}
        />
      </Document>
    )
  }
  
  function Document({children}){
    return(
        <html lang="en">
          <head>
            <Meta />
            <Links />
          </head>
          <body>
            <Header/>
            {children}
            <Footer />
  
            <Scripts />
            <LiveReload />
          </body>
        </html>
    )
  }

  /** Manejo de Errores **/
  export function CatchBoundary(){
    const error = useCatch()

    return(
      <Document>
        <p className='error'>{error.status} {error.statusText}</p>
        <Link to='/' className='error-enlace'>Volver a Inicio</Link>
      </Document>
    )
  }

  export function ErrorBoundary({error}){
    return(
      <Document>
        <p className='error'>{error.status} {error.statusText}</p>
        <Link to='/' className='error-enlace'>Volver a Inicio</Link>
      </Document>
    )
  }