const express = require("express");

const db = require("./recipes-model.js");
const chefs = require("./chefs-model.js");
//router.use('/', chefAuthZ);

const router = express.Router();
router.use(express.json());

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

router.delete("/:username/:recipe_id", (req, res) => {
  //console.log(req.body);
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

//middleware/helper functions
//check that username in url exists and matches chef logged in
function chefAuthZ(req, res, next) {
  const tokenUser = req.token.username;
  const urlUser = req.params.username;
  console.log(urlUser, tokenUser);
  
  chefs
  .findBy({ username: urlUser })
  .then(response => {
    if (Object.keys(response).length === 0) {
      res.status(403).json({ message: "Page does not exist." });
    } else if (urlUser !== tokenUser) {
      res
        .status(403)
        .json({ message: "You are not authorized to view this page." });
    }
       else {
      next();
    }
  })
  .catch(err => {
    console.log("chefAuthZ error:", err);
  });

  // if (urlUser !== tokenUser) {
  //   res
  //     .status(403)
  //     .json({ message: "You are not authorized to view this page." });
  // } else {
  //   //check that user exists in db
  //   chefs
  //     .findBy({ username: tokenUser })
  //     .then(response => {
  //       if (Object.keys(response).length === 0) {
  //         res.status(403).json({ message: "Page not found." });
  //       } else {
  //         next();
  //       }
  //     })
  //     .catch(err => {
  //       console.log("chefAuthZ error:", err);
  //     });
  // }
}

//check that recipe exists, belongs to chef
function recipeAuth(recipeId) {}

module.exports = router;
