const express = require("express")
const router = express.Router()
const {
  findAllCoworkings,
  findCoworkingByPk,
  createCoworking,
  updateCoworking,
  deleteCoworking,
} = require("../controllers/coworkingControllers")
const { protect } = require("../controllers/authControllers")

router.route("/").get(findAllCoworkings).post(protect, createCoworking)

router
  .route("/:id")
  .get(findCoworkingByPk)
  .put(protect, updateCoworking)
  .delete(protect, deleteCoworking)

module.exports = router
