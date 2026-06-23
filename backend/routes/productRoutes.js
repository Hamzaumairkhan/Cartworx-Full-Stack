import express from "express";
const router = express.Router();
import protect from "../middleware/authMiddleare.js";
import admin from "../middleware/adminMiddleware.js";
import { getProducts , createProduct , getProductById , updateProduct , deleteProduct } from "../controllers/productController.js";
import multer from "multer";

const upload = multer({ dest: "uploads/" });

// all prpoducts
router.route("/").get(getProducts).post(protect, admin, upload.single("image"), createProduct);
// single product specific id
router.route("/:id").get(getProductById).put(protect, admin, upload.single("image"), updateProduct).delete(protect, admin, deleteProduct);

export default router;  
