import Post from '../posts/posts.model.js'
import Comment from '../comments/comments.models.js'
export const exPostById = async (id='') =>{
    const existsPostById = await Post.findById(id)
    if(!existsPostById){
        throw new Error(`Id ${title} doesnt exist`)
    }
}
export const exComment = async (title='') =>{
    const existsComment = await Comment.findOne({title})
    if(existsComment){
        throw new Error(`The comment ${title} is already done`)
    }
}