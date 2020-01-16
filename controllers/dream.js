const express = require('express')


const dreamApi = require('../models/dream.js')

const dreamRouter = express.Router()

dreamRouter.get('/', (req, res) => {
  dreamApi.getAllDreams()
    .then((allDreams) => {
      res.json(allDreams)
    })
    .catch((error) => {
      console.log(error)
      res.send(error)
    })
})

dreamRouter.get('/:id', (req, res) => {
  const dreamId = req.params.id

  dreamApi.getDreamById(dreamId)
    .then((dream) => {
      res.json(dream)
    })
    .catch((error) => {
      console.log(error)
      res.send(error)
    })
})

dreamRouter.post('/', (req, res) => {
  const newDream = req.body

  dreamApi.createDream(newDream)
    .then(() => {
      res.json('dream created')
    })
    .catch((error) => {
      console.log(error)
      res.send(error)
    })

})

dreamRouter.put('/:id', (req, res) => {
  const dreamId = req.params.id
  const dreamData = req.body

  dreamApi.updateDream(dreamId, dreamData)
    .then(() => {
      res.json('updated dream')
    })
    .catch((error) => {
      console.log(error)
      res.send(error)
    })
})

dreamRouter.delete('/:id', (req, res) => {
  const dreamId = req.params.id

  dreamApi.deleteDream(dreamId)
    .then(() => {
      res.json("deleted")
    })
    .catch((error) => {
      console.log(error)
      res.send(error)
    })
})


module.exports = {
  dreamRouter
}