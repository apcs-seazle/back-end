import { json } from "body-parser";
import * as dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";

import collectionRoute from "./routes/collection";
import nftRoute from "./routes/nft";

dotenv.config();

const server = express();

server.use(json());

server.use("/nft", nftRoute);
server.use("/clt", collectionRoute);

server.listen(process.env["PORT"], () => {
  console.log("server up:", process.env["PORT"]);

  mongoose.connect(process.env["DB_URI"]!, (err) => {
    if (err) {
      console.log("connect to db failed" + err["message"]);
      return process.exit(1);
    }

    console.log("connect to db successfully");
  });
});
