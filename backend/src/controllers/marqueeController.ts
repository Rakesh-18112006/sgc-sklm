import { Request, Response } from "express";
import Marquee from "../models/Marquee";

// Add a marquee message
export const addMarquee = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { message } = req.body;

    if (!message) {
      res.status(400).json({ error: "Message is required" });
      return;
    }

    const newMessage = await Marquee.create({ message });

    res.status(201).json({
      success: true,
      message: "Marquee message added",
      data: newMessage,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Get ALL marquee messages
export const getAllMarquee = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const messages = await Marquee.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      marquee: messages,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Update marquee
export const updateMarquee = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { message } = req.body;

    const updated = await Marquee.findByIdAndUpdate(
      id,
      { message },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Marquee updated",
      data: updated,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Delete marquee
export const deleteMarquee = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    await Marquee.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Marquee deleted",
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
