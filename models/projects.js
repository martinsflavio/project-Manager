module.exports = (sequelize, DataTypes) => {
  let Projects;
  let schema;
  let association;

  ///////// Schema
  schema = {
    project_Subject: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      validate: {
        max: 4,
      }
    }
  };
  ///////// Association - m:1
  association = {
    classMethods: {
      associate: models => {
        Projects.belongsTo(models.Users, {
          foreignKey: {
            allowNull: false
          }
        })
      }
    }
  };


  Projects = sequelize.define("Projects",schema, association);
  return Projects;
};