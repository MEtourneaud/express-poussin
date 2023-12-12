const { Review, User } = require("../db/sequelizeSetup")
const { UniqueConstraintError, ValidationError } = require("sequelize")

const findAllReviews = (req, res) => {
  Review.findAll()
    .then((results) => {
      res.json(results)
    })
    .catch((error) => {
      res.status(500).json(error.message)
    })
}

const findReviewByPk = (req, res) => {
  Review.findByPk(parseInt(req.params.id))
    .then((result) => {
      if (result) {
        res.json({ message: "Une review a été trouvé.", data: result })
      } else {
        res.status(404).json({ message: `Aucune review n'a été trouvé.` })
      }
    })
    .catch((error) => {
      res.status(500).json({ message: "Une erreur est survenue.", data: error.message })
    })
}

const createReview = (req, res) => {
  console.log("Username:", req.username)
  User.findOne({ where: { username: req.username } })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: `La review n'a pas été trouvé.` })
      }
      const newReview = { ...req.body, UserId: user.id }

      Review.create(newReview)
        .then((review) => {
          res.status(201).json({ message: "La review a bien été créé", data: review })
        })
        .catch((error) => {
          if (error instanceof UniqueConstraintError || error instanceof ValidationError) {
            return res.status(400).json({ message: error.message })
          }
          res.status(500).json({ message: `La review n'a pas pu être créé`, data: error.message })
        })
    })
    .catch((error) => {
      if (error instanceof ValidationError) {
        return res.status(400).json({ message: error.message })
      }
      res.status(500).json(error.message)
    })
}

const updateReview = (req, res) => {
  Review.findByPk(req.params.id)
    .then((result) => {
      if (result) {
        return result.update(req.body).then(() => {
          res.status(201).json({ message: `La review a bien été mis à jour.`, data: result })
        })
      } else {
        res.status(404).json({ message: `Aucune review à mettre à jour n'a été trouvé.` })
      }
    })
    .catch((error) => {
      if (error instanceof UniqueConstraintError || error instanceof ValidationError) {
        return res.status(400).json({ message: error.message })
      }
      res.status(500).json({ message: "Une erreur est survenue.", data: error.message })
    })
}

const deleteReview = (req, res) => {
  Review.findByPk(req.params.id)
    .then((result) => {
      if (result) {
        return result.destroy().then((result) => {
          res.json({ mesage: `La review a bien été supprimé.`, data: result })
        })
      } else {
        res.status(404).json({ mesage: `Aucune review trouvé.` })
      }
    })
    .catch((error) => {
      res.status(500).json({ mesage: `La requête n'a pas aboutie.`, data: error.message })
    })
}

module.exports = { findAllReviews, findReviewByPk, createReview, updateReview, deleteReview }
