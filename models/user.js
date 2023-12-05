module.exports = (sequelize, DataTypes) => {
  return sequelize.define("User", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "Username déjà pris.",
      },
      validate: {
        len: {
          msg: "L'username doit avoir un nombre de caractères compris entre 3 et 50.",
          args: [3, 50],
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          msg: "Le mot de passe doit avoir un nombre de caractères compris entre 5 et 50.",
          args: [5, 50],
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "Cette adresse mail est déjà utilisée.",
      },
    },
  })
}
