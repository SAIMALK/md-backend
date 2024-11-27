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
const createStoryReview = asyncHandler(async (req, res) => {
    const { comment } = req.body;
  
    const author = await Author.findById(req.params.id);
  
    if (author) {
      const review = {
        name: req.user.name,
        comment,
        user: req.user._id,
      };
  
      author.reviews.push(review);  
      await author.save();
      res.status(201).json({ message: "Review added" });
    } else {
      res.status(404);
      throw new Error("Author not found");
    }
  });
export {getAuthor,getAuthorById,createStoryReview};
