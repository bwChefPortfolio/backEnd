const router = require("express").Router();

const db = require("../recipes/recipes-model.js");
const chefs = require("./chefs-model.js");

const recipeRouter = require("../recipes/recipes-router.js")

router.use("/:username", chefAuthZ, recipeRouter);

router.get("/",  async (req, res) => {
  //const username = req.params.username;
  //console.log("username", username);
  await chefs
    .findBy(req.body)
    .then(resp => {
        if (resp.length === 0) {
          res.status(200).json({ message: "No Data for chef." });
        } else {
          res.status(200).json(resp);
        }
     
    })
    .catch(err => {
      console.log("GET to /chefs error:", err);
      res
        .status(500)
        .json({ message: "Database error getting chef data. Please try again." });
    });
});

router.get("/:username", chefAuthZ, async (req, res, next) => {
  const username = req.params.username;
  //console.log("username", username);
  await chefs
    .findBy({ username })
    .then(response => {
      //console.log(response[0]);
      const chef = response[0];
      db.findBy({ chef_id: chef.id }).then(resp => {
        if (resp.length === 0) {
          res.status(200).json({ message: "There are no recipes to display." });
        } else {
          res.status(200).json(resp);
        }
      });
    })
    .catch(err => {
      next();
    })
    .catch(err => {
      console.log("GET to /chefs/:username error:", err);
      res
        .status(500)
        .json({ message: "Database error getting recipes. Please try again." });
    });
});

router.post("/:username", chefAuthZ, async (req, res) => {
  const toAdd = { ...req.body, chef_id: req.token.chef_id };
  //console.log("toAdd", toAdd);
  await db
    .add(toAdd)
    .then(response => {
      res.status(201).json(response);
    })
    .catch(err => {
      console.log("create recipe error:", err);
      res
        .status(500)
        .json({ message: "Database error creating recipe. Please try again." });
    });
});

router.delete("/:username/:recipe_id", recipeAuth, (req, res) => {
  console.log("In CHEFS router", req.body);
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

router.put("/:username/:recipe_id", recipeAuth, (req, res) => {
  console.log("In CHEFS router", req.body);
  const changes = req.body;
  const id = req.params.recipe_id;
  db.update(id, changes)
    .then(recipe => {
      if (recipe) {
        res.status(200).json({ message: "Recipe successfully updated" })
      } else {
        res.status(404).json({ message: "The recipe could not be updated" });
      }
    })
    .catch(err => {
      console.log("Delete recipe error", err);
      res.status(500).json({
        message: "database error removing this recipe, please try again"
      });
    });
});

//middleware/helper functions
//check that username in url exists and matches chef logged in
function chefAuthZ(req, res, next) {
  const tokenUser = req.token.username;
  const urlUser = req.params.username;
  console.log("In chefAuthZ", urlUser, tokenUser);

  chefs
    .findBy({ username: urlUser })
    .then(response => {
      if (Object.keys(response).length === 0) {
        res.status(403).json({ message: "Page does not exist." });
      } else if (urlUser !== tokenUser) {
        res
          .status(403)
          .json({ message: "You are not authorized to view this page." });
      } else {
        next();
        //recipes.updateRecipe();
        console.log("chefAuthZ", next);
      }
    })
    .catch(err => {
      console.log("chefAuthZ error:", err);
    });
}

//check that recipe exists, belongs to chef
async function recipeAuth(req, res, next) {
  const chefId = req.token.chef_id;
  const recipeId = req.params.recipe_id;
  console.log("In recipeAuth- chefId", chefId, "recipeId", recipeId);
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
