'use strict';

module.exports = (sequelize, DataTypes) => {
  let Proposals;
  let schema;
  let association;

  ///////// Schema
  schema = {
    proposalTitle: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    proposalBody: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    proposalAgree: {
      type: DataTypes.INTEGER
    },
    proposalDisagree: {
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
