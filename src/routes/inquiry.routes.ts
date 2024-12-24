import { Router } from "express";
import { InquiryController } from "../controllers/inquiry.controller";

const router = Router();
const inquiryController = new InquiryController();

// Create new inquiry
router.post("/", async (req, res) => {
  try {
    const inquiry = await inquiryController.createInquiry(req.body);
    res.status(201).json(inquiry);
  } catch (error) {
    console.error("Error creating inquiry:", error);
    res.status(500).json({
      message: "Error creating inquiry",
      error: error instanceof Error ? error.message : String(error),
    });
  }
});

// Get all inquiries
router.get("/", async (req, res) => {
  try {
    const inquiries = await inquiryController.getAllInquiries();
    res.json(inquiries);
  } catch (error) {
    console.error("Error fetching inquiries:", error);
    res.status(500).json({
      message: "Error fetching inquiries",
      error: error instanceof Error ? error.message : String(error),
    });
  }
});

// Get single inquiry
router.get("/:id", async (req, res) => {
  try {
    const inquiry = await inquiryController.getInquiryById(req.params.id);
    if (!inquiry) {
      return res.status(404).json({ message: "Inquiry not found" });
    }
    res.json(inquiry);
  } catch (error) {
    console.error("Error fetching inquiry:", error);
    res.status(500).json({
      message: "Error fetching inquiry",
      error: error instanceof Error ? error.message : String(error),
    });
  }
});

// Update inquiry status
router.patch("/:id/status", async (req, res) => {
  try {
    const { status } = req.body;
    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }

    const inquiry = await inquiryController.updateInquiryStatus(
      req.params.id,
      status
    );

    if (!inquiry) {
      return res.status(404).json({ message: "Inquiry not found" });
    }

    res.json(inquiry);
  } catch (error) {
    console.error("Error updating inquiry status:", error);
    res.status(500).json({
      message: "Error updating inquiry status",
      error: error instanceof Error ? error.message : String(error),
    });
  }
});

export { router as inquiryRoutes };
