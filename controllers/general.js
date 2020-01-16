const express = require('express')


const coltonApi = require('../models/colton.js')

const coltonRouter = express.Router()

coltonRouter.get('/', (req, res) => {
  coltonApi.getAllColtons()
    .then((allColtons) => {
      res.json(allColtons)
    })
    .catch((error) => {
      console.log(error)
      res.send(error)
    })
})

coltonRouter.get('/:id', (req, res) => {
  const coltonId = req.params.id

  coltonApi.getColtonById(coltonId)
    .then((colton) => {
      res.json(colton)
    })
    .catch((error) => {
      console.log(error)
      res.send(error)
    })
})

coltonRouter.post('/', (req, res) => {
  const newColton = req.body

  coltonApi.createColton(newColton)
    .then(() => {
      res.json('colton created')
    })
    .catch((error) => {
      console.log(error)
      res.send(error)
    })

})

coltonRouter.put('/:id', (req, res) => {
  const coltonId = req.params.id
  const coltonData = req.body

  coltonApi.updateColton(coltonId, coltonData)
    .then(() => {
      res.json('updated colton')
    })
    .catch((error) => {
      console.log(error)
      res.send(error)
    })
})

coltonRouter.delete('/:id', (req, res) => {
  const coltonId = req.params.id

  coltonApi.deleteColton(coltonId)
    .then(() => {
      res.json("deleted")
    })
    .catch((error) => {
      console.log(error)
      res.send(error)
    })
})


module.exports = {
  coltonRouter
}