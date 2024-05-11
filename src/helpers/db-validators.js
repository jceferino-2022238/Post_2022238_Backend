import Post from '../posts/posts.model.js'
export const exPostById = async (id='') =>{
    const existsPostById = await Post.findById(id)
    if(!existsPostById){
        throw new Error(`Id ${title} doesnt exist`)
    }
}