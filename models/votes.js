'use strict';

module.exports = (sequelize, DataTypes) => {
  let Votes;
  let schema;


  ///////// Schema
  schema = {
    vote: {
      type: DataTypes.STRING,
      allowNull: false
    }
  };


  Votes = sequelize.define("Votes",schema, {
    classMethods: {
      associate: function(models) {
        Votes.belongsTo(models.Proposals, {foreignKey: {allowNull: false}});
        Votes.belongsTo(models.Users, {foreignKey: {allowNull: false}});
        Votes.belongsTo(models.Projects, {foreignKey: {allowNull: false}});
      }
    }
  });




  return Votes;
};