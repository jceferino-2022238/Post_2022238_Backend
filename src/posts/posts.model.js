import mongoose from 'mongoose'
const PostSchema = mongoose.Schema({
    title:{
        type: String,
        required: [true, 'Title isnt optional']
    },
    classI:{
        type: String,
        required: [true, 'Email isnt optional']
    },
    text:{
        type: String,
        required: [true, 'Post text isnt optional']
    },
    imageURL:{
        type: String,
        required: [true, 'ImageURL text isnt optional']
    },
    comments:{
        type: [mongoose.Schema.Types.ObjectId], 
        required: true,
    },
    state: {
        type: Boolean,
        default: true
    }
})

PostSchema.methods.toJSON = function(){
    const {__v, _id, ...post} = this.toObject();
    post.pid = _id
    return post
}

export default mongoose.model('Post', PostSchema)