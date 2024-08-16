import mongoose from "mongoose";
const reviewSchema= new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User',
    },
    title:{
        type:String,
        required:true,
    },rating:{
        type:String,
        required:true,
        default:0,
    },
    comment:{
        type:String,
        required:true,
    },
},{timestamps:true})

const storySchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User',
    },
    title:{
        type:String,
        required:true,
    },
    genre:{
        type:Array,
        required:true,
    },
    bgCover:{
        type:String,
    },
    plot:{
        type:String,
        required:true,
    },
    date:{
        type:String,
        required:true,
    },
    cover:{
        type:String,
        required:true,
    },
    author: { 
            type: mongoose.Schema.Types.ObjectId,
            required:true,
            ref: 'Author',
    },
    type: {
        type: String,
    },
    status:{
        type:String,
    },
    serialization:{
        type:String,

    },
    chapters:{
        type:Number,
        required:true,
    },
    rank:{
        type:Number,
        required:true,
    },
    reviews:[reviewSchema],
    rating:{
        type:Number,
        required:true,
        default:0,
    },
    numReviews:{
        type:Number,
        required:true,
        default:0,

    },
   
}, {timestamps:true});
const Story =  mongoose.model('Story',storySchema);
export default Story;