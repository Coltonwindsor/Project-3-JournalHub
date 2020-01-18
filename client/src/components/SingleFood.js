import React, { Component } from 'react'
import axios from "axios"
import { Redirect } from 'react-router-dom'


export default class SingleFood extends Component {
    state = {
        food: {
            date: '',
            breakfast: '',
            breakfastCal: 0,
            lunch: '',
            lunchCal: 0,
            dinner: '',
            dinnerCal: 0,
            snacks: '',
            snackCal: 0
        },
        redirect: false,
        updateFormInvisable: false
    }

    componentDidMount() {
        axios.get(`/api/food/${this.props.match.params.foodId}`)
            .then((res) => {
                this.setState({ food: res.data })
            })
    }

    onChange = (evt) => {
        const value = evt.target.value
        const name = evt.target.name
        const copyOfState = { ...this.state }
        copyOfState.food[name] = value
        this.setState(copyOfState)
    }


    onSubmit = (evt) => {
        evt.preventDefault()
        axios.put(`/api/food/${this.props.match.params.foodId}`, this.state.food)
            .then(() => {
                this.setState({ redirect: true })
            })
    }

    toggleUpdateForm = () => {
        const toggle = !this.state.updateFormInvisable
        this.setState({ updateFormInvisable: toggle })
    }
    deleteFood = () => {
        axios.delete(`/api/food/${this.props.match.params.foodId}`)
            .then(() => {
                this.setState({ redirect: true })
            })
    }

    render() {
        return (
            <div>
                {this.state.redirect === true ? <Redirect to='/food' /> : null}
                <h1>Single Food Page </h1>
                {this.state.updateFormInvisable === false ?
                    (<div>
                        <div>{this.state.food.date}</div>

                        <div>Breakfast: {this.state.food.breakfast} - {this.state.food.breakfastCal} Calories</div>

                        <div>Lunch: {this.state.food.lunch} - {this.state.food.lunchCal} Calories</div>

                        <div>Dinner: {this.state.food.dinner} - {this.state.food.dinnerCal} Calories</div>

                        <div>Snacks: {this.state.food.snacks} - {this.state.food.snackCal} Calories</div>

                        <div>Total Calories: {this.state.food.breakfastCal + this.state.food.lunchCal + this.state.food.dinnerCal + this.state.food.snackCal} </div>
                        <button onClick={this.toggleUpdateForm}>Edit Entry</button>
                    </div>)
                    : null}
                {this.state.updateFormInvisable === true ?
                    <div>
                        <form onSubmit={this.onSubmit}>
                            <input
                                type='date'
                                placeholder='date'
                                name='date'
                                onChange={this.onChange}
                                value={this.state.food.date}
                            />
                            <input
                                type='text'
                                placeholder='breakfast'
                                name='breakfast'
                                onChange={this.onChange}
                                value={this.state.food.breakfast}
                            />
                            <input
                                type='number'
                                placeholder="breakfast calories"
                                name='breakfastCal'
                                onChange={this.onChange}
                                value={this.state.food.breakfastCal}
                            />
                            <input
                                type='text'
                                placeholder='lunch'
                                name='lunch'
                                onChange={this.onChange}
                                value={this.state.food.lunch}
                            />
                            <input
                                type='number'
                                placeholder='lunch calories'
                                name='lunchCal'
                                onChange={this.onChange}
                                value={this.state.food.lunchCal}
                            />
                            <input
                                type='text'
                                placeholder='dinner'
                                name='dinner'
                                onChange={this.onChange}
                                value={this.state.food.dinner}
                            />
                            <input
                                type='number'
                                placeholder='dinner calories'
                                name='dinnerCal'
                                onChange={this.onChange}
                                value={this.state.food.dinnerCal}
                            />
                            <input
                                type='text'
                                placeholder='snacks'
                                name='snacks'
                                onChange={this.onChange}
                                value={this.state.food.snacks}
                            />
                            <input
                                type='number'
                                placeholde='snack calories'
                                name='snackCal'
                                onChange={this.onChange}
                                value={this.state.food.snackCal}
                            />
                            <input type="submit"
                                value="Update Food" />
                        </form>
                    </div> : null}
                <button onClick={this.deleteFood}>Delete Food</button>
            </div>
        )
    }
}
