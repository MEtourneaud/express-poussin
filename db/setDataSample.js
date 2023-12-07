const mockCoworkings = require("../mock-coworkings")
const mockUsers = require("../mock-users")
const bcrypt = require("bcrypt")

const setDataSample = (Coworking, User) => {
  mockCoworkings.forEach((coworking) => {
    const newCoworking = { ...coworking }
    Coworking.create(newCoworking)
      .then(() => {})
      .catch((error) => {
        console.log(error.message)
      })
  }),
    mockUsers.forEach((user) => {
      bcrypt.hash(user.password, 10).then((hash) => {
        User.create({ ...user, password: hash })
          .then(() => {})
          .catch((error) => {
            console.log(error.message)
          })
      })
    })
}

module.exports = { setDataSample }
