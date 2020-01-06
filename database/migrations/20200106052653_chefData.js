exports.up = function(knex) {
  return knex.schema
    .createTable("chefs", tbl => {
      tbl.increments();
      tbl.string("first-name", 128).notNullable();
      tbl.string("last-name", 128).notNullable();
      tbl
        .string("username", 128)
        .notNullable()
        .unique();
      tbl
        .string("email", 128)
        .notNullable()
        .unique();
      tbl.string("password").notNullable();
      tbl.string("location", 128).notNullable();
    })
    .createTable("recipes", tbl => {
      tbl.increments();
      tbl.string("title").notNullable();
      tbl.string("meal-type", 128).notNullable();
      tbl.string("image-url").notNullable();
      tbl.string("ingredients").notNullable();
      tbl.string("directions").notNullable();
      tbl
        .integer("chef-id")
        .notNullable()
        .unsigned()
        .references("id")
        .inTable("chefs")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("recipes").dropTableIfExists("chefs");
};
