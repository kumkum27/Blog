import mongoose from "mongoose";
import { Schema } from "mongoose";

const PostSchema=new mongoose.Schema({
    title:String,
    summary:String,
    content:String,
    cover:String,
    tags: [String],
    author:{type:Schema.Types.ObjectId, ref:'user'},
    likes: { type: Number, default: 0 },
    likedBy: [{ type: Schema.Types.ObjectId, ref: 'user' }]
},{
    timestamps:true
})

const PostModel=mongoose.model('post',PostSchema)

export default PostModel;