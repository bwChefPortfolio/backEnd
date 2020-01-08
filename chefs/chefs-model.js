const db = require("../database/db-config.js");

module.exports = {
  add,
  find,
  findBy,
  findById
};

function find() {
  return db("chefs").select("id", "username", "password");
}

function findBy(filter) {
  return db("chefs").where(filter);
}


function add(user) {
  console.log("user", user);
  return db("chefs")
    .insert(user, "id")
    .then(ids => {
      console.log("ids", ids[0]);
      const id = ids[0];
      return findById(id);
    });
}

function findById(id) {
  return db("chefs")
    .where({ id })
    .first();
}
