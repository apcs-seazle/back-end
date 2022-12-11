import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String },
  bio: { type: String },
  email: { type: String },
  profilePicUrl: { type: String },
});

export default mongoose.model("User", userSchema);
