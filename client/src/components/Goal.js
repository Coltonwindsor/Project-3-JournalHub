import React, { Component } from 'react'
import exercises from "./exercises.js"
import axios from 'axios'

export default class Goal extends Component {
    state = {
        currentPoints: 0,
        goals: [],
        completed: []
    }

    componentDidMount() {
        this.getAllGoals()
    }

    getAllGoals = () => {
        axios.get('/api/exercise')
            .then((res) => {
                this.setState({ goals: res.data })
            })
    }
    createGoal = (exercise) => {
        axios.post('/api/exercise', exercise)
            .then(() => {
                this.getAllGoals()
            })
    }

    //Need Work on these functions --------------------------------------------

    deleteGoal = (goalId) => {
        console.log('goalId', goalId)
        axios.delete(`/api/exercise/${goalId}`)
            .then(this.getAllGoals)
    }

    //update goals list and add to completed list
    // completeGoal = (evt) => {
    //     axios.put(`/api/exercise/${}`, this.state.goal)
    // }

    createCompletedGoal = (completedGoal) => {
        axios.post(`/api/exercise`, completedGoal)
            .then((res) => {
                this.setState({ completed: res.data })
            })
    }

    // ------------------------------------------------------------------------



    render() {
        const allExercises = exercises.map((exercise) => {
            return (
                <div>{exercise.name}, {exercise.description}, {exercise.image}, {exercise.pointValue}
                    <button onClick={() => this.createGoal(exercise)}>Add to Goals</button>
                </div>
            )
        })
        return (
            <div className="goalContainer">
                <div>
                    <h1>Exercises</h1>
                    <div className="allExercisesList">
                        {allExercises}
                    </div>
                    <h1>Goals</h1>
                    {this.state.goals.map((goal) => {
                        return (
                            <div>
                                <div>
                                    {goal.name}, {goal.description}, {goal.image}, {goal.pointValue}
                                </div>
                                <div>
                                    <button onClick={() => this.deleteGoal(goal._id)}>
                                        Remove Goal
                                    </button>
                                    <button onClick={this.completeGoal}>
                                        Complete Goal
                                    </button>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div>
                    <h1>Completed Goals</h1>
                    {this.state.completed.map((completedGoal) => {
                        return (
                            <div>
                                <div>
                                    {completedGoal.name}, {completedGoal.image}, {completedGoal.description}
                                </div>
                                <div>
                                    <button>
                                        Remove Goal
                                </button>
                                </div>
                            </div>
                        )
                    })}
                </div>

            </div>
        )
    }
}
