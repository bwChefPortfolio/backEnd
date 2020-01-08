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
  
  function add(recipe) {
    console.log("recipe", recipe);
    return db("recipes")
      .insert(recipe, "id")
      .then(ids => {
        console.log("ids", ids[0]);
        const id = ids[0];
        return findById(id);
      });
  }
  
  function findById(id) {
    return db("recipes")
      .where({ id })
      .first();
  }