import { Router } from "express";
import { PropertyController } from "../controllers/property.controller";
import { upload } from "../utils/cloudinary";

const router = Router();
const propertyController = new PropertyController();

// Image upload endpoint
router.post("/upload", upload.array("images", 10), (req, res) => {
  try {
    const files = req.files as Express.Multer.File[];
    const imageUrls = files.map((file: any) => file.path);
    res.json({ imageUrls });
  } catch (error) {
    res.status(500).json({ message: "Error uploading images", error });
  }
});

router.get("/", (req, res) => {
  propertyController
    .getAllProperties()
    .then((properties) => res.json(properties))
    .catch((error) =>
      res.status(500).json({ message: "Error fetching properties", error })
    );
});

router.get("/:id", (req, res) => {
  propertyController
    .getPropertyById(req.params.id)
    .then((property) => {
      if (!property) {
        return res.status(404).json({ message: "Property not found" });
      }
      res.json(property);
    })
    .catch((error) =>
      res.status(500).json({ message: "Error fetching property", error })
    );
});

router.post("/", (req, res) => {
  propertyController
    .createProperty(req.body)
    .then((newProperty) => res.status(201).json(newProperty))
    .catch((error) =>
      res.status(500).json({ message: "Error creating property", error })
    );
});

router.put("/:id", (req, res) => {
  propertyController
    .updateProperty(req.params.id, req.body)
    .then((updatedProperty) => {
      if (!updatedProperty) {
        return res.status(404).json({ message: "Property not found" });
      }
      res.json(updatedProperty);
    })
    .catch((error) =>
      res.status(500).json({ message: "Error updating property", error })
    );
});

router.delete("/:id", (req, res) => {
  propertyController
    .deleteProperty(req.params.id)
    .then((deleted) => {
      if (!deleted) {
        return res.status(404).json({ message: "Property not found" });
      }
      res.status(204).send();
    })
    .catch((error) =>
      res.status(500).json({ message: "Error deleting property", error })
    );
});

export { router as propertyRoutes };
