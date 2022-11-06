import express from "express";
import controller from "../controllers/NFTController";

const router = express.Router();

router.post('/create', controller.createNFT);
router.get('/get/:nftId', controller.readNFT);
router.get('/get', controller.readAll);
router.patch('/update/:nftId', controller.updateNFT);
router.delete('/delete/:nftId',controller.deleteNFT);

export = router; 