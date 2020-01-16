const express = require('express')


const foodApi = require('../models/food.js')

const foodRouter = express.Router()

foodRouter.get('/', (req, res) => {
  foodApi.getAllFoods()
    .then((allFoods) => {
      res.json(allFoods)
    })
    .catch((error) => {
      console.log(error)
      res.send(error)
    })
})

foodRouter.get('/:id', (req, res) => {
  const foodId = req.params.id

  foodApi.getFoodById(foodId)
    .then((food) => {
      res.json(food)
    })
    .catch((error) => {
      console.log(error)
      res.send(error)
    })
})

foodRouter.post('/', (req, res) => {
  const newFood = req.body

  foodApi.createFood(newFood)
    .then(() => {
      res.json('food created')
    })
    .catch((error) => {
      console.log(error)
      res.send(error)
    })

})

foodRouter.put('/:id', (req, res) => {
  const foodId = req.params.id
  const foodData = req.body

  foodApi.updateFood(foodId, foodData)
    .then(() => {
      res.json('updated food')
    })
    .catch((error) => {
      console.log(error)
      res.send(error)
    })
})

foodRouter.delete('/:id', (req, res) => {
  const foodId = req.params.id

  foodApi.deleteFood(foodId)
    .then(() => {
      res.json("deleted")
    })
    .catch((error) => {
      console.log(error)
      res.send(error)
    })
})


module.exports = {
  foodRouter
}