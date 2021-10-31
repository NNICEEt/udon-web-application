const router = require('express').Router();

router.get('/', (req,res) => {
    res.send("Product List");
})

module.exports = router;