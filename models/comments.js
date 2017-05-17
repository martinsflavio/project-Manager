'use strict';

module.exports = (sequelize, DataTypes) => {
  let Comments;
  let schema;
  let association;

  ///////// Schema
  schema = {
    commentBody: {
      type: DataTypes.TEXT
    }
  };

  ///////// Association - m:1
  association = {
    classMethods: {
      associate: models => {
        Comments.belongsTo(models.Projects, {foreignKey: {allowNull: false}});
        Comments.belongsTo(models.Users, {foreignKey: {allowNull: false}});
      }
    }
  };

  Comments = sequelize.define("Comments",schema, association);
  return Comments;
};