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
      where: {
        id: req.params.id,
      },
    })
      .then((coworking) => {
        // La valeur coworking retournée par la méthode update() est le nombre de lignes modifiées dans la table Coworkings
        if (coworking > 0) {
          Coworking.findByPk(req.params.id)
            .then((coworking) => {
              res.json({ message: "Le coworking a bien été mis à jour.", data: coworking })
            })
            .catch((error) => {
              res.json({ message: "Une erreur est survenue.", data: error.message })
            })
        } else {
          res.json({ message: `Aucun coworking n'a été mis à jour.` })
        }
      })
      .catch((error) => {
        res.json({ message: "La mise à jour a échoué.", data: error.message })
      })
  })

  .delete((req, res) => {
    Coworking.findByPk(req.params.id)
      .then((coworking) => {
        if (coworking) {
          Coworking.destroy({ where: { id: req.params.id } })
            .then(() => {
              res.json({ mesage: `Le coworking a bien été supprimé.`, data: coworking })
            })
            .catch((error) => {
              res.json({ mesage: `La suppression a échoué.`, data: error.message })
            })
        } else {
          res.json({ mesage: `Aucun coworking trouvé.` })
        }
      })
      .catch((error) => {
        res.json({ mesage: `La requête n'a pas aboutie.` })
      })
  })

module.exports = router
