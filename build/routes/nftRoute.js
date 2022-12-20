"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const nftModel_1 = __importDefault(require("../models/nftModel"));
const log_1 = __importDefault(require("../utils/log"));
const nftRoute = (0, express_1.Router)();
nftRoute.put("/create", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        (0, log_1.default)("create nft", req.body);
        const nft = yield nftModel_1.default.create(req.body);
        res.json(nft);
    }
    catch (err) {
        res.status(500).json(err);
    }
}));
nftRoute.put("/create-many", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        (0, log_1.default)("create many nfts", req.body);
        const nfts = yield nftModel_1.default.insertMany(req.body);
        res.json(nfts);
    }
    catch (err) {
        res.status(500).json(err);
    }
}));
nftRoute.get("/get/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        (0, log_1.default)("get nft", req.params.id);
        const nft = yield nftModel_1.default.findById(req.params.id);
        res.json(nft);
    }
    catch (err) {
        res.status(500).json(err);
    }
}));
nftRoute.get("/get-many", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        (0, log_1.default)("get many nfts", req.body);
        const nfts = yield nftModel_1.default.find({
            _id: { $in: req.body },
        });
        res.json(nfts);
    }
    catch (err) {
        res.status(500).json(err);
    }
}));
nftRoute.get("/get-all", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        (0, log_1.default)("get all nfts");
        const nfts = yield nftModel_1.default.find({});
        res.json(nfts);
    }
    catch (err) {
        res.status(500).json(err);
    }
}));
nftRoute.post("/update/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        (0, log_1.default)("update nft", req.params.id, req.body);
        const nft = yield nftModel_1.default.findByIdAndUpdate(req.params.id, req.body, {
            returnDocument: "after",
        });
        res.json(nft);
    }
    catch (err) {
        res.status(500).json(err);
    }
}));
nftRoute.delete("/delete/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        (0, log_1.default)("delete nft", req.params.id);
        const nft = yield nftModel_1.default.findByIdAndDelete(req.params.id);
        res.json(nft);
    }
    catch (err) {
        res.status(500).json(err);
    }
}));
exports.default = nftRoute;
