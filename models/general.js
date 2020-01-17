const mongoose = require('./connection.js')

const GeneralSchema = new mongoose.Schema({
  date: String,
  title: String,
  entry: String,
})

const GeneralCollection = mongoose.model('general', GeneralSchema)

const getGeneralById = (id) => {
  return GeneralCollection.findById(id)
}

const getAllGenerals = () => {
  return GeneralCollection.find({})
}

const createGeneral = (newGeneral) => {
  return GeneralCollection.create(newGeneral)
}

const updateGeneral = (id, updatedGeneral) => {
  return GeneralCollection.updateOne({ _id: id }, updatedGeneral)
}

const deleteGeneral = (id) => {
  return GeneralCollection.deleteOne({ _id: id })
}


module.exports = {
  getGeneralById,
  getAllGenerals,
  createGeneral,
  updateGeneral,
  deleteGeneral,
}
