const express = require('express');
const authenticationController=require("../controllers/authenticationController");
const router = express.Router();

router.post('/login',authenticationController.login);
router.post('/signup',authenticationController.signup);
module.exports = router;
