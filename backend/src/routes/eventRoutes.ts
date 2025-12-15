import { Request, Response } from "express";
import Event from "../models/Event";

// GET /api/events?clubId=coding-club&status=upcoming|completed
export const getAllEvents = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // Disable caching for this route
    res.set("Cache-Control", "no-store");

    const { status, clubId } = req.query as {
      status?: "upcoming" | "completed";
      clubId?: string;
    };

    const query: any = {};

    // Filter by status if provided
    if (status) query.status = status;

    // Filter by clubId (slug or name) if provided
    if (clubId) {
      query["club.name"] = new RegExp(`^${clubId.replace(/-/g, " ")}$`, "i");
    }

    // Fetch events sorted by date ascending
    const events = await Event.find(query).sort({ date: 1 });

    res.status(200).json({
      success: true,
      data: events,
      total: events.length,
    });
  } catch (error: any) {
    console.error("Error fetching events:", error);
    res
      .status(500)
      .json({ success: false, error: error.message || "Server error" });
  }
};

// GET /api/events/:id (single event, increase views)
export const getSingleEvent = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      res.status(404).json({ error: "Event not found" });
      return;
    }

    event.views += 1;
    await event.save();

    res.status(200).json(event);
  } catch {
    res.status(500).json({ error: "Error fetching event" });
  }
};

// POST /api/events (admin only) - create event
export const createEvent = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, description, date, time, club, status, registrationLink } = req.body;
    
    // Get image URL from Cloudinary
    const imageUrl = (req.file as any)?.path || "";
    
    // Validate required fields
    if (!title || !description || !date || !time || !club) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }

    // Validate registration link if provided
    if (registrationLink && !isValidUrl(registrationLink)) {
      res.status(400).json({ error: "Invalid registration link URL format" });
      return;
    }

    // Parse club data
    let clubData;
    try {
      clubData = typeof club === "string" ? JSON.parse(club) : club;
    } catch (error) {
      res.status(400).json({ error: "Invalid club data format" });
      return;
    }

    const newEvent = new Event({
      title,
      description,
      date,
      time,
      imageUrl,
      club: clubData,
      status: status || "upcoming",
      registrationLink: registrationLink || "", // Save registration link
      interestedCount: 0,
    });

    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  } catch (error: any) {
    console.error("Error creating event:", error);
    res.status(400).json({ error: error.message });
  }
};

// PATCH /api/events/:id/interested - increment interestedCount
export const incrementInterested = async (req: Request, res: Response): Promise<void> => {
  try {
    const eventId = req.params.id;
    const { studentId } = req.body;

    const event = await Event.findById(eventId);
    if (!event) {
      res.status(404).json({ error: "Event not found" });
      return;
    }

    // If you want to track unique students, you'd need a different approach
    // For now, just increment the count
    event.interestedCount += 1;
    await event.save();

    res.status(200).json({ 
      success: true,
      interestedCount: event.interestedCount 
    });
  } catch (error: any) {
    console.error("Error incrementing interest:", error);
    res.status(500).json({ error: error.message || "Server error" });
  }
};

// PUT /api/events/:id - update summary, status, and registration link (admin only)
export const updateEvent = async (req: Request, res: Response): Promise<void> => {
  try {
    const eventId = req.params.id;
    const { summary, status, registrationLink } = req.body;

    const event = await Event.findById(eventId);
    if (!event) {
      res.status(404).json({ error: "Event not found" });
      return;
    }

    // Update fields if provided
    if (summary !== undefined) event.summary = summary;
    
    if (status === "upcoming" || status === "completed") {
      event.status = status;
    }
    
    // Update registration link if provided
    if (registrationLink !== undefined) {
      if (registrationLink && !isValidUrl(registrationLink)) {
        res.status(400).json({ error: "Invalid registration link URL format" });
        return;
      }
      event.registrationLink = registrationLink;
    }

    // Auto-add summary if marking as completed without one
    if (status === "completed" && !event.summary) {
      event.summary = "This event has been completed. Summary will be added soon.";
    }

    const updatedEvent = await event.save();

    res.status(200).json(updatedEvent);
  } catch (error: any) {
    console.error("Error updating event:", error);
    res.status(500).json({ error: error.message || "Server error" });
  }
};

// Helper function to validate URL
function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
}