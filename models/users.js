'use strict';

module.exports = (sequelize, DataTypes) => {
  let Users;
  let schema;
  let association;

  ///////// Schema
  schema = {
    id: {
      type: DataTypes.INTEGER,
      field: 'UserId',
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
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
    }
  };

  ///////// Association - 1:m
  association = {
    classMethods: models => {
      Users.hasToMany(models.Projects, {onDelete: "cascade"});
    }
  };

  Users = sequelize.define("Users",schema, association);
  return Users;
};