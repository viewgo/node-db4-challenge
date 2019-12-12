exports.seed = function(knex, Promise) {
  return knex("directions").insert([
    { recipe_id: 1, step_number: 1, step_description: "whisk" }
  ]);
};
