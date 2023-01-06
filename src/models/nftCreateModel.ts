import mongoose from "mongoose";

const nftCreateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contentUrl: { type: String, required: true },
  description: { type: String },
  idNFT: { type: String, required: true },
  ownerAddress: { type: String },
});

nftCreateSchema.index({name: 'text'})

export default mongoose.model("NFTCreate", nftCreateSchema);
