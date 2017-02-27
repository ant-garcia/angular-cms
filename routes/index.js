var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('*', function(request, response){
	response.sendFile('index.html', { root: path.join(__dirname, '../public')});
});

module.exports = router;
