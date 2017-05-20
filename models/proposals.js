'use strict';

module.exports = (sequelize, DataTypes) => {
  let Proposals;
  let schema;
  let association;

  ///////// Schema
  schema = {
    subject: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    agree: {
      type: DataTypes.INTEGER
    },
    disagree: {
      type: DataTypes.INTEGER
    }
  };

  ///////// Association - m:1
  association = {
    classMethods: {
      associate: models => {
        Proposals.belongsTo(models.Projects, {foreignKey: {allowNull: false}});
        Proposals.belongsTo(models.Users, {foreignKey: {allowNull: false}});
      }
    }
  };

  Proposals = sequelize.define("Proposals",schema, association);
  return Proposals;
};
