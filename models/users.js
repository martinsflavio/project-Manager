'use strict';

const bcrypt = require('bcryptjs');


module.exports = (sequelize, DataTypes) => {
  let Users;
  let schema;

  ///////// Schema
  schema = {
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

  //(TODO DEVELOPER) aparently the correct way to inject methods into Users Obj is inside options Obj

  Users = sequelize.define("Users",schema, {
    classMethods: {
      associate: function(models) {
        Users.hasMany(models.Projects, {onDelete: "cascade"});
        Users.hasMany(models.Proposals, {onDelete: "cascade"});
        Users.hasMany(models.Comments, {onDelete: "cascade"});
        Users.hasMany(models.Votes, {onDelete: "cascade"});
      }
    }
  });



  //////////////////// Additional Methods //////////////////////////
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