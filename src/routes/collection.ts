import { Router } from "express";
import Joi from "joi";
import lodash from "lodash";

import { failedResponse, successResponse } from "../helpers/response";
import validateRequest from "../middlewares/validateRequest";
import CollectionModel from "../models/CollectionModel";
import NFTModel from "../models/NFTModel";

const collectionRoute = Router();

collectionRoute.put(
  "/",
  validateRequest({
    owner: Joi.string().required(),
    name: Joi.string().required(),
    description: Joi.string(),
  }),
  async (req, res) => {
    try {
      const clt = await CollectionModel.create(req.body);

      return res.json(successResponse({ clt }));
    } catch (err: any) {
      return res.status(500).json(failedResponse(err["message"]));
    }
  }
);

collectionRoute.get("/:id", async (req, res) => {
  try {
    const clt = await CollectionModel.findById(req.params.id);

    return res.json(successResponse({ clt }));
  } catch (err: any) {
    return res.status(500).json(failedResponse(err["message"]));
  }
});

collectionRoute.post(
  "/:id",
  validateRequest({
    owner: Joi.string(),
    name: Joi.string(),
    description: Joi.string(),
  }),
  async (req, res) => {
    try {
      const clt = await CollectionModel.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );

      return res.json(successResponse({ clt }));
    } catch (err: any) {
      return res.status(500).json(failedResponse(err["message"]));
    }
  }
);

collectionRoute.delete("/:id", async (req, res) => {
  try {
    const clt = await CollectionModel.findByIdAndDelete(req.params.id);

    const nfts = lodash.get(clt, "nfts", []) as string[];
    nfts.forEach(async (nftId) => {
      await NFTModel.findByIdAndDelete(nftId);
    });

    return res.json(successResponse({ clt }));
  } catch (err: any) {
    return res.status(500).json(failedResponse(err["message"]));
  }
});

export default collectionRoute;
