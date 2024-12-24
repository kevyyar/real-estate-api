import mongoose, { Document, Schema } from "mongoose";

export interface IProperty extends Document {
  title: string;
  type: "HOUSE" | "APARTMENT" | "CONDO" | "VILLA";
  status: "FOR_SALE" | "FOR_RENT";
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  isFeatured: boolean;
  imageUrl: string;
  features: string[];
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

const PropertySchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    type: {
      type: String,
      enum: ["HOUSE", "APARTMENT", "CONDO", "VILLA"],
      required: true,
      uppercase: true,
    },
    status: {
      type: String,
      enum: ["FOR_SALE", "FOR_RENT"],
      required: true,
      uppercase: true,
    },
    price: { type: Number, required: true },
    location: { type: String, required: true },
    bedrooms: { type: Number, required: true },
    bathrooms: { type: Number, required: true },
    area: { type: Number, required: true },
    isFeatured: { type: Boolean, default: false },
    imageUrl: { type: String, required: true },
    features: [{ type: String }],
    description: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IProperty>("Property", PropertySchema);
