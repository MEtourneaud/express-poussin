const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
// const cookieParser = require("cookie-parser")
const app = express()
const port = 3000

// const { sequelize } = require("./db/sequelizeSetup")

app.use(express.json())
app.use(morgan("dev"))
app.use(cors())
// app.use(cookieParser())

app.get("/", (req, res) => {
  // Exemple d'un cookie de première visite d'un site
  // console.log(req.cookies)
  // res.cookie(`estDejaVenuSurLeSite`, true)
  // if (req.cookies.estDejaVenuSurLeSite) {
  //   res.json("Hello World !")
  // } else {
  //   res.json("Salut le nouveau !")
  // }
  res.json("Hello World !")
})

const coworkingRouter = require("./routes/coworkingRoutes")
const userRouter = require("./routes/userRoutes")
const reviewRouter = require("./routes/reviewRoutes")

app.use("/api/coworkings", coworkingRouter)
app.use("/api/users", userRouter)
app.use("/api/reviews", reviewRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
