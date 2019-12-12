exports.seed = function(knex, Promise) {
  return knex("ingredients").insert([
    { name: "cream cheese", measurement: "8 oz block of" },
    { name: "eggs", measurement: "large" }
  ]);
};
