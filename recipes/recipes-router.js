const express = require("express");

const Recipes = require("./recipes-model.js");

const router = express.Router();

router.get("/", (req, res) => {
  Recipes.find()
    .then(recipes => {
      res.status(200).json(recipes);
    })
    .catch(err => {
      res.status(500).json({ errorMessage: "Failed to get recipes" });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  Recipes.findById(id)
    .then(recipe => {
      if (recipe) {
        res.json(recipe);
      } else {
        res
          .status(404)
          .json({ message: "Could not find recipe with given id." });
      }
    })
    .catch(err => {
      res.status(500).json({ errorMessage: "Failed to get recipe" });
    });
});

router.get("/:id/ingredients", (req, res) => {
  const { id } = req.params;

  Recipes.findIngredients(id)
    .then(ingredients => {
      if (ingredients.length) {
        res.json(ingredients);
      } else {
        res
          .status(404)
          .json({ message: "Could not find ingredients for given recipe" });
      }
    })
    .catch(err => {
      res.status(500).json({ errorMessage: "Failed to get ingredients" });
    });
});

router.get("/:id/directions", (req, res) => {
  const { id } = req.params;

  Recipes.findDirections(id)
    .then(directions => {
      if (directions.length) {
        res.json(directions);
      } else {
        res
          .status(404)
          .json({ message: "Could not find directions for given recipe" });
      }
    })
    .catch(err => {
      res.status(500).json({ errorMessage: "Failed to get directions" });
    });
});

module.exports = router;
