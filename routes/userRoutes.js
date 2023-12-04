const express = require("express")
const router = express.Router()

router
  .route("/")
  .get((req, res) => {
    res.json("Endpoint GET fonctionnel!")
  })
  .post((req, res) => {
    res.json("Endpoint POST fonctionnel!")
  })

router
  .route("/:id")
  .get((req, res) => {
    res.json("Endpoint GET BY ID fonctionnel!")
  })
  .put((req, res) => {
    res.json("Endpoint PUT fonctionnel!")
  })
  .delete((req, res) => {
    res.json("Endpoint DELETE fonctionnel!")
  })

module.exports = router
