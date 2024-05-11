import {response, request} from 'express'
import Post from './posts.model.js'
export const postGet = async (req = request, res = response) =>{
    const query = {state: true}
    const [total, posts] = await Promise.all([
        Post.countDocuments(query),
        Post.find(query)
    ])
    res.status(200).json({
        total,
        posts
    })
}
export const postPost = async (req, res) =>{
    const {title, classI, text, imageURL} = req.body
    try {
        const post = new Post({title, classI, text, imageURL})
        await post.save()
        res.status(200).json({
            msg: 'New Post',
        })
    } catch (e) {
        res.status(500).json({e: 'Post couldnt be added'})
    }
}