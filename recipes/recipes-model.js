const db = require("../data/db-config.js");

module.exports = {
  find,
  findById,
  findIngredients,
  findDirections,
  add,
  update,
  remove
};

function find() {
  return db("recipes");
}

function findById(id) {
  return db("recipes")
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

function add(scheme) {
  return db("recipes")
    .insert(scheme, "id")
    .then(([id]) => {
      return findById(id);
    });
}

function update(changes, id) {
  console.log(changes);
  changedObject = { id: id, ...changes };
  console.log(changedObject);
  return db("recipes")
    .update("scheme_name", changes.scheme_name)
    .where({ id })
    .then(count => {
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
