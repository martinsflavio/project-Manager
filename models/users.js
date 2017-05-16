module.exports = (sequelize, DataTypes) => {
  let Users;
  let schema;
  let association;

  ///////// Schema
  schema = {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.UUID,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    zip_code: {
      type: DataTypes.STRING(15),
      allowNull: false
    }
  };

  ///////// Association - 1:m
  association = {
    classMethods: models => {
      Users.hasMany(models.Projects, {onDelete: "cascade"});
    }
  };

  Users = sequelize.define("Users",schema, association);
  return Users;
};