import crypto from "crypto";
import mongoose from "mongoose";

// Function to generate consistent ObjectID from a given string
const generateObjectId = (inputString) => {
  const hash = crypto.createHash("md5").update(inputString).digest("hex");
  return new mongoose.Types.ObjectId(hash.substring(0, 24));
};

export { generateObjectId };
