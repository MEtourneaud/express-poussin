module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Review", {
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
        max: 5,
      },
    },
  })
}
