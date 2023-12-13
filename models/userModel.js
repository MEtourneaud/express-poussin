module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "User",
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "Le nom d'utilisateur est déjà pris.",
        },
        validate: {
          len: {
            msg: "Le nom d'utilisateur doit avoir un nombre de caractères compris entre 3 et 50.",
            args: [3, 50],
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        isEmail: true,
        unique: {
          msg: "Cette adresse mail est déjà utilisée.",
        },
      },
    },
    {
      onDelete: "CASCADE",
    }
  )
}
