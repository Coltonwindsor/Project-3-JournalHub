const mongoose = require('./connection.js')

const ColtonSchema = new mongoose.Schema({
  name: String,
  description: String,
})

const ColtonCollection = mongoose.model('colton', ColtonSchema)

const getColtonById = (id) => {
  return ColtonCollection.findById(id)
}

const getAllColtons = () => {
  return ColtonCollection.find({})
}

const createColton = (newColton) => {
  return ColtonCollection.create(newColton)
}

const updateColton = (id, updatedColton) => {
  return ColtonCollection.updateOne({ _id: id }, updatedColton)
}

const deleteColton = (id) => {
  return ColtonCollection.deleteOne({ _id: id })
}


module.exports = {
  getColtonById,
  getAllColtons,
  createColton,
  updateColton,
  deleteColton,
}
