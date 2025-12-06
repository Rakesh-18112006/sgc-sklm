import express from "express";
import {
  addMarquee,
  getAllMarquee,
  updateMarquee,
  deleteMarquee,
} from "../controllers/marqueeController";

const router = express.Router();

router.post("/add", addMarquee);
router.get("/all", getAllMarquee);
router.put("/update/:id", updateMarquee);
router.delete("/delete/:id", deleteMarquee);

export default router;
