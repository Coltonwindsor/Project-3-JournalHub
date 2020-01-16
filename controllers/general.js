const express = require('express')


const generalApi = require('../models/general.js')

const generalRouter = express.Router()

generalRouter.get('/', (req, res) => {
  generalApi.getAllGenerals()
    .then((allGenerals) => {
      res.json(allGenerals)
    })
    .catch((error) => {
      console.log(error)
      res.send(error)
    })
})

generalRouter.get('/:id', (req, res) => {
  const generalId = req.params.id

  generalApi.getGeneralById(generalId)
    .then((general) => {
      res.json(general)
    })
    .catch((error) => {
      console.log(error)
      res.send(error)
    })
})

generalRouter.post('/', (req, res) => {
  const newGeneral = req.body

  generalApi.createGeneral(newGeneral)
    .then(() => {
      res.json('general created')
    })
    .catch((error) => {
      console.log(error)
      res.send(error)
    })

})

generalRouter.put('/:id', (req, res) => {
  const generalId = req.params.id
  const generalData = req.body

  generalApi.updateGeneral(generalId, generalData)
    .then(() => {
      res.json('updated general')
    })
    .catch((error) => {
      console.log(error)
      res.send(error)
    })
})

generalRouter.delete('/:id', (req, res) => {
  const generalId = req.params.id

  generalApi.deleteGeneral(generalId)
    .then(() => {
      res.json("deleted")
    })
    .catch((error) => {
      console.log(error)
      res.send(error)
    })
})


module.exports = {
  generalRouter
}