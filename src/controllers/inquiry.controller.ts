import Inquiry from "../models/inquiry.model";
import { sendInquiryEmail } from "../utils/emailService";

export class InquiryController {
  async createInquiry(inquiryData: any) {
    try {
      // Convert string numbers to actual numbers
      const formattedData = {
        ...inquiryData,
        maxPrice: Number(inquiryData.maxPrice),
        minSize: Number(inquiryData.minSize),
        beds: Number(inquiryData.beds),
        baths: Number(inquiryData.baths),
      };

      // Create inquiry
      const inquiry = new Inquiry(formattedData);
      await inquiry.save();

      // Send emails
      await sendInquiryEmail(inquiry);

      return inquiry;
    } catch (error) {
      console.error("Error creating inquiry:", error);
      throw error;
    }
  }

  async getAllInquiries() {
    return await Inquiry.find().sort({ createdAt: -1 });
  }

  async getInquiryById(id: string) {
    return await Inquiry.findById(id);
  }

  async updateInquiryStatus(id: string, status: string) {
    return await Inquiry.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );
  }
}
