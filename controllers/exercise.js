const express = require('express')


const exerciseApi = require('../models/exercise.js')

const exerciseRouter = express.Router()

exerciseRouter.get('/', (req, res) => {
  exerciseApi.getAllExercises()
    .then((allExercises) => {
      res.json(allExercises)
    })
    .catch((error) => {
      console.log(error)
      res.send(error)
    })
})

exerciseRouter.get('/:id', (req, res) => {
  const exerciseId = req.params.id

  exerciseApi.getExerciseById(exerciseId)
    .then((exercise) => {
      res.json(exercise)
    })
    .catch((error) => {
      console.log(error)
      res.send(error)
    })
})

exerciseRouter.post('/', (req, res) => {
  const newExercise = req.body

  exerciseApi.createExercise(newExercise)
    .then(() => {
      res.json('exercise created')
    })
    .catch((error) => {
      console.log(error)
      res.send(error)
    })

})

exerciseRouter.put('/:id', (req, res) => {
  const exerciseId = req.params.id
  const exerciseData = req.body

  exerciseApi.updateExercise(exerciseId, exerciseData)
    .then(() => {
      res.json('updated exercise')
    })
    .catch((error) => {
      console.log(error)
      res.send(error)
    })
})

exerciseRouter.delete('/:id', (req, res) => {
  const exerciseId = req.params.id

  exerciseApi.deleteExercise(exerciseId)
    .then(() => {
      res.json("deleted")
    })
    .catch((error) => {
      console.log(error)
      res.send(error)
    })
})


module.exports = {
  exerciseRouter
}