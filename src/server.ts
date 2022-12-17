import { json } from "body-parser";
import cors from "cors";
import * as dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";

import nftRoute from "./routes/nftRoute";
import userRoute from "./routes/userRoute";
import * as config from "./utils/config";
import log from "./utils/log";

dotenv.config();

mongoose.connect(config.dbUri, (err) => {
  if (err) {
    log("db connect", "failed");
    return process.exit(1);
  }

  log("db connect", "successfully");
});

const server = express();
server.use(json());
server.use(cors());

server.use("/user", userRoute);
server.use("/nft", nftRoute);

server.listen(config.port, () => {
  log("server up", config.port);
});
