import { NextFunction, Request, Response } from "express";

import NFTModel from "../models/NFTModel";

const createNFT = (req: Request, res: Response, next: NextFunction) => {
  const { name, image, description, network, id, price, ownAddress } = req.body;

  const nft = new NFTModel({
    name,
    image,
    description,
    network,
    id,
    price,
    ownAddress,
  });

  return nft
    .save()
    .then((nft) => res.status(201).json({ nft }))
    .catch((error) => res.status(500).json({ error }));
};

const readNFT = (req: Request, res: Response, next: NextFunction) => {
  const nftId = req.params.nftId;

  return NFTModel.findOne({ id: nftId })
    .then((nft) =>
      nft
        ? res.status(200).json({ nft })
        : res.status(404).json({ message: "not found" })
    )
    .catch((error) => res.status(500).json({ error }));
};

const readAll = (req: Request, res: Response, next: NextFunction) => {
  return NFTModel.find({})
    .then((nft) => {
      if (nft) {
        res.status(200).json({ nft });
      } else {
        res.status(404).json({});
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

const updateNFT = (req: Request, res: Response, next: NextFunction) => {
  const nftId = req.params.nftId;

  return NFTModel.findOne({ id: nftId })
    .then((nft) => {
      if (nft) {
        nft.set(req.body);

        return nft
          .save()
          .then((nft) => res.status(201).json({ nft }))
          .catch((error) => res.status(500).json({ error }));
      } else {
        return res.status(404).json({ message: "not found" });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

const deleteNFT = (req: Request, res: Response, next: NextFunction) => {
  const authorId = req.params.authorId;

  return NFTModel.findByIdAndDelete(authorId)
    .then((nft) =>
      nft
        ? res.status(201).json({ nft, message: "Deleted" })
        : res.status(404).json({ message: "not found" })
    )
    .catch((error) => res.status(500).json({ error }));
};

export default { createNFT, readNFT, readAll, updateNFT, deleteNFT };
