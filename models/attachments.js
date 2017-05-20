'use strict';

module.exports = (sequelize, DataTypes) => {
  let Attachments;
  let schema;


  ///////// Schema
  schema = {
    description: {
      type: DataTypes.STRING
    },
    urls: {
      type: DataTypes.TEXT
    }
  };




  Attachments = sequelize.define("Attachments",schema, {
    classMethods: {
      associate: function(models) {
        Attachments.belongsTo(models.Projects, {foreignKey: {allowNull: false}});
      }
    }
  });


  return Attachments;
};