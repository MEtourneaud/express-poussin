module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Coworking",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "Le nom est déjà pris.",
        },
        validate: {
          len: {
            msg: "Le nom doit avoir un nombre de caractères compris entre 3 et 50.",
            args: [3, 50],
          },
        },
      },
      price: {
        type: DataTypes.JSON,
        validate: {
          isPriceValid(value) {
            if (
              value.hasOwnProperty("hour") &&
              value.hasOwnProperty("day") &&
              value.hasOwnProperty("month")
            ) {
              if (value.hour === null && value.day === null && value.month === null) {
                throw new Error("Au moins un des trois tarifs doit être renseigné.")
              }
            } else {
              throw new Error(`La syntaxe des tarifs n'est pas correcte.`)
            }
          },
        },
      },
      address: {
        type: DataTypes.JSON,
      },
      superficy: {
        type: DataTypes.INTEGER,
        validate: {
          isInt: {
            msg: "La superficie doit être un entier.",
          },
        },
      },
      capacity: {
        type: DataTypes.INTEGER,
        validate: {
          isInt: {
            msg: "La superficie doit être un entier.",
          },
        },
      },
    },
    {
      onDelete: "CASCADE",
    }
  )
}
