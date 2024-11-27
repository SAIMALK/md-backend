import mongoose from "mongoose";
const reviewSchema = mongoose.Schema(
    {
      name: { type: String, required: true },
      comment: { type: String, required: true },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
      },
    },
    {
      timestamps: true,
    }
  );
const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    stories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Story' }], // Reference to stories authored by this author
    reviews:[reviewSchema],

},{timestamps:true});

const Author = mongoose.model('Author', authorSchema);

export default Author;
