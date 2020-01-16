const mongoose = require('./connection.js')

const DreamSchema = new mongoose.Schema({
  name: String,
  description: String,
})

const DreamCollection = mongoose.model('dream', DreamSchema)

const getDreamById = (id) => {
  return DreamCollection.findById(id)
}

const getAllDreams = () => {
  return DreamCollection.find({})
}

const createDream = (newDream) => {
  return DreamCollection.create(newDream)
}

const updateDream = (id, updatedDream) => {
  return DreamCollection.updateOne({ _id: id }, updatedDream)
}

const deleteDream = (id) => {
  return DreamCollection.deleteOne({ _id: id })
}


module.exports = {
  getDreamById,
  getAllDreams,
  createDream,
  updateDream,
  deleteDream,
}
