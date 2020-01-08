const express = require('express');

const db = require("./recipes-model.js");
const chefs = require("./chefs-model.js");
//router.use('/', chefAuthZ);

const router = express.Router();
router.use(express.json());

router.get("/:username", async (req, res, next) => {
  //chefAuthZ(req.params.username);
  console.log(req.token, req.body.chef_id);
  const username = req.params.username;
  //console.log("username", username);
  await chefs
    .findBy({ username })
    .then(response => {
      console.log(response[0]);
      const chef = response[0];
      db.findBy({ id: chef.id }).then(resp => {
        if (resp.length === 0) {
          res.status(200).json({ message: "There are no recipes to display." });
        } else {
          // const sortField = req.query.sortby || 'id';
          //     const sorted = response.sort(
          //       (a, b) => (a[sortField] < b[sortField] ? -1 : 1)
          //     );
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

router.post("/:username", async (req, res) => {
  const toAdd = req.body;
  console.log("toAdd", toAdd, req);
  await db
    .add(toAdd)
    .then(response => {
      res.status(201).json({ response });
    })
    .catch(err => {
      console.log("create recipe error:", err);
      res
        .status(500)
        .json({ message: "Database error creating recipe. Please try again." });
    });
});

router.delete("/:username/:recipe_id", (req, res) => {
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

//middleware
//check that username in url exists and matches chef logged in
function chefAuthZ(chef) {
  const username = req.token.username;
  chefs
    .findBy({ username })
    .then(response => {
      //if(response === req.params.username)
    })
    .catch(err => {
      console.log("chefAuthZ error:", err);
    });
}

//check that recipe exists, belongs to chef
function recipeAuth(recipeId) {}

module.exports = router;
