exports.up = function(knex) {
  return knex.schema
    .createTable("recipes", tbl => {
      tbl.increments();

      tbl
        .string("name", 255)
        .notNullable()
        .unique();
      tbl
        .integer("ingredient_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("ingredients")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");

      tbl
        .float("quantity")
        .unsigned()
        .notNullable();

      tbl
        .integer("directions_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("directions")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");
    })

    .createTable("ingredients", tbl => {
      tbl.increments();

      tbl.string("measurement", 255).notNullable();
    })

    .createTable("directions", tbl => {
      tbl.increments();

      tbl
        .integer("recipes_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("recipes")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");
    });
};

exports.down = function(knex) {};
