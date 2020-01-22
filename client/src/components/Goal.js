import React, { Component } from 'react'
import exercises from "./exercises.js"
import axios from 'axios'

export default class Goal extends Component {
    state = {
        goals: [],
        completedGoals: [],
        showCompletedGoals: false,
        showExercises: true,
        showGoals: false,
    }

    componentDidMount() {
        this.getAllGoals()
    }

    getAllGoals = () => {
        axios.get('/api/exercise')
            .then((res) => {
                this.setState({ goals: res.data })
            })
            .then(this.checkForCompletedGoals)
    }

    checkForCompletedGoals = () => {
        let newState = { ...this.state }
        newState.completedGoals = []
        for (let i = 0; i < newState.goals.length; i++) {
            if (newState.goals[i].isComplete === true) {
                newState.completedGoals.push(newState.goals[i])
            }
        }
        this.setState(newState)
    }

    createGoal = (exercise) => {
        axios.post('/api/exercise', exercise)
            .then(() => {
                this.getAllGoals()
            })
    }

    deleteGoal = (goalId) => {
        axios.delete(`/api/exercise/${goalId}`)
            .then(this.getAllGoals)
    }

    toggleIsComplete = (goal) => {
        goal.isComplete = true
        axios.put(`/api/exercise/${goal._id}`, goal)
            .then(this.checkForCompletedGoals)
    }

    toggleIsCompleteToFalse = (goal) => {
        goal.isComplete = false
        axios.put(`/api/exercise/${goal._id}`, goal)
            .then(this.checkForCompletedGoals)
    }

    toggleShowCompletedGoals = () => {
        let newState = { ...this.state }
        newState.showCompletedGoals = !newState.showCompletedGoals
        this.setState(newState)
    }
    toggleShowGoals = () => {
        let newState = { ...this.state }
        newState.showGoals = !newState.showGoals
        this.setState(newState)
    }
    toggleShowExercises = () => {
        let newState = { ...this.state }
        newState.showExercises = !newState.showExercises
        this.setState(newState)
    }


    render() {
        const allExercises = exercises.map((exercise) => {
            return (
                <div>
                    <div className="singleExerciseContainer">{exercise.name}, {exercise.description}, {exercise.pointValue}</div>
                    <div className="addEntryButtonDiv"> <button className="addEntryButton" onClick={() => this.createGoal(exercise)}>Add to Goals</button> </div>
                </div>
            )
        })
        return (
            <div className="goalContainer">
                <div>
                    <h1>Exercises</h1>
                    <div className='addEntryButtonDiv'>
                        <button className="addEntryButton" onClick={this.toggleShowExercises}>Show Exercises</button>
                    </div>
                    {this.state.showExercises === true ?
                        <div className="allExercisesList">
                            {allExercises}
                        </div> : null}
                    <h1>Goals</h1>
                    <div className='addEntryButtonDiv'>
                        <button className="addEntryButton" onClick={this.toggleShowGoals}>Show Goals</button>
                    </div>
                    {this.state.showGoals === true ?
                        <div className="allGoalsList">
                            {this.state.goals.map((goal) => {
                                if (goal.isComplete === false) {
                                    return (
                                        < div >
                                            <div className="singleGoalContainer">
                                                {goal.name}, {goal.description}, {goal.pointValue}
                                            </div>
                                            <div className="addEntryButtonDiv">
                                                <button className="addEntryButton" onClick={() => this.deleteGoal(goal._id)}>
                                                    Remove Goal
                                        </button>
                                                <button className="addEntryButton" onClick={() => this.toggleIsComplete(goal)}>
                                                    Complete Goal
                                        </button>
                                            </div>
                                        </div>
                                    )
                                }
                            })}
                        </div> : null}
                </div>
                <div>
                    <h1>Completed Goals : {this.state.completedGoals.length}</h1>
                    <div className='addEntryButtonDiv'>
                        <button className="addEntryButton" onClick={this.toggleShowCompletedGoals}>Show Completed Goals</button>
                    </div>
                    <div>
                        {this.state.showCompletedGoals === true ?
                            <div className="allGoalsList">
                                {this.state.goals.map((goal) => {

                                    if (goal.isComplete === true) {
                                        return (
                                            <div>
                                                <div className="singleGoalContainer">
                                                    <div>
                                                        {goal.name}, {goal.description}
                                                    </div>
                                                </div>
                                                <div className="addEntryButtonDiv">
                                                    <button className="addEntryButton" onClick={() => this.toggleIsCompleteToFalse(goal)}>
                                                        Move back to goals
                                                    </button>
                                                </div>
                                            </div>
                                        )
                                    }
                                })}
                            </div> : null}
                    </div>
                </div>

            </div >
        )
    }
}
