import dotenv from "dotenv";
import mongoose from "mongoose";
import Property from "../models/property.model";

// Load environment variables
dotenv.config();

const sampleProperties = [
  {
    title: "Modern Apartment in Downtown",
    type: "APARTMENT",
    status: "FOR_SALE",
    price: 450000,
    location: "Downtown, New York",
    bedrooms: 2,
    bathrooms: 2,
    area: 1200,
    isFeatured: true,
    imageUrl:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3",
    features: ["Air Conditioning", "Elevator", "Parking", "Gym"],
    description: "Luxurious modern apartment in prime downtown location",
  },
  {
    title: "Luxury Villa with Pool",
    type: "VILLA",
    status: "FOR_SALE",
    price: 1250000,
    location: "Beverly Hills, Los Angeles",
    bedrooms: 4,
    bathrooms: 3,
    area: 3500,
    isFeatured: true,
    imageUrl:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3",
    features: ["Swimming Pool", "Garden", "Security System", "Smart Home"],
    description: "Stunning villa with private pool and modern amenities",
  },
  {
    title: "Cozy Studio for Rent",
    type: "APARTMENT",
    status: "FOR_RENT",
    price: 2500,
    location: "Manhattan, New York",
    bedrooms: 1,
    bathrooms: 1,
    area: 800,
    isFeatured: false,
    imageUrl:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3",
    features: ["Furnished", "Utilities Included", "Pet Friendly"],
    description: "Charming studio apartment in the heart of Manhattan",
  },
  {
    title: "Seaside Condo",
    type: "CONDO",
    status: "FOR_SALE",
    price: 750000,
    location: "Miami Beach, Florida",
    bedrooms: 3,
    bathrooms: 2,
    area: 1800,
    isFeatured: true,
    imageUrl:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3",
    features: ["Ocean View", "Balcony", "Beach Access", "Pool"],
    description: "Beautiful beachfront condo with ocean views",
  },
];

async function seedProperties() {
  try {
    // Connect to MongoDB
    await mongoose.connect(
      process.env.MONGODB_URI || "mongodb://localhost:27017/real-estate"
    );
    console.log("Connected to MongoDB");

    // Delete existing properties
    await Property.deleteMany({});
    console.log("Cleared existing properties");

    // Insert sample properties
    const createdProperties = await Property.insertMany(sampleProperties);
    console.log(`Created ${createdProperties.length} properties`);

    console.log("Sample properties inserted successfully");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding properties:", error);
    process.exit(1);
  }
}

// Run the seeder
seedProperties();
