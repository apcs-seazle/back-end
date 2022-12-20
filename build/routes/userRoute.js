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
const userModel_1 = __importDefault(require("../models/userModel"));
const log_1 = __importDefault(require("../utils/log"));
const userRoute = (0, express_1.Router)();
userRoute.put("/create", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        (0, log_1.default)("create user", req.body);
        const usr = yield userModel_1.default.create(req.body);
        res.json(usr.toObject);
    }
    catch (err) {
        res.status(500).json(err);
    }
}));
exports.default = userRoute;
