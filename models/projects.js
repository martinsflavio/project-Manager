module.exports = (sequelize, DataTypes) => {
  let Projects;
  let schema;
  let association;

  ///////// Schema
  schema = {
    project_subject: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    project_description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    project_status: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      validate: {
        max: 4,
      }
    },
    zip_code: {
      type: DataTypes.STRING(15),
      allowNull: false
    }
  };

  ///////// Association - m:1
  association = {
    classMethods: {
      associate: models => {
        Projects.belongsTo(models.Users, {foreignKey: {allowNull: false}});
        Projects.hasMany(models.Attachments, {onDelete: "cascade"});
      }
    }
  };


  Projects = sequelize.define("Projects",schema, association);
  return Projects;
};