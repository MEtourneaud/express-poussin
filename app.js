const express = require("express")
//On construit une instance d'express
const app = express()
const port = 3000

const arrNames = [
  {
    id: 12,
    name: "Jacques",
    age: 28,
  },
  {
    id: 15,
    name: "Jean-Pierre",
    age: 52,
  },
  {
    id: 15,
    name: "Micheline",
    age: 41,
  },
]

//Execution de app.js
app.get("/", (req, res) => {
  res.send("Page d'accueil")
})

app.get("/names", (req, res) => {
  //Une requête ne peut renvoyer qu'une seule et unique réponse
  //D'abord, on crée une chaîne de caractère à partir des éléments du tableau, puis on la renvoie dans une réponse
  // => Jacques et Jean-Pierre et Mathilde !
  let sentence = ""
  arrNames.forEach((name, i) => {
    sentence += name + " "
  })
  res.send(sentence + "!")
})

app.get("/names/:id", (req, res) => {
  console.log(parseInt(req.params.id))
  // Implémenter le test pour sélectionner dans le tableau l'objet dont l'id correspond à l'id passé en paramètre d'url
  res.send(arrNames[req.params.id])
})

//Ecoute sur le port 3000
app.listen(port, () => {
  console.log(`Le port qui en train d'être écouté est le port numéro ${port}`)
})
