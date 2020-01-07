const db = require('../database/db-config.js');

module.exports = {
    add,
    find,
    findBy,
    findById
  };
  
  function find() {
    return db("recipes");
  }
  
  function findBy(filter) {
    return db("recipes").where(filter);
  }
  
  async function add(recipe) {
    const [id] = await db("recipes").insert(recipe);
  
    return findById(id);
  }
  
  function findById(id) {
    return db("recipes")
      .where({ id })
      .first();
  }