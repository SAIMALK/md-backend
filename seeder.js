import dotenv  from 'dotenv';
import users from "./data/UserData.js";
import StoryData from "./data/StoryData.js";
import AuthorData from "./data/AuthorData.js";
import connectDB  from "./config/db.js";
import User from "./MODELS/userModel.js";
import Story from "./MODELS/storyModel.js";
import Author from "./MODELS/authorModel.js";
dotenv.config();
connectDB();

const importData = async () => {
  try {
    await User.deleteMany();
    await Story.deleteMany();
    await Author.deleteMany();

    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;
    const sampleProducts = StoryData.map((s) => {
      return { ...s, user: adminUser };
    });
    await Author.insertMany(AuthorData);
    console.log("inserted Authors");
    await Story.insertMany(sampleProducts);
    console.log("inserted");
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
