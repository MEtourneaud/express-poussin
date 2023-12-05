const { User } = require("../db/sequelizeSetup")

const findAllUsers = (req, res) => {
  User.findAll()
    .then((results) => {
      res.json(results)
    })
    .catch((error) => {
      res.json(error.message)
    })
}

const findUserByPk = (req, res) => {
  User.findByPk(parseInt(req.params.id))
    .then((user) => {
      if (user) {
        res.json({ message: "Un utilisateur a été trouvé.", data: user })
      } else {
        res.status(404).json({ message: `Aucun utilisateur n'a été trouvé.` })
      }
    })
    .catch((error) => {
      res.status(500).json({ message: "Une erreur est survenue.", data: error.message })
    })
}

const createUser = (req, res) => {
  const newUser = { ...req.body }

  User.create(newUser)
    .then((user) => {
      res.json({ message: "L'utilisateur a bien été créé", data: user })
      console.log(user)
    })
    .catch((error) => {
      res.status(500).json({ message: `L'utilisateur n'a pas pu être créé`, data: error.message })
    })
}

const updateUser = (req, res) => {
  User.findByPk(req.params.id)
    .then((user) => {
      if (user) {
        user
          .update(req.body)
          .then(() => {
            res.json({ message: "L'utilisateur a bien été mis à jour.", data: user })
          })
          .catch((error) => {
            res.status(500).json({ message: "La mise à jour a échoué.", data: error.message })
          })
      } else {
        res.status(404).json({ message: `Aucun utilisateur n'a été mis à jour.` })
      }
    })
    .catch((error) => {
      res.status(500).json({ message: "Une erreur est survenue.", data: error.message })
    })
}

const deleteUser = (req, res) => {
  User.findByPk(req.params.id)
    .then((user) => {
      if (user) {
        user
          .destroy()
          .then((user) => {
            res.json({ mesage: `L'utilisateur a bien été supprimé.`, data: user })
          })
          .catch((error) => {
            res.json({ mesage: `La suppression a échoué.`, data: error.message })
          })
      } else {
        res.json({ mesage: `Aucun utilisateur trouvé.` })
      }
    })
    .catch((error) => {
      res.json({ mesage: `La requête n'a pas aboutie.` })
    })
}

module.exports = {
  findAllUsers,
  findUserByPk,
  createUser,
  updateUser,
  deleteUser,
}
