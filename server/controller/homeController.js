import express from 'express';
let router = express.Router();

//index page on GET request
router.get('/', (req, res) => {
  //console.log(req.url);
  res.render('index');
});

module.exports = router;
