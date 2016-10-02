var router = require('express').Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('main/home', { title: 'Express' });
});

/* GET about page. */
router.get('/about', function(req, res, next) {
  res.render('main/about', { title: 'Express' });
});



module.exports = router;
