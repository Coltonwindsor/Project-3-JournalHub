const express = require('express')


const goalApi = require('../models/goal.js')

const goalRouter = express.Router()

goalRouter.get('/', (req, res) => {
  goalApi.getAllGoals()
    .then((allGoals) => {
      res.json(allGoals)
    })
    .catch((error) => {
      console.log(error)
      res.send(error)
    })
})

goalRouter.get('/:id', (req, res) => {
  const goalId = req.params.id

  goalApi.getGoalById(goalId)
    .then((goal) => {
      res.json(goal)
    })
    .catch((error) => {
      console.log(error)
      res.send(error)
    })
})

goalRouter.post('/', (req, res) => {
  const newGoal = req.body

  goalApi.createGoal(newGoal)
    .then(() => {
      res.json('goal created')
    })
    .catch((error) => {
      console.log(error)
      res.send(error)
    })

})

goalRouter.put('/:id', (req, res) => {
  const goalId = req.params.id
  const goalData = req.body

  goalApi.updateGoal(goalId, goalData)
    .then(() => {
      res.json('updated goal')
    })
    .catch((error) => {
      console.log(error)
      res.send(error)
    })
})

goalRouter.delete('/:id', (req, res) => {
  const goalId = req.params.id

  goalApi.deleteGoal(goalId)
    .then(() => {
      res.json("deleted")
    })
    .catch((error) => {
      console.log(error)
      res.send(error)
    })
})


module.exports = {
  goalRouter
}