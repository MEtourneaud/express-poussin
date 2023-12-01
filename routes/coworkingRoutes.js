const express = require("express")
const router = express.Router()
const { Coworking } = require("../db/sequelizeSetup")
let mockCoworkings = require("../mock-coworkings")

router
  .route("/")
  .get((req, res) => {
    Coworking.findAll()
      .then((coworkings) => {
        res.json({ message: "La table coworking a bien été lu", data: coworkings })
        // console.log(coworkings)
      })
      .catch((error) => {
        res.json({ message: `Le coworking n'a pas pu être lu`, data: error.message })
      })
  })

  .post((req, res) => {
    // const newId = mockCoworkings[mockCoworkings.length - 1].id + 1
    // let coworking = { id: newId, ...req.body }
    // mockCoworkings.push(coworking)
    const newCoworking = { ...req.body }
    // console.log(newCoworking)
    // Coworking.create({
    //     name: req.body.name,
    //     price: req.body.price,
    //     address: req.body.address,
    //     superficy: req.body.superficy,
    //     capacity: req.body.capacity,
    // })

    Coworking.create(newCoworking)
      .then((coworking) => {
        res.json({ message: "Le coworking a bien été créé", data: coworking })
        console.log(coworking)
      })
      .catch((error) => {
        res.json({ message: `Le coworking n'a pas pu être créé`, data: error.message })
      })

    // const result = { message: `Le coworking a bien été ajouté`, data: newCoworking }
  })

router
  .route("/:id")
  .get((req, res) => {
    // let result = mockCoworkings.find((el) => el.id === parseInt(req.params.id))

    // if (!result) {
    //   result = `Aucun élément ne correspond à l'id n°${req.params.id}`
    // }

    // res.json(result)

    Coworking.findByPk(req.params.id)
      .then((coworking) => {
        res.json({ message: "Le coworking a bien été trouvé", data: coworking })
        console.log(coworking)
      })
      .catch((error) => {
        res.json({ message: `Le coworking n'a pas pu être trouvé`, data: error.message })
      })
  })

  .put((req, res) => {
    let coworking = mockCoworkings.find((el) => el.id === parseInt(req.params.id))

    let result
    if (coworking) {
      const newCoworking = { ...coworking, ...req.body }
      const index = mockCoworkings.findIndex((el) => el.id === parseInt(req.params.id))
      mockCoworkings[index] = newCoworking
      result = { message: "Coworking modifié", data: newCoworking }
    } else {
      result = { message: `Le coworking n'existe pas`, data: {} }
    }

    res.json(result)
  })
  .delete((req, res) => {
    // const coworking = mockCoworkings.find((el) => el.id === parseInt(req.params.id))

    // let result
    // if (coworking) {
    //   mockCoworkings = mockCoworkings.filter((el) => el.id !== coworking.id)
    //   result = { message: "Coworking supprimé", data: coworking }
    // } else {
    //   result = { message: `Le coworking n'existe pas`, data: {} }
    // }

    // res.json(result)

    Coworking.destroy(req.params.id)
      .then((coworking) => {
        res.json({ message: "Le coworking a bien été supprimé", data: coworking })
        truncate: true
        console.log(coworking)
      })
      .catch((error) => {
        res.json({ message: `Le coworking n'existe pas`, data: error.message })
      })
  })

module.exports = router
