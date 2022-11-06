import mongoose, { Schema } from "mongoose";

const nftSchema = new mongoose.Schema({
  owner: { type: String, required: true },
  fileUrl: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String },
  collectionId: { type: Schema.Types.ObjectId },
});

const NFTModel = mongoose.model("NFT", nftSchema);

export default NFTModel;
