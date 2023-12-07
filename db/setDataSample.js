const mockCoworkings = require("./mock-coworkings")
const mockUsers = require("./mock-users")
const bcrypt = require("bcrypt")

const setCoworkings = (Coworking) => {
  mockCoworkings.forEach((coworking) => {
    const newCoworking = { ...coworking }
    Coworking.create(newCoworking)
      .then(() => {})
      .catch((error) => {
        console.log(error.message)
      })
  })
}

const setUsers = (User) => {
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

const setRoles = (Role) => {
  Role.create({ label: "admin" })
    .then(() => {})
    .catch((error) => {
      console.log(error.message)
    })
  Role.create({ label: "edit" })
    .then(() => {})
    .catch((error) => {
      console.log(error.message)
    })
}

module.exports = { setCoworkings, setUsers, setRoles }
