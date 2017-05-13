module.exports = (sequelize, DataTypes) => {
  let Proposals;
  let schema;
  let association;

  ///////// Schema
  schema = {
    proposal_title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    proposal_body: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    proposal_agree: {
      type: DataTypes.INTEGER
    },
    proposal_disagree: {
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
