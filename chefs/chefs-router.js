const router = require('express').Router();

const db = require('./recipes-model.js');



router.get('/:username', (req, res) => {
    //console.log(req.token)
    db.find()
    .then(response => {
        console.log(response);
    })
})

module.exports = router;