import { Router } from "express";

import nftModel from "../models/nftModel";
import log from "../utils/log";

const nftRoute = Router();

nftRoute.put("/create", async (req, res) => {
  try {
    log("create nft", req.body);

    const nft = await nftModel.create(req.body);
    res.json(nft.toObject);
  } catch (err) {
    res.status(500).json(err);
  }
});

nftRoute.put("/create-many", async (req, res) => {
  try {
    log("create many nfts", req.body);

    const nfts = await nftModel.insertMany(req.body);
    res.json(nfts);
  } catch (err) {
    res.status(500).json(err);
  }
});

nftRoute.post("/update/:id", async (req, res) => {
  try {
    log("update nft", req.params.id, req.body);

    const nft = await nftModel.findByIdAndUpdate(req.params.id, req.body, {
      returnDocument: "after",
    });
    res.json(nft?.toObject);
  } catch (err) {
    res.status(500).json(err);
  }
});

nftRoute.delete("/delete/:id", async (req, res) => {
  try {
    log("delete nft", req.params.id);

    const nft = await nftModel.findByIdAndDelete(req.params.id);
    res.json(nft?.toObject);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default nftRoute;
