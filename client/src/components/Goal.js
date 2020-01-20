import React, { Component } from 'react'
import exercises from "./exercises.js"

export default class Goal extends Component {
    render() {
        const allExercises = exercises.map((exercise) => {
            return (
                <div>{exercise.name}, {exercise.description}, {exercise.image}, {exercise.pointValue}</div>
            )
        })
        return (
            <div>
                {allExercises}
            </div>
        )
    }
}
