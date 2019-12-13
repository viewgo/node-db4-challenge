const express = require("express");

const Recipes = require("./recipes-model.js");

const router = express.Router();

router.get("/recipes", (req, res) => {
  Recipes.find()
    .then(recipes => {
      res.status(200).json(recipes);
    })
    .catch(err => {
      res.status(500).json({ errorMessage: "Failed to get recipes" });
    });
});

router.get("/recipes/:id", (req, res) => {
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

router.get("/recipes/:id/ingredients", (req, res) => {
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

router.get("/recipes/:id/directions", (req, res) => {
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

router.get("/ingredients", (req, res) => {
  Recipes.findAllIngredients()
    .then(ingredients => {
      res.status(200).json(ingredients);
    })
    .catch(err => {
      res.status(500).json({ errorMessage: "Failed to get recipes" });
    });
});

router.get("/ingredients/:id", (req, res) => {
  const { id } = req.params;

  Recipes.findIngredientsById(id)
    .then(ingredient => {
      if (ingredient) {
        res.json(ingredient);
      } else {
        res
          .status(404)
          .json({ message: "Could not find ingredient with given id." });
      }
    })
    .catch(err => {
      res.status(500).json({ errorMessage: "Failed to get ingredient" });
    });
});

router.get("/ingredients/:id/recipes", (req, res) => {
  const { id } = req.params;

  Recipes.findRecipesByIngredientId(id)
    .then(recipes => {
      if (recipes.length) {
        res.json(recipes);
      } else {
        res
          .status(404)
          .json({ message: "Could not find recipes for given recipe" });
      }
    })
    .catch(err => {
      res.status(500).json({ errorMessage: "Failed to get recipes" });
    });
});

module.exports = router;
