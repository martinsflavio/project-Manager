module.exports = (sequelize, DataTypes) => {
  let Users;
  let schema;
  let association;

  ///////// Schema
  schema = {
    user_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    zip_code: {
      type: DataTypes.STRING(5),
      allowNull: false
    }
  };
  ///////// Association - 1:m
  association = {
    classMethods: models => {
      Users.hasMany(models.Groups, {
        onDelete: "cascade"
      });
    }
  };

  Users = sequelize.define("Users",schema, association);
  return Users;
};