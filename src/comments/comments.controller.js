import {response, request} from 'express'
import Comment from './comments.models.js'
import Post from '../posts/posts.model.js'
export const commentGet = async (req=request, res=response) =>{
    const query = {state:true}
    const [total, comments] = await Promise.all([
        Comment.countDocuments(query),
        Comment.find(query)
    ])
    res.status(200).json({
        total,
        comments
    })
}
export const getCommentsFromPost = async (req, res)=>{
    try {
        const {id} = req.params
        const post = await Post.findById(id)
        if(!post){
            return res.status(404).json({error: 'Post not found'})
        }
        const comments = await Comment.find({post: post._id})
        res.status(200).json({
            comments
        })
    } catch (e) {
        console.error('Error retrieving comments', e)
        res.status(500).json({e: 'Internal Server Error'})
    }
}
export const commentPost = async (req, res) =>{
    const {id} = req.params
    const {title, content} = req.body;
    try {
        const post = await Post.findById(id)
        const comment = new Comment({title, content, post: id})
        await comment.save()
        post.comments.push(comment._id)
        await post.save();
        res.status(200).json({
            msg: "New Comment",
            post: post.title
        })
    } catch (e) {
        res.status(500).json({e: 'Comment couldnt be added'})
    }
}