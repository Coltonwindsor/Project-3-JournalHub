import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default class Food extends Component {
    state = {
        foods: [],
        newFood: {
            date: '',
            breakfast: '',
            breakfastCal: 0,
            lunch: '',
            lunchCal: 0,
            dinner: '',
            dinnerCal: 0,
            snacks: '',
            snackCal: 0
        }
    }
    componentDidMount() {
        axios.get('/api/food')
            .then((res) => {
                this.setState({ foods: res.data })
            })
    }
    reloadFoodList() {
        axios.get('/api/food')
            .then((res) => {
                this.setState({ foods: res.data })
            })
    }
    onChange = (evt) => {
        const value = evt.target.value
        const name = evt.target.name
        const copyOfState = { ...this.state }
        copyOfState.newFood[name] = value
        this.setState(copyOfState)
    }
    onSubmit = (evt) => {
        evt.preventDefault()
        axios.post('/api/food', this.state.newFood)
            .then(() => {
                this.reloadFoodList()
                const copyOfState = { ...this.state }
                copyOfState.newFood = {
                    date: '',
                    breakfast: '',
                    breakfastCal: 0,
                    lunch: '',
                    lunchCal: 0,
                    dinner: '',
                    dinnerCal: 0,
                    snacks: '',
                    snackCal: 0
                }
                this.setState(copyOfState)
            })
    }

    render() {
        return (
            <div>
                <h1>Food Journal</h1>
                <form onSubmit={this.onSubmit}>
                    <input
                        type='date'
                        placeholder='date'
                        name='date'
                        onChange={this.onChange}
                        vlaue={this.state.newFood.date}
                    >
                    </input>
                    <input
                        type='text'
                        placeholder='breakfast'
                        name='breakfast'
                        onChange={this.onChange}
                        vlaue={this.state.newFood.breakfast}
                    >
                    </input>
                    <input
                        type='number'
                        placeholder='breakfast calories'
                        name='breakfastCal'
                        onChange={this.onChange}
                        vlaue={this.state.newFood.breakfastCal}
                    >
                    </input>
                    <input
                        type='text'
                        placeholder='lunch'
                        name='lunch'
                        onChange={this.onChange}
                        vlaue={this.state.newFood.lunch}
                    >
                    </input>
                    <input
                        type='number'
                        placeholder='lunch calories'
                        name='lunchCal'
                        onChange={this.onChange}
                        vlaue={this.state.newFood.lunchCal}
                    >
                    </input>
                    <input
                        type='text'
                        placeholder='dinner'
                        name='dinner'
                        onChange={this.onChange}
                        vlaue={this.state.newFood.dinner}
                    >
                    </input>
                    <input
                        type='number'
                        placeholder='dinner calories'
                        name='dinnerCal'
                        onChange={this.onChange}
                        vlaue={this.state.newFood.dinnerCal}
                    >
                    </input>
                    <input
                        type='text'
                        placeholder='snacks'
                        name='snacks'
                        onChange={this.onChange}
                        vlaue={this.state.newFood.snacks}
                    >
                    </input>
                    <input
                        type='number'
                        placeholder='snack calories'
                        name='snackCal'
                        onChange={this.onChange}
                        vlaue={this.state.newFood.snackCal}
                    >
                    </input>

                    <input type="submit" vlaue="Create a Food"></input>
                </form>
                {this.state.foods.map((food) => {
                    return (<Link to={`/food/${food._id}`}>
                        <div>{food.date} - Total Calories: {food.breakfastCal + food.lunchCal + food.dinnerCal + food.snackCal}</div>
                    </Link>)
                })}
            </div>
        )
    }
}