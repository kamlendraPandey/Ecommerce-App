import express from "express";
import { isAdmin, requireSignIn } from "./../middlewares/authMiddleware.js";
import {
  CreateCategoryController,
  categoryController,
  deleteCategoryController,
  singleCategoryController,
  updateCategoryController,
} from "../controllers/CategoryController.js";

const router = express.Router();

//routes

// Create Category
router.post(
  "/create-category",
  requireSignIn,
  isAdmin,
  CreateCategoryController
);

// Update Category
router.put(
  "/update-category/:id",
  requireSignIn,
  isAdmin,
  updateCategoryController
);

// GetAll Category
router.get("/get-category", categoryController);

// single Category
router.get("/single-category/:slug", singleCategoryController);

// delete Category
router.delete(
  "/delete-category/:id",
  requireSignIn,
  isAdmin,
  deleteCategoryController
);
export default router;
