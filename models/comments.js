'use strict';

module.exports = (sequelize, DataTypes) => {
  let Comments;
  let schema;


  ///////// Schema
  schema = {
    body: {
      type: DataTypes.TEXT
    }
  };



  Comments = sequelize.define("Comments",schema, {
    classMethods: {
      associate: function(models) {
        Comments.belongsTo(models.Projects, {foreignKey: {allowNull: false}});
        Comments.belongsTo(models.Users, {foreignKey: {allowNull: false}});
      }
    }
  });


  return Comments;
};