import mongoose from "mongoose";

const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    stories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Story' }], // Reference to stories authored by this author
},{timestamps:true});

const Author = mongoose.model('Author', authorSchema);

export default Author;
