const express = require(`express`)
// On construit une instance d'express
const app = express()
const port = 3000

const mockCoworkings = require(`./mock-coworkings`)

const arrUsers = [
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
    id: 6,
    name: "Micheline",
    age: 41,
  },
]

const logger = (req, res, next) => {
  const now = new Date()
  const hours = now.getHours()
  const minutes = now.getMinutes()
  console.log(`${hours}h${minutes} - ${req.url} DANS LOGGER`)
  next()
}

app.use(logger)

// Execution de app.js
app.get("/", (req, res) => {
  res.send("Page d'accueil")
})

app.get("/api/coworkings", (req, res) => {
  res.send(`Il y a ${mockCoworkings.length} coworkings dans la liste !`)
})

app.get("/api/coworkings/:id", (req, res) => {
  const urlId = parseInt(req.params.id)
  let coworkingId = mockCoworkings.find((cowork) => cowork.id === urlId)
  coworkingId = coworkingId ? coworkingId.name : `Le coworking numéro ${urlId} n'existe pas`

  res.send(coworkingId)
})

app.get("/names", (req, res) => {
  // Une requête ne peut renvoyer qu'une seule et unique réponse
  // D'abord, on crée une chaîne de caractère à partir des éléments du tableau, puis on la renvoie dans une réponse
  // => Jacques et Jean-Pierre et Mathilde !
  let sentence = ""
  arrUsers.forEach((object) => {
    sentence += object.name + " "
  })
  res.send(sentence + "!")
})

app.get("/names/:id", (req, res) => {
  // console.log(parseInt(req.params.id))
  // Implémenter le test pour sélectionner dans le tableau l'objet dont l'id correspond à l'id passé en paramètre d'url

  const urlId = parseInt(req.params.id)
  //... trouver le bon objet dans le tableau

  //   let result = "not found"
  //   for (let i = 0; i < arrUsers.length; i++) {
  //     const element = arrUsers[i]
  //     if (element.id === urlId) {
  //       result = arrUsers[i].name
  //       break
  //     }
  //   }

  let result = arrUsers.find((el) => el.id === urlId)
  //   if (!result) {
  //     result = "not found"
  //   } else {
  //     result = result.name
  //   }

  result = result ? result.name : "not found"
  // on peut résumer le test précédent en une condition ternaire
  res.send(result)
})

//Ecoute sur le port 3000
app.listen(port, () => {
  console.log(`Le port qui en train d'être écouté est le port numéro ${port}`)
})
