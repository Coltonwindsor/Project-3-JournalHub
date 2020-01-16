const mongoose = require('./connection.js')

const FoodSchema = new mongoose.Schema({
  name: String,
  description: String,
})

const FoodCollection = mongoose.model('food', FoodSchema)

const getFoodById = (id) => {
  return FoodCollection.findById(id)
}

const getAllFoods = () => {
  return FoodCollection.find({})
}

const createFood = (newFood) => {
  return FoodCollection.create(newFood)
}

const updateFood = (id, updatedFood) => {
  return FoodCollection.updateOne({ _id: id }, updatedFood)
}

const deleteFood = (id) => {
  return FoodCollection.deleteOne({ _id: id })
}


module.exports = {
  getFoodById,
  getAllFoods,
  createFood,
  updateFood,
  deleteFood,
}
