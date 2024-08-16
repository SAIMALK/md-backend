import asyncHandler from "../middleware/asyncHandler.js";
import Author from "../MODELS/authorModel.js";
import Story from "../MODELS/storyModel.js";
import { generateObjectId } from "../utils/generateObjId.js";

const getStorys = asyncHandler(async (req, res) => {
  const pageSize = process.env.PAGINATION_LIMIT;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        title: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  const count = await Story.countDocuments({ ...keyword });
  const storys = await Story.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ storys, page, pages: Math.ceil(count / pageSize) });
});

// @desc    Fetch single story
// @route   GET /api/story/:id
// @access  Public

const getStoryById = asyncHandler(async (req, res) => {
  const story = await Story.findById(req.params.id);
  const storyAuthor = await Author.findById(story.author);

  story.author = storyAuthor;
  //   console.log(storyAuthor);
  if (story) {
    res.json(story);
  } else {
    res.status(404);
    return next(new Error("Resource not found"));
  }
});
const getStoriesByAuthorId = asyncHandler(async (req, res) => {
  // Extract the authorId from the request parameters
  const authorId = req.params.authorId;

  try {
    // Query the database to find stories authored by the specified author ID
    const stories = await Story.find({ author: authorId });

    // Send the response with the fetched stories
    res.json(stories);
  } catch (error) {
    // Handle any errors that occur during the database query
    res.status(500).json({ message: "Server Error" });
  }
});
// @desc    Create a story
// @route   POST /api/storys
// @access  Private/Admin
const createStory = asyncHandler(async (req, res) => {
  const story = new Story({
    title: "Sample Title",
    type: "Novel",
    genre: ["Fantasy"],
    user: req.user._id,
    cover: "/images/sample.jpg",
    status: "Sample Status",
    plot: "Sample Plot",
    chapters: 0,
    author: generateObjectId("1"),
    date: "Mar 22, 2024",
    numReviews: 0,
    rating: 5,
    rank: "1",
  });

  const createdStory = await story.save();
  res.status(201).json(createdStory);
});

// @desc    Update a story
// @route   PUT /api/storys/:id
// @access  Private/Admin
const updateStory = asyncHandler(async (req, res) => {
  const {
    title,
    genre,
    type,
    status,
    cover,
    plot,
    rank,
    rating,
    chapters,
    date,
    author,
  } = req.body;

  const story = await Story.findById(req.params.id);

  if (story) {
    story.title = title;
    story.genre = genre;
    story.type = type;
    story.status = status;
    story.cover = cover;
    story.plot = plot;
    story.rank = rank;
    story.rating = rating;
    story.date = date;
    story.chapters = chapters;
    story.author = author;
    const updatedStory = await story.save();
    res.json(updatedStory);
  } else {
    res.status(404);
    throw new Error("Story not found");
  }
});

// @desc    Delete a story
// @route   DELETE /api/storys/:id
// @access  Private/Admin
const deleteStory = asyncHandler(async (req, res) => {
  const story = await Story.findById(req.params.id);

  if (story) {
    await Story.deleteOne({ _id: story._id });
    res.json({ message: "Story removed" });
  } else {
    res.status(404);
    throw new Error("Story not found");
  }
});

// @desc    Create new review
// @route   POST /api/storys/:id/reviews
// @access  Private
const createStoryReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const story = await Story.findById(req.params.id);

  if (story) {
    const alreadyReviewed = story.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Story already reviewed");
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    story.reviews.push(review);

    story.numReviews = story.reviews.length;

    story.rating =
      story.reviews.reduce((acc, item) => item.rating + acc, 0) /
      story.reviews.length;

    await story.save();
    res.status(201).json({ message: "Review added" });
  } else {
    res.status(404);
    throw new Error("Story not found");
  }
});

// @desc    Get top rated storys
// @route   GET /api/storys/top
// @access  Public
const getTopStorys = asyncHandler(async (req, res) => {
  const storys = await Story.find({}).sort({ rating: -1 }).limit(3);

  res.json(storys);
});

export {
  getStorys,
  getStoryById,
  getStoriesByAuthorId,
  createStory,
  updateStory,
  deleteStory,
  createStoryReview,
  getTopStorys,
};
