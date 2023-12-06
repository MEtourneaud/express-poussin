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

router.route("/").get(findAllUsers).post(createUser)

router.route("/:id").get(findUserByPk).put(updateUser).delete(deleteUser)

router.route("/login").post(login)

module.exports = router
