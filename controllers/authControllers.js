const { User } = require("../db/sequelizeSetup")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const login = (req, res) => {
  User.findOne({ where: { username: req.body.username } })
    .then((result) => {
      if (!result) {
        return res.status(404).json({ message: `Le nom d'utilisateur n'existe pas` })
      }
      bcrypt.compare(req.body.password, result.password).then((isValid) => {
        if (!isValid) {
          return res.status(401).json({ message: `Le mot de passe n'est pas valide` })
        }
        const token = jwt.sign(
          {
            data: "foobar",
          },
          "secret_key",
          { expiresIn: "1h" }
        )
        res.json({ message: `Login résussi`, data: token })
      })
    })
    .catch((error) => {
      if (error instanceof UniqueConstraintError || error instanceof ValidationError) {
        return res.status(400).json({ message: error.message })
      }
      res.status(500).json({ message: "Une erreur est survenue.", data: error.message })
    })
}

module.exports = { login }
