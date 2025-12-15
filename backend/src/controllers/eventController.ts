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
      // Assuming clubId is a URL-friendly slug stored in the DB in lowercase
      // Adjust based on your actual field; currently we query by nested club.name
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
    const imageUrl = (req.file as any)?.path;

    // Validate registration link URL format if provided
    if (registrationLink && !isValidUrl(registrationLink)) {
      res.status(400).json({ error: "Invalid registration link URL format" });
      return;
    }

    const newEvent = new Event({
      title,
      description,
      date,
      time,
      imageUrl,
      club: JSON.parse(club),  // frontend sends club as stringified JSON
      status: status || "upcoming",  // default to "upcoming" if not provided
      registrationLink: registrationLink || "",  // ADDED: Save registration link
      interestedCount: 0,  // initial interested count
      // summary is optional and not set on creation
    });

    const saved = await newEvent.save();
    res.status(201).json(saved);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// PATCH /api/events/:id/interested - increment interestedCount
export const incrementInterested = async (req: Request, res: Response): Promise<void> => {
  try {
    const eventId = req.params.id;

    // Find the event
    const event = await Event.findById(eventId);
    if (!event) {
      res.status(404).json({ error: "Event not found" });
      return;
    }

    // Increment interestedCount
    event.interestedCount += 1;
    await event.save();

    res.status(200).json({ interestedCount: event.interestedCount });
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Server error" });
  }
};

// PUT /api/events/:id - update summary, status, and registration link (admin only)
export const updateEvent = async (req: Request, res: Response): Promise<void> => {
  try {
    const eventId = req.params.id;
    const { summary, status, registrationLink } = req.body;

    // Find the event by ID
    const event = await Event.findById(eventId);
    if (!event) {
      res.status(404).json({ error: "Event not found" });
      return;
    }

    // Update fields if provided
    if (summary !== undefined) event.summary = summary;
    if (status === "upcoming" || status === "completed") event.status = status;
    
    // Update registration link if provided
    if (registrationLink !== undefined) {
      if (registrationLink && !isValidUrl(registrationLink)) {
        res.status(400).json({ error: "Invalid registration link URL format" });
        return;
      }
      event.registrationLink = registrationLink;
    }

    const updatedEvent = await event.save();

    res.status(200).json(updatedEvent);
  } catch (error: any) {
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