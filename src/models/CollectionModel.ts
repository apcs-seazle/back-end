import mongoose, { Schema } from "mongoose";

const collectionSchema = new mongoose.Schema({
  owner: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String },
  nfts: { type: [Schema.Types.ObjectId], default: [] },
});

const CollectionModel = mongoose.model("Collection", collectionSchema);

export default CollectionModel;
