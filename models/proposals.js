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


  Proposals = sequelize.define("Proposals",schema, {
    classMethods: {
      associate: function(models) {
        Proposals.belongsTo(models.Projects, {foreignKey: {allowNull: false}});
        Proposals.belongsTo(models.Users, {foreignKey: {allowNull: false}});
      }
    }
  });


  return Proposals;
};
