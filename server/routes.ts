import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { franchiseSchema, contactSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // Franchise request handler
  app.post("/api/franchise", async (req, res) => {
    try {
      const validatedData = franchiseSchema.parse(req.body);
      const franchiseRequest = await storage.saveFranchiseRequest(validatedData);
      return res.status(200).json({ success: true, message: "Franchise request submitted", data: franchiseRequest });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ success: false, message: validationError.message });
      }
      return res.status(500).json({ success: false, message: "Internal server error" });
    }
  });

  // Contact form handler
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = contactSchema.parse(req.body);
      const contactMessage = await storage.saveContactMessage(validatedData);
      return res.status(200).json({ success: true, message: "Message sent successfully", data: contactMessage });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ success: false, message: validationError.message });
      }
      return res.status(500).json({ success: false, message: "Internal server error" });
    }
  });

  // Admin routes to get all franchise requests
  app.get("/api/admin/franchise-requests", async (req, res) => {
    try {
      const franchiseRequests = await storage.getAllFranchiseRequests();
      return res.status(200).json(franchiseRequests);
    } catch (error) {
      console.error("Error fetching franchise requests:", error);
      return res.status(500).json({ success: false, message: "Internal server error" });
    }
  });

  // Admin routes to get all contact messages
  app.get("/api/admin/contact-messages", async (req, res) => {
    try {
      const contactMessages = await storage.getAllContactMessages();
      return res.status(200).json(contactMessages);
    } catch (error) {
      console.error("Error fetching contact messages:", error);
      return res.status(500).json({ success: false, message: "Internal server error" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
