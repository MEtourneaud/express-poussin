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
    Coworking.findByPk(req.params.id)
      .then((coworking) => {
        Coworking.update(req.body, {
          where: { id: req.params.id },
        })
          .then(() => {
            if (coworking > 0) {
              res.json({ message: `Le coworking a bien été modifié`, data: coworking })
            } else {
              res.json({ message: "Le coworking n'existe pas" })
            }
          })
          .catch((error) => {
            res.json({ message: `La mise à jour a échoué`, data: error.message })
          })
      })
      .catch(() => {
        res.json({ message: `Une erreur est survenue`, data: error.message })
      })
  })

  .delete((req, res) => {
    // A. On vérifie que l'id passé en req.params.id renvoie bien une ligne de notre table.
    Coworking.findByPk(req.params.id)
      .then((coworking) => {
        // B. Si un coworking correspond à l'id alors on exécute la méthode destroy()
        if (coworking) {
          Coworking.destroy({ where: { id: req.params.id } })
            // C. Si le coworking est bien supprimé, on affiche un message avec comme data le coworking récupéré dans le .findByPk()
            .then(() => {
              res.json({ mesage: `Le coworking a bien été supprimé.`, data: coworking })
            })
            // D. Si la suppression a échoué, on retourne une réponse à POSTMAN
            .catch((error) => {
              res.json({ mesage: `La suppression a échoué.`, data: error.message })
            })
        } else {
          // B Si aucun coworking ne correspond à l'id alors on retourne une réponse à POSTMAN
          res.json({ mesage: `Aucun coworking trouvé.` })
        }
      })
      .catch((error) => {
        // E. Si une erreur est survenue dès le findByPk, on retourne une réponse à POSTMAN
        res.json({ mesage: `La requête n'a pas aboutie.` })
      })
  })

module.exports = router
