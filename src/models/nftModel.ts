import mongoose from "mongoose";

const nftSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contentUrl: { type: String, required: true },
  description: { type: String },
  idNFT: { type: String, required: true },
  price: { type: Number },
  ownerAddress: { type: String },
});

export default mongoose.model("NFT", nftSchema);