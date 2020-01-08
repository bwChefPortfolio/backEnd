const bcrypt = require("bcryptjs");

exports.seed = function(knex, Promise) {
  // // Deletes ALL existing entries
  // return knex("chefs")
  //   .del()
  //   .then(function() {
  // Inserts seed entries
  return knex("chefs").insert([
    {
      id: 1,
      first_name: "Paul",
      last_name: "Bocuse",
      username: "pbocuse",
      email: "pbocuse@email.com",
      password: bcrypt.hashSync("pass", 8),
      location: "France"
    },
    {
      id: 2,
      first_name: "Charlie",
      last_name: "Trotter",
      username: "ctrotter",
      email: "ctrotter@email.com",
      password: bcrypt.hashSync("pass", 8),
      location: "Chicago"
    },
    {
      id: 3,
      first_name: "Emeril",
      last_name: "Lagase",
      username: "elagase",
      email: "elagase@email.com",
      password: bcrypt.hashSync("pass", 8),
      location: "US"
    },
    {
      id: 4,
      first_name: "Thomas",
      last_name: "Keller",
      username: "tkeller",
      email: "tkeller@email.com",
      password: bcrypt.hashSync("pass", 8),
      location: "Napa Valley, CA"
    },
    {
      id: 5,
      first_name: "Sanjeev",
      last_name: "Kapoor",
      username: "skapoor",
      email: "skapoor@email.com",
      password: bcrypt.hashSync("pass", 8),
      location: "India"
    }
  ]);
  //});
};

/*

{id:
  first_name: "",
  last_name: "",
  username: "",
    email: "",
    password: bcrypt.hashSync("", 8);,
  location: ""}
  
  
  recipes
  {
title: "",
meal_type: "",
  image_url: "",
  ingredients: "",
  directions: "",
  chef_id: ""
  }

  */
