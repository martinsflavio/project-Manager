'use strict';

module.exports = (sequelize, DataTypes) => {
  let Projects;
  let schema;
  let association;

  ///////// Schema
  schema = {
    id: {
      type: DataTypes.INTEGER,
      field: 'ProjId',
      primaryKey: true,
      autoIncrement: true
    },
    projectSubject: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    projectDescription: {
      type: DataTypes.STRING,
      allowNull: false
    },
    zipCode: {
      type: DataTypes.STRING(10),
      allowNull: false
    }
  };

  ///////// Association - m:1
  association = {
    classMethods: {
      associate: models => {
        Projects.belongsTo(models.Users, {foreignKey: {allowNull: false}});
        Projects.hasMany(models.Attachments, {onDelete: "cascade"});
      }
    }
  };


  Projects = sequelize.define("Projects",schema, association);
  return Projects;
};