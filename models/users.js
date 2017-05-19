'use strict';

const bcrypt = require('bcryptjs');


module.exports = (sequelize, DataTypes) => {
  let Users;
  let schema;
  let options;

  ///////// Schema
  schema = {
    id: {
      type: DataTypes.INTEGER,
      field: 'UserId',
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.UUID,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  };

  ///////// Association - 1:m
  options = {
    classMethods: models => {
      Users.hasToMany(models.Projects, {onDelete: "cascade"});
    }
  };


  Users = sequelize.define("Users",schema, options);


  Users.createUser = (newUser, callback) => {

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        newUser.password = hash;
        Users.create(newUser).then( user => {
          callback(user);
        }).catch(err => {
          // formatin error in list
          let errorsList = [];
          err.errors.forEach(dbErrors =>{
            errorsList.push({msg : dbErrors.message});
          });
          callback({errors:errorsList});
        });
      });
    });
  };


  Users.getUserByUsername = (username, callback) => {
    let query = { where: {username: username} };
    Users.findOne(query).then(user => {
      callback(user);
    }).catch(err => {
      callback(err);
    });
  };

  Users.getUserById = (id, callback) => {

    Users.findById(id).then(user =>{
      callback(user);
    }).catch(err => {
      callback(err);
    });
  };

  Users.comparePassword = (candidatePassword, hash, callback) => {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
      if (err) throw err;
      callback(null, isMatch);
    });
  };

  return Users;
};