import dotenv from "dotenv";
import nodemailer from "nodemailer";
import { IInquiry } from "../models/inquiry.model";

// Load environment variables
dotenv.config();

// Verify required environment variables
if (!process.env.EMAIL_USER || !process.env.EMAIL_APP_PASSWORD) {
  throw new Error("Missing email configuration. Please check your .env file.");
}

// Create transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

// Verify transporter
transporter.verify(function (error, success) {
  if (error) {
    console.log("Email service error:", error);
  } else {
    console.log("Email server is ready to send messages");
  }
});

export const sendInquiryEmail = async (inquiry: IInquiry) => {
  // Email to admin
  const adminMailOptions = {
    from: `"Real Estate Inquiry" <${process.env.EMAIL_USER}>`,
    to: process.env.ADMIN_EMAIL,
    subject: `New ${inquiry.inquiryType} - ${inquiry.userType}`,
    html: `
      <h2>New Property Inquiry</h2>
      <h3>Inquiry Details</h3>
      <ul>
        <li><strong>Inquiry Type:</strong> ${inquiry.inquiryType}</li>
        <li><strong>User Type:</strong> ${inquiry.userType}</li>
      </ul>

      <h3>Contact Information</h3>
      <ul>
        <li><strong>Name:</strong> ${inquiry.firstName} ${inquiry.lastName}</li>
        <li><strong>Email:</strong> ${inquiry.email}</li>
        <li><strong>Location:</strong> ${inquiry.city}, ${inquiry.zipCode}</li>
      </ul>

      <h3>Property Requirements</h3>
      <ul>
        <li><strong>Property Type:</strong> ${inquiry.propertyType}</li>
        <li><strong>Max Price:</strong> $${inquiry.maxPrice.toLocaleString()}</li>
        <li><strong>Minimum Size:</strong> ${inquiry.minSize} sq ft</li>
        <li><strong>Bedrooms:</strong> ${inquiry.beds}</li>
        <li><strong>Bathrooms:</strong> ${inquiry.baths}</li>
      </ul>
    `,
  };

  // Confirmation email to inquirer
  const customerMailOptions = {
    from: `"Real Estate Team" <${process.env.EMAIL_USER}>`,
    to: inquiry.email,
    subject: `Thank you for your ${inquiry.inquiryType}`,
    html: `
      <h2>Thank you for your inquiry</h2>
      <p>Dear ${inquiry.firstName} ${inquiry.lastName},</p>
      <p>We have received your ${inquiry.inquiryType.toLowerCase()}. Our team will review your requirements and get back to you shortly.</p>

      <h3>Your Requirements</h3>
      <ul>
        <li><strong>Property Type:</strong> ${inquiry.propertyType}</li>
        <li><strong>Max Price:</strong> $${inquiry.maxPrice.toLocaleString()}</li>
        <li><strong>Minimum Size:</strong> ${inquiry.minSize} sq ft</li>
        <li><strong>Bedrooms:</strong> ${inquiry.beds}</li>
        <li><strong>Bathrooms:</strong> ${inquiry.baths}</li>
      </ul>

      <p>We will contact you at ${
        inquiry.email
      } with properties that match your criteria.</p>
      <p>Best regards,<br>Real Estate Team</p>
    `,
  };

  try {
    console.log("Attempting to send emails...");

    // Send email to admin
    const adminResult = await transporter.sendMail(adminMailOptions);
    console.log("Admin email sent:", adminResult.response);

    // Send confirmation email to customer
    const customerResult = await transporter.sendMail(customerMailOptions);
    console.log("Customer email sent:", customerResult.response);

    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email. Please try again later.");
  }
};
