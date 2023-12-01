// on définit le model coworking qui se traduira par une table avec ses champs dans la BDD
module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Coworking", {
    name: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.JSON,
    },
    address: {
      type: DataTypes.JSON,
    },
    superficy: {
      type: DataTypes.INTEGER,
    },
    capacity: {
      type: DataTypes.INTEGER,
    },
  })
}
