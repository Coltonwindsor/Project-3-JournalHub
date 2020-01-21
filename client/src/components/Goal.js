import React, { Component } from 'react'
import exercises from "./exercises.js"
import axios from 'axios'

export default class Goal extends Component {
    state = {
        currentPoints: 0,
        goals: []
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
                <div className="allExercisesList">
                    {allExercises}
                </div>
                <div>
                    <h1>Goals</h1>
                    {this.state.goals.map((goal) => {
                        return (
                            <div>{goal.name}, {goal.description}, {goal.image}, {goal.pointValue}</div>
                        )
                    })}
                </div>

            </div>
        )
    }
}
