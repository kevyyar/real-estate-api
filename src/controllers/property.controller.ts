import Property from "../models/property.model";

export class PropertyController {
  async getAllProperties() {
    return await Property.find().sort({ createdAt: -1 });
  }

  async getPropertyById(id: string) {
    return await Property.findById(id);
  }

  async createProperty(propertyData: any) {
    const property = new Property(propertyData);
    return await property.save();
  }

  async updateProperty(id: string, propertyData: any) {
    return await Property.findByIdAndUpdate(id, propertyData, {
      new: true,
      runValidators: true,
    });
  }

  async deleteProperty(id: string) {
    const result = await Property.findByIdAndDelete(id);
    return result !== null;
  }
}
