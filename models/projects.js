'use strict';

module.exports = (sequelize, DataTypes) => {
  let Projects;
  let schema;
  let association;

  ///////// Schema
  schema = {
    subject: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },

  };



  Projects = sequelize.define("Projects",schema, {
    classMethods: {
      associate: function(models) {
        Projects.belongsTo(models.Users, {foreignKey: {allowNull: false}
        });
      }
    }
  });
  return Projects;
};