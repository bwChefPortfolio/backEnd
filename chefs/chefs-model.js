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

async function add(chef) {
  const [id] = await db("chefs").insert(chef);

  return findById(id);
}

// async function add(user) {
//   console.log("user", user);
//   await db("chefs")
//     .insert(user, "id")
//     .then(ids => {
//       const [id] = ids;
//       return findById(id);
//     });
// }

function findById(id) {
  return db("chefs")
    .where({ id })
    .first();
}
