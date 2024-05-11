'use strict'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import { dbConnection } from './mongo.js'
import postRoutes from '../src/posts/posts.routes.js'
import commentRoutes from '../src/comments/comments.routes.js'
class Server{
    constructor(){
        this.app = express()
        this.port = process.env.PORT;
        this.postPath = '/blog_2022238/v1/posts'
        this.commentPath = '/blog_2022238/v1/comments'
        this.middlewares()
        this.connectDB()
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