const express = require('express')
const router = express.Router()
const {registerUser,loginUser,logout} = require('../controllers/userController')
router.route('/register').post((registerUser));
router.route('/login').post((loginUser))
<<<<<<< HEAD
router.route('/logout').post(logout)
=======
router.route('/logout').get((logout))
>>>>>>> 2eb7037ec755c729999e0434f5150484e833c600
module.exports = router;
