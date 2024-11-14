const express = require('express');
const carController = require('../controllers/carController/car_query'); // Adjust path as needed
const router = express.Router();
const verifyToken=require("../middlewares/auth");
router.post('/create_car', verifyToken,carController.createCar);
router.post('/get_car',verifyToken,carController.getCarById);
router.post('/delete_car',verifyToken,carController.deleteCardById);
router.post('/update_car',carController.updateCardById);
module.exports = router;
