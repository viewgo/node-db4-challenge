exports.seed = function(knex, Promise) {
  return knex("directions").insert([
    { recipe_id: 1, step_number: 1, step_description: "whisk" },
    { recipe_id: 1, step_number: 2, step_description: "bake" },
    { recipe_id: 2, step_number: 1, step_description: "whisk" },
    { recipe_id: 2, step_number: 2, step_description: "whisk" },
    { recipe_id: 2, step_number: 3, step_description: "whisk" }
  ]);
};
