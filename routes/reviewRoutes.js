const express = require("express")
const router = express.Router()
const {
  findAllReviews,
  createReview,
  findReviewByPk,
  updateReview,
  deleteReview,
} = require("../controllers/reviewControllers")
const { protect } = require("../controllers/authControllers")

router.route("/").get(findAllReviews).post(protect, createReview)

router.route("/:id").get(findReviewByPk).put(updateReview).delete(protect, deleteReview)

module.exports = router
