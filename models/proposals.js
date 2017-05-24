'use strict';

module.exports = (sequelize, DataTypes) => {
  let Proposals;
  let schema;

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
    }
  };


  Proposals = sequelize.define("Proposals",schema, {
    classMethods: {
      associate: function(models) {
        Proposals.belongsTo(models.Projects, {foreignKey: {allowNull: false}});
        Proposals.belongsTo(models.Users, {foreignKey: {allowNull: false}});
        Proposals.hasMany(models.Votes, {onDelete: "cascade"});
      }
    }
  });


  return Proposals;
};
