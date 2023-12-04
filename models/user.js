module.exports = (sequelize, DataTypes) => {
  return sequelize.define("User", {
    name: {
      type: DataTypes.STRING,
    },
    age: {
      type: DataTypes.INTEGER,
    },
    country: {
      type: DataTypes.STRING,
    },
  })
}
