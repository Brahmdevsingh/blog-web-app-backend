import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
    name: {
        type: String,
        rewuired: true
    },
    postId: {
        type: String,
        rewuired: true
    },
    date: {
        type: Date,
        rewuired: true
    },
    comments: {
        type: String,
        rewuired: true
    }
})

const comment = mongoose.model('comment', commentSchema);
export default comment;