const router = require("express").Router();

const db = require("../recipes/recipes-model.js");

router.get("/", (req, res) => {
  console.log(req.body);
  db.findBy(req.body)
    .then(response => {
       console.log(response);
       
      if(response.length === 0){
        res.status(200).json({message: "There are no recipes to display."});
      }else {
        // const sortField = req.query.sortby || 'id';
        //     const sorted = response.sort(
        //       (a, b) => (a[sortField] < b[sortField] ? -1 : 1)
        //     );
            res.status(200).json(response);
        }
    })
    .catch(err => {
      console.log("GET to /home error:", err);
      res.status(500).json({ message: "database error, please try again" });
    });
});

module.exports = router;
