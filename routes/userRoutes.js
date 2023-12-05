const express = require("express")
const router = express.Router()

const {
  findAllUsers,
  findUserByPk,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController")

router.route("/").get(findAllUsers).post(createUser)

router.route("/:id").get(findUserByPk).put(updateUser).delete(deleteUser)

module.exports = router
