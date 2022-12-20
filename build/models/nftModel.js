"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const nftSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    contentUrl: { type: String, required: true },
    description: { type: String },
    idNFT: { type: String, required: true },
    price: { type: Number },
    ownerAddress: { type: String },
});
exports.default = mongoose_1.default.model("NFT", nftSchema);
