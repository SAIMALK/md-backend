import asyncHandler from '../middleware/asyncHandler.js';
import Author from '../MODELS/authorModel.js';


const getAuthor =  asyncHandler(async(req,res)=>{
    const authors=await Author.find({});
    res.json(authors);
})

const getAuthorById = asyncHandler(async(req,res)=>{
    const author = await  Author.findById(req.params.id);
     
    if (author) {
        res.json(author);
    } else {
        res.status(404);
        return next(new Error("Resource not found"));
    }
})
export {getAuthor,getAuthorById};