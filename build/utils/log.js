"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log = (tit, ...msgs) => {
    console.log(`[seazle] ${tit}:`, ...msgs);
};
exports.default = log;
