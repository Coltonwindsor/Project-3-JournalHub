const mongoose = require('./connection.js')

const ExerciseSchema = new mongoose.Schema({
  name: String,
  description: String,
})

const ExerciseCollection = mongoose.model('exercise', ExerciseSchema)

const getExerciseById = (id) => {
  return ExerciseCollection.findById(id)
}

const getAllExercises = () => {
  return ExerciseCollection.find({})
}

const createExercise = (newExercise) => {
  return ExerciseCollection.create(newExercise)
}

const updateExercise = (id, updatedExercise) => {
  return ExerciseCollection.updateOne({ _id: id }, updatedExercise)
}

const deleteExercise = (id) => {
  return ExerciseCollection.deleteOne({ _id: id })
}


module.exports = {
  getExerciseById,
  getAllExercises,
  createExercise,
  updateExercise,
  deleteExercise,
}
