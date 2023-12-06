const CoworkingModel = require("../models/coworkingModel")
const UserModel = require("../models/userModel")
const { Sequelize, DataTypes } = require("sequelize")
const mockCoworkings = require("../mock-coworkings")
const mockUsers = require("../mock-users")
const bcrypt = require("bcrypt")

const sequelize = new Sequelize("bordeaux_coworkings", "root", "", {
  host: "localhost",
  dialect: "mariadb",
  logging: false,
})

const Coworking = CoworkingModel(sequelize, DataTypes)
const User = UserModel(sequelize, DataTypes)

sequelize
  .sync({ force: true })
  .then(() => {
    mockCoworkings.forEach((coworking) => {
      const newCoworking = { ...coworking }
      Coworking.create(newCoworking)
        .then(() => {})
        .catch((error) => {
          console.log(error.message)
        })
    })
    mockUsers.forEach((user) => {
      bcrypt.hash(user.password, 10).then((hash) => {
        User.create({ ...user, password: hash })
          .then(() => {})
          .catch((error) => {
            console.log(error.message)
          })
      })
    })
  })
  .catch((error) => {
    console.log(error.message)
  })

sequelize
  .authenticate()
  .then(() => console.log("La connexion à la base de données a bien été établie."))
  .catch((error) => console.error(`Impossible de se connecter à la base de données ${error}`))

module.exports = { sequelize, Coworking, User }
