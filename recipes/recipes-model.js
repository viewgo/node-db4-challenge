const db = require("../data/db-config.js");

module.exports = {
  find,
  findById,
  findIngredientsById,
  findDirections,
  add,
  remove,
  findAllIngredients,
  findRecipesByIngredientId
};

function find() {
  return db("recipes");
}

function findAllIngredients() {
  return db("ingredients");
}

function findRecipesByIngredientId(id) {
  /*SELECT r.name
FROM recipes_ingredients as ri
JOIN recipes as r ON r.id = ri.recipe_id
WHERE ri.ingredient_id = 2*/

  return db("recipes_ingredients as ri")
    .select("r.name")
    .join("recipes as r", "r.id", "ri.recipe_id")
    .where("ri.ingredient_id", id);
}

function findById(id) {
  return db("recipes")
    .where({ id })
    .first();
}

function findIngredientsById(id) {
  return db("ingredients")
    .where({ id })
    .first();
}
function findIngredients(id) {
  console.log(id);
  //   SELECT i.measurement, i.name
  // FROM recipes_ingredients as ri
  // JOIN [ingredients] as i ON ri.ingredient_id = i.id
  // WHERE ri.recipe_id = 1
  return db("recipes_ingredients as ri")
    .select("ri.quantity", "i.measurement", "i.name")
    .join("ingredients as i", "ri.ingredient_id", "i.id")
    .where("ri.recipe_id", id);
}

function findDirections(id) {
  console.log(id);
  //   SELECT d.step_number, d.step_description
  // FROM directions as d
  // WHERE recipe_id = 2
  return db("directions as d")
    .select("d.step_number", "d.step_description")
    .where("recipe_id", id);
}

function add(recipe) {
  return db("recipes")
    .insert(recipe, "id")
    .then(([id]) => {
      return findById(id);
    });
}

function remove(id) {
  const deleted = findById(id).then(obj => {
    return obj;
  });

  return db("recipes")
    .where({ id })
    .del()
    .then(count => {
      return deleted;
    });
}
