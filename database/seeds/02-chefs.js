const bcrypt = require("bcryptjs");

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('chefs').del()
    .then(function () {
      // Inserts seed entries
      return knex('chefs').insert([
        {id: 1, colName: 'rowValue1'},
        {id: 2, colName: 'rowValue2'},
        {id: 3, colName: 'rowValue3'}
      ]);
    });
};

/*

{first-name: "",
  last-name: "",
  username: "",
    email: "",
    password: bcrypt.hashSync("", 8);,
  location: ""}
  
  
  recipes
title
meal-type
  image-url
  ingredients
  directions
  chef-id
  */