var express = require('express');
var router = express.Router();
const ctrlUsers = require('../controllers/users');

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});

router.get('/login',ctrlUsers.login);
router.get('/signup',ctrlUsers.signup);
router.post('/signup',ctrlUsers.postSignup);
router.post('/login',ctrlUsers.postLogin);

module.exports = router;