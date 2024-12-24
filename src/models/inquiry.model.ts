import mongoose, { Document, Schema } from "mongoose";

export interface IInquiry extends Document {
  inquiryType:
    | "General Inquiry"
    | "Property Viewing"
    | "Price Quote"
    | "Investment Opportunity";
  userType: "Buyer" | "Seller" | "Agent" | "Investor";
  firstName: string;
  lastName: string;
  email: string;
  city: string;
  zipCode: string;
  propertyType: "APARTMENT" | "HOUSE" | "VILLA" | "CONDO";
  maxPrice: number;
  minSize: number;
  beds: number;
  baths: number;
  status: "NEW" | "CONTACTED" | "CLOSED";
  createdAt: Date;
  updatedAt: Date;
}

const InquirySchema: Schema = new Schema(
  {
    inquiryType: {
      type: String,
      enum: [
        "General Inquiry",
        "Property Viewing",
        "Price Quote",
        "Investment Opportunity",
      ],
      required: true,
    },
    userType: {
      type: String,
      enum: ["Buyer", "Seller", "Agent", "Investor"],
      required: true,
    },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    city: { type: String, required: true },
    zipCode: { type: String, required: true },
    propertyType: {
      type: String,
      enum: ["APARTMENT", "HOUSE", "VILLA", "CONDO"],
      required: true,
    },
    maxPrice: { type: Number, required: true },
    minSize: { type: Number, required: true },
    beds: { type: Number, required: true },
    baths: { type: Number, required: true },
    status: {
      type: String,
      enum: ["NEW", "CONTACTED", "CLOSED"],
      default: "NEW",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IInquiry>("Inquiry", InquirySchema);
