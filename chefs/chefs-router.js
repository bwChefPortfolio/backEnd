const router = require("express").Router();

const db = require("./recipes-model.js");
const chefs = require("./chefs-model.js");

router.get("/:username", async (req, res, next) => {
  //console.log(req.token)
  const username = req.params.username;
  console.log("username", username);
  await chefs
    .findBy({ username })
    .then(response => {
      console.log(response[0]);
      const chef = response[0];
      db.findBy({ id: chef.id }).then(resp => {
        res.status(200).json(resp);
      });
    })
    .catch(err => {
      next();
    })

    .catch(err => {
      console.log("GET to /chefs/:username error:", err);
      res.status(500).json({ message: "database error, please try again" });
    });
});

module.exports = router;
