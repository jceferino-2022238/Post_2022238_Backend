'use strict'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import { dbConnection } from './mongo.js'
import postRoutes from '../src/posts/posts.routes.js'
import commentRoutes from '../src/comments/comments.routes.js'
import Post from '../src/posts/posts.model.js'
class Server{
    constructor(){
        this.app = express()
        this.port = process.env.PORT;
        this.postPath = '/blog_2022238/v1/posts'
        this.commentPath = '/blog_2022238/v1/comments'
        this.middlewares()
        this.connectDB()
        this.initStaticPosts()
        this.routes()
    }

    async connectDB(){
        await dbConnection()
    }
    middlewares(){
        this.app.use(express.urlencoded({extended: false}))
        this.app.use(cors())
        this.app.use(express.json())
        this.app.use(helmet())
        this.app.use(morgan('dev'))
    }
    async initStaticPosts(){
        try {
            const existingPosts = await Post.find()
            if(existingPosts.length === 0){
                const staticPosts = [
                    {
                        title:"Taller Proyecto Final Bim 1",
                        classI:"Taller III",
                        text:"Realización de una aplicación backend en NodeJs, sistema de compras con integración de carrito y facturas",
                        imageURL:'https://c.files.bbci.co.uk/E8F5/production/_115873695_gettyimages-957125704.jpg'
                    },
                    {
                        title:"Laboratorio 2",
                        classI:"Práctica Supervisada",
                        text:"Realización de una aplicación backend en NodeJs, sistema para la gestión de profesores y estudiantes, con la posibilidad de que estos puedan asignarse y gestionar cursos",
                        imageURL:'https://humanidades.com/wp-content/uploads/2016/07/educacion-e1559883079906.jpg'
                    },
                    {
                        title:"Laboratorio 1",
                        classI:"Taller III",
                        text:"Realización de un proyecto con HTML, diseño de diversas páginas con componentes css y js. Cuenta con una sección sobre mis pasatiempos, biografía y recreación de la página principal de Kinal",
                        imageURL:'https://www.hostinger.es/tutoriales/wp-content/uploads/sites/7/2018/11/what-is-html.jpg'
                    },
                    {
                        title:"Infografía: Beneficios de React",
                        classI:"Tecnología III",
                        text:"Realización de una infografía útil para conocer los beneficios de la utilización de React y sus aplicaciones",
                        imageURL:'https://blog.wildix.com/wp-content/uploads/2020/06/react-logo.jpg'
                    },
                ]
                await Post.insertMany(staticPosts)
                console.log("Static posts inserted successfully")
            }
        } catch (e) {
            console.error('Error initializing static posts:', e)
        }
    }
    routes(){
        this.app.use(this.postPath, postRoutes)
        this.app.use(this.commentPath, commentRoutes)
    }   
    listen(){
        this.app.listen(this.port, ()=>{
            console.log('Server running on port', this.port)
        })
    }
}

export default Server;