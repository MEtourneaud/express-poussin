const mockCoworkings = require("./mock-coworkings")
const mockUsers = require("./mock-users")
const bcrypt = require("bcrypt")

const setCoworkings = (Coworking) => {
  return Promise.all(
    mockCoworkings.map((element) => {
      const newCoworking = { ...element, id: null }
      return Coworking.create(newCoworking)
        .then(() => {})
        .catch((error) => {
          console.log(error.message)
        })
    })
  )
}

const setUsers = (User) => {
  return Promise.all(
    mockUsers.map((user) => {
      return bcrypt.hash(user.password, 10).then((hashResult) => {
        User.create({ ...user, password: hashResult })
          .then(() => {})
          .catch((error) => {
            console.log(error.message)
          })
      })
    })
  )
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
