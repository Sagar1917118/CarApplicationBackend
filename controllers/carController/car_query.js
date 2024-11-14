const Car = require('../../models/car'); // Adjust path as necessary
const User=require("../../models/users");
// Create a car using Mongoose's create() function
const createCar = async (req, res) => {
    try {
        const {data,userId}=req.body;
        const user=await User.findById(userId);
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
            }
        
        // console.log(data);
        const { carname, brand, category, price, fuelType, type, features } = data;
        if (!carname || !brand || !category || !price || !fuelType || !type || !features) {
            return res.status(400).json({
                message: 'All fields are required',
            });
        }
        // Save car details using create() method
        const car = await Car.create({
            carname,
            brand,
            category,
            price,
            fuelType,
            type,
            features,
        });
        user.carsCollection.push(car._id);
        // Save the updated user
        await user.save();

        res.status(201).json({
            message: 'Car created successfully',
            car,
        });
    } catch (error) {
        res.status(400).json({
            message: 'Failed to create car',
            error: error.message,
        });
    }
};

//get car by id
const getCarById = async (req, res) => {
    try {
        const { userId } = req.body; // Extract the ID from request parameters
        const user = await User.findById(userId).populate('carsCollection');

            if (!user) {
            return res.status(404).json({ message: 'User not found' });
            }
        // Find the car by ID
        // console.log(user);
        const cars=user?.carsCollection;
        // console.log(cars);
        if (!cars) {
            return res.status(404).json({ message: 'Car not found' });
        }

        res.status(200).json(cars);
    } catch (error) {
        // Handle invalid ObjectId or other errors
        if (error.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid car ID format' });
        }
        res.status(500).json({ message: 'Failed to fetch car', error: error.message });
    }
}; 
const deleteCardById=async (req,res)=>{
    try{
        const {userId,carId}=req.body;
        console.log(userId,carId);
        if (!userId || !carId) {
            return res.status(400).json({ message: "userId and carId are required" });
        }
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const carIndex = user.carsCollection.indexOf(carId);
        if (carIndex === -1) {
            return res.status(404).json({ message: "Car not associated with this user" });
        }
        user.carsCollection.splice(carIndex, 1); 
        await user.save();
        const deletedCar = await Car.findByIdAndDelete(carId);
        if (!deletedCar) {
            return res.status(404).json({ message: "Car not found" });
        }
        res.status(200).json({
            message: "Car deleted successfully and removed from user's card",
        });
    }
    catch(err){
        console.error(err);
        res.status(500).json({ message: "An error occurred", error: err.message });
    }
}
const updateCardById=async (req,res)=>{
    try{
        const {id,data}=req.body;
        const { carname, brand, category, price, fuelType,type,features } = data;
        if (!carname || !brand || !category || !price || !fuelType || !type || !features) {
            return res.status(400).json({
                message: 'All fields are required',
            });
        }
        await Car.findByIdAndUpdate({_id:id},{carname,brand,category, price, fuelType, type,features},{new:true});
        res.status(200).json({
            message: "Car is updated successfully",
        });  
    }
    catch(err){
        console.error(err);
        res.status(500).json({ message: "An error occurred", error: err.message });
    }
}
module.exports = {
    createCar,getCarById,deleteCardById,updateCardById
};
