import mongoose from "mongoose";
import { Schema } from "mongoose";

const CommentSchema = new mongoose.Schema({
    postId: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
    author: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});
const commentModel = mongoose.model('Comment', CommentSchema);


export default commentModel;
