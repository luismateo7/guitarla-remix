import { useLoaderData } from "@remix-run/react"
import { getPosts } from "~/models/post.server"
import ListadoPosts from "~/components/listado-posts"

export function meta(){
    return{
        title: 'GuitarLA - Nuestro Blog',
        description: 'GuitarLA, Blog de música y venta de guitarras'
    }
}

export async function loader(){
    const post = await getPosts()
    return post.data
}

const Blog = () => {

    const posts = useLoaderData()

    return (
        <ListadoPosts
            posts={posts}
        />
    )
}

export default Blog