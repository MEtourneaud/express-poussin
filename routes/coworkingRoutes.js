const express = require("express")
const router = express.Router()
const { Coworking } = require("../db/sequelizeSetup")

router
  .route("/")

  .get((req, res) => {
    Coworking.findAll()
      .then((coworkings) => {
        res.json({ message: "La table coworking a bien été lu", data: coworkings })
      })
      .catch((error) => {
        res.json({ message: `Le coworking n'a pas pu être lu`, data: error.message })
      })
  })

  .post((req, res) => {
    const newCoworking = { ...req.body }

    Coworking.create(newCoworking)
      .then((coworking) => {
        res.json({ message: "Le coworking a bien été créé", data: coworking })
        console.log(coworking)
      })
      .catch((error) => {
        res.json({ message: `Le coworking n'a pas pu être créé`, data: error.message })
      })
  })

router
  .route("/:id")

  .get((req, res) => {
    Coworking.findByPk(req.params.id)
      .then((coworking) => {
        if (coworking) {
          res.json({ message: "Le coworking a bien été trouvé", data: coworking })
        } else {
          res.json({ message: "Le coworking n'a pas pu être trouvé" })
        }
      })
      .catch((error) => {
        res.json({ message: `Une erreur est survenue`, data: error.message })
      })
  })

  .put((req, res) => {
    Coworking.update(req.body, {
      where: { id: req.params.id },
    })
      .then((coworking) => {
        if (coworking > 0) {
          res.json({ message: `Le coworking a bien été modifié`, data: coworking })
        } else {
          res.json({ message: "Le coworking n'existe pas" })
        }
      })
      .catch((error) => {
        res.json({ message: `Une erreur est survenue`, data: error.message })
      })
  })

  .delete((req, res) => {
    Coworking.destroy({
      where: { id: req.params.id },
    })
      .then((coworking) => {
        if (coworking) {
          res.json({ message: "Le coworking a bien été supprimé", data: coworking })
        } else {
          res.json({ message: "Le coworking n'existe pas" })
        }
      })
      .catch((error) => {
        res.json({ message: `Une erreur est survenue`, data: error.message })
      })
  })

module.exports = router
