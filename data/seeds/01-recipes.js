exports.seed = function(knex, Promise) {
  return knex("recipes").insert([
    { name: "Cheesecake" },
    { name: "Zuppa Toscana" }
  ]);
};
