const router = require("express").Router();

const db = require("../chefs/recipes-model.js");

router.get("/", (req, res) => {
  db.findBy(req.body)
    .then(response => {
        if(response.length === 0){
            res.status(200).json({message: "There are no recipes to display."});
        }else {
            //console.log(response);
            res.status(200).json(response);
        }
    })
    .catch(err => {
      console.log("GET to /home error:", err);
      res.status(500).json({ message: "database error, please try again" });
    });
});

module.exports = router;
