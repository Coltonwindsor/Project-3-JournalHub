const mongoose = require('./connection.js')

const GoalSchema = new mongoose.Schema({
  name: String,
  description: String,
  image: String,
  pointValue: Number
})

const GoalCollection = mongoose.model('goal', GoalSchema)

const getGoalById = (id) => {
  return GoalCollection.findById(id)
}

const getAllGoals = () => {
  return GoalCollection.find({})
}

const createGoal = (newGoal) => {
  return GoalCollection.create(newGoal)
}

const updateGoal = (id, updatedGoal) => {
  return GoalCollection.updateOne({ _id: id }, updatedGoal)
}

const deleteGoal = (id) => {
  return GoalCollection.deleteOne({ _id: id })
}


module.exports = {
  getGoalById,
  getAllGoals,
  createGoal,
  updateGoal,
  deleteGoal,
}
