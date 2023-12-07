const express = require("express")
const router = express.Router()

const {
  findAllUsers,
  findUserByPk,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/userControllers")
const { login } = require("../controllers/authControllers")
const { protect } = require("../controllers/authControllers")

router.route("/").get(findAllUsers).post(createUser)

router.route("/:id").get(findUserByPk).put(protect, updateUser).delete(protect, deleteUser)

router.route("/login").post(login)

module.exports = router
