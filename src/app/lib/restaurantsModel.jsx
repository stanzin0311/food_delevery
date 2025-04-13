const { default: mongoose } = require("mongoose");

const restaurantModel = new mongoose.Schema({
    restname: String,
    email:String,
    password:String,
    city:String,
    address:String,
    contactNo:String,
});

export const restaurantSchema = mongoose.models.restaurants || mongoose.model("restaurants", restaurantModel);
