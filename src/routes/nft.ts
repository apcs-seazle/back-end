import { Router } from "express";
import Joi from "joi";

import { failedResponse, successResponse } from "../helpers/response";
import validateRequest from "../middlewares/validateRequest";
import CollectionModel from "../models/CollectionModel";
import NFTModel from "../models/NFTModel";

const nftRoute = Router();

nftRoute.put(
  "/",
  validateRequest({
    owner: Joi.string().required(),
    fileUrl: Joi.string().required(),
    name: Joi.string().required(),
    description: Joi.string(),
    collection: Joi.string(),
  }),
  async (req, res) => {
    try {
      const nft = await NFTModel.create(req.body);

      const clt = req.body["collection"];
      if (clt) {
        await CollectionModel.findByIdAndUpdate(clt, {
          $push: { nfts: nft["_id"] },
        });
      }

      return res.json(successResponse({ nft }));
    } catch (err: any) {
      return res.status(500).json(failedResponse(err["message"]));
    }
  }
);

nftRoute.get("/:id", async (req, res) => {
  try {
    const nft = await NFTModel.findById(req.params.id);

    return res.json(successResponse({ nft }));
  } catch (err: any) {
    return res.status(500).json(failedResponse(err["message"]));
  }
});

nftRoute.post(
  "/:id",
  validateRequest({
    owner: Joi.string(),
    fileUrl: Joi.string(),
    name: Joi.string(),
    description: Joi.string(),
    collection: Joi.string(),
  }),
  async (req, res) => {
    try {
      const clt = req.body["collection"];
      if (clt) {
        const nft = await NFTModel.findById(req.params.id);

        await CollectionModel.findByIdAndUpdate(nft?.collection, {
          $pull: { nfts: nft?.id },
        });

        await CollectionModel.findByIdAndUpdate(clt, {
          $push: { nfts: nft?.id },
        });
      }

      const nft = await NFTModel.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );

      return res.json(successResponse({ nft }));
    } catch (err: any) {
      return res.status(500).json(failedResponse(err["message"]));
    }
  }
);

nftRoute.delete("/:id", async (req, res) => {
  try {
    const nft = await NFTModel.findByIdAndDelete(req.params.id);

    return res.json(successResponse({ nft }));
  } catch (err: any) {
    return res.status(500).json(failedResponse(err["message"]));
  }
});

export default nftRoute;
