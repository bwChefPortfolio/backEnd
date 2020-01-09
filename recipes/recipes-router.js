const router = require("express").Router();

const db = require("./recipes-model.js");


router.delete("/:recipe_id", recipeAuth, (req, res) => {
  console.log("In recipes router", req.body);
  const id = req.params.recipe_id;
  db.remove(id)
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: `Recipe ${id} has been deleted` });
      } else {
        res.status(404).json({ message: `Recipe ${id} could not be found` });
      }
    })
    .catch(err => {
      console.log("Delete recipe error", err);
      res.status(500).json({
        message: "database error removing this recipe, please try again"
      });
    });
});

// const updateRecipe = router.put(":recipe_id", recipeAuth, (req, res) => {
//   console.log("In recipes-router update recipe", req.body);
//   const changes = req.body;
//   const id = req.params.recipe_id;
//   db.update(id, changes)
//     .then(recipe => {
//       if (recipe) {
//         res.status(200).json({ recipe, message: "Recipe successfully updated" })
//       } else {
//         res.status(404).json({ message: "The recipe could not be updated" });
//       }
//     })
//     .catch(err => {
//       console.log("Delete recipe error", err);
//       res.status(500).json({
//         message: "database error removing this recipe, please try again"
//       });
//     });
// });

//middleware
//check that recipe exists, belongs to chef
async function recipeAuth(req, res, next) {
    const chefId = req.token.chef_id;
    const recipeId = req.params.recipe_id;
    console.log("In recipes-router recipeAuth - chefId", chefId, "recipeId", recipeId);
    await db.findBy({ chef_id: chefId })
      .then(response => {
        console.log("response", response);
        const selected = response.find(recipe => recipe.id == recipeId);
        console.log("selected", selected);
        if (response.length === 0 || !selected) {
          res
            .status(404)
            .json({ message: `Recipe id ${recipeId} does not exist.` });
        } else if (selected.chef_id !== chefId) {
          res
            .status(403)
            .json({ message: "You are not authorized to view this page." });
        } else {
          next();
        }
      })
      .catch(err => {
        console.log("recipeAuth error:", err);
      });
  }
  
  module.exports = router;
  