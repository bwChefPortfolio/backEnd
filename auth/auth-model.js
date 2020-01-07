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

async function add(user) {
  const [id] = await db("chefs").insert(user);

  return findById(id);
}

function findById(id) {
  return db("chefs")
    .where({ id })
    .first();
}
