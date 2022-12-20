"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = require("body-parser");
const cors_1 = __importDefault(require("cors"));
const dotenv = __importStar(require("dotenv"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const nftRoute_1 = __importDefault(require("./routes/nftRoute"));
const userRoute_1 = __importDefault(require("./routes/userRoute"));
const config = __importStar(require("./utils/config"));
const log_1 = __importDefault(require("./utils/log"));
dotenv.config();
mongoose_1.default.connect(config.dbUri, (err) => {
    if (err) {
        (0, log_1.default)("db connect", "failed");
        return process.exit(1);
    }
    (0, log_1.default)("db connect", "successfully");
});
const server = (0, express_1.default)();
server.use((0, body_parser_1.json)());
server.use((0, cors_1.default)());
server.use("/user", userRoute_1.default);
server.use("/nft", nftRoute_1.default);
server.listen(config.port, () => {
    (0, log_1.default)("server up", config.port);
});
