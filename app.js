const express = require("express")
const morgan = require("morgan")
const app = express()
const port = 3000

let mockCoworkings = require("./mock-coworkings")

// middleware qui permet d'interpréter' le corps de ma requête (req.body)  en format json
app.use(express.json())
app.use(morgan("dev"))

app.get("/", (req, res) => {
  res.json("Hello World !")
})

app.get("/api/coworkings", (req, res) => {
  // Afficher la phrase : Il y a ... coworkings dans la liste.
  res.json(mockCoworkings)
})

app.get("/api/coworkings/:id", (req, res) => {
  let result = mockCoworkings.find((el) => el.id === parseInt(req.params.id))

  if (!result) {
    result = `Aucun élément ne correspond à l'id n°${req.params.id}`
  }
  res.json(result)
})

// implémenter le endpoint post qui renvoie une réponse "post fonctionne"
app.post("/api/coworkings", (req, res) => {
  console.log(req.body)
  // Ajouter le coworking dans le tableau, en automatisant le génération d'un id
  // On récupère le dernier élément du tableau et on ajoute +1 à son id
  // let coworking = req.body
  const newId = mockCoworkings[mockCoworkings.length - 1].id + 1

  //... SPREAD OPERATOR
  let coworking = { id: newId, ...req.body }
  mockCoworkings.push(coworking)

  // On renvoie un objet qui contient les propriétés message et data
  let result = { msg: "Le coworking a bien été ajouté", data: coworking }
  res.json(result)
})

app.put("/api/coworkings/:id", (req, res) => {
  let coworking = mockCoworkings.find((el) => el.id === parseInt(req.params.id))
  let result
  if (coworking) {
    coworking.superficy = req.body.superficy
    result = { msg: "Le coworking a bien été modifié", data: coworking }
  } else {
    result = `Aucun élément ne correspond à l'id n°${req.params.id}`
  }

  res.json(result)
})

app.delete("/api/coworkings/:id", (req, res) => {
  let coworking = mockCoworkings.find((el) => el.id === parseInt(req.params.id))
  let result

  if (coworking) {
    mockCoworkings = mockCoworkings.filter((el) => el.id !== coworking.id)
    result = { msg: `Le coworking ${coworking.name} a bien été supprimé`, data: coworking }
  } else {
    result = `Aucun élément ne correspond à l'id n°${req.params.id}`
  }

  res.json(result)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

FIN JOUR 2