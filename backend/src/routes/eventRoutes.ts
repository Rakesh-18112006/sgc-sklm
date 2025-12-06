import express from "express";
import multer from "multer";
import { storage } from "../config/cloudinary";
import {
  getAllEvents,
  getSingleEvent,
  createEvent,
  incrementInterested,
  updateEvent,
} from "../controllers/eventController";

const upload = multer({ storage });
const router = express.Router();

// Public routes (students)
router.get("/", getAllEvents);
router.get("/:id", getSingleEvent);
router.patch("/:id/interested", incrementInterested);

// Admin routes
router.post("/", upload.single("image"), createEvent);
router.put("/:id", updateEvent);

export default router;
