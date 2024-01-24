const express = require("express");
const {
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory,
} = require("../Controllers/categoryController");
const router = express.Router();

router
  .post("/api/create_category", createCategory)
  .get("/api/get_category", getCategory)
  .put("/api/update_category", updateCategory)
  .delete("/api/delete_category/:id", deleteCategory);

module.exports = router;
