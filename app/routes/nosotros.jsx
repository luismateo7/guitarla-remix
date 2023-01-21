import imagen from '../../public/img/nosotros.jpg'
import styles from '~/styles/nosotros.css'

export function meta() {
    return (
        {
            title: 'GuitarLA - Nosotros',
            description: 'Venta de guitarras, blog de música'
        }
    )
}

export function links(){
  return[
    {
      rel: 'stylesheet',
      href: styles
    },
    {
      rel: 'preload',
      href: imagen,
      as: 'image'
    }
  ]
}

const Nosotros = () => {
  return (
    <main className="contenedor nosotros">
      <h2 className="heading">Nosotros</h2>
      <div className="contenido">
        <img src={imagen} alt="imagen sobre nosotros" />
        <div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam, dolor exercitationem consectetur cumque debitis non molestias possimus nulla, praesentium corrupti officiis, nesciunt dolorem. Vero praesentium qui vel esse animi dignissimos.
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Asperiores nulla optio molestias officia sed iusto, temporibus quisquam blanditiis.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam, dolor exercitationem consectetur cumque debitis non molestias possimus nulla, praesentium corrupti officiis, nesciunt dolorem. Vero praesentium qui vel esse animi dignissimos.
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Asperiores nulla optio molestias officia sed iusto, temporibus quisquam blanditiis.
          </p>
        </div>
      </div>
    </main>
  )
}

export default Nosotros