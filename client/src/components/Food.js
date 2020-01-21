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
        },
        addFoodInvisable: false
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
                this.toggleAddFoodForm()
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
    toggleAddFoodForm = () => {
        const toggle = !this.state.addFoodInvisable;
        this.setState({ addFoodInvisable: toggle })
    }

    render() {

        const allFoods = this.state.foods.map((food) => {
            return (
                <Link to={`/food/${food._id}`}>
                    <div className="singleFoodContainer">
                        {food.date} - Total Calories: {food.breakfastCal + food.lunchCal + food.dinnerCal + food.snackCal}
                    </div>
                </Link>)
        })

        return (
            <div className="foodContainer">
                <h1>Food Journal</h1>
                {this.state.addFoodInvisable === false ?
                    <div className='addEntryButtonDiv'>
                        <button className="addEntryButton"
                            onClick={this.toggleAddFoodForm}>
                            Add Food Journal Entry
                       </button>
                    </div> :
                    <div className="addEntryButtonDiv">
                        <button
                            className="addEntryButton"
                            onClick={this.toggleAddFoodForm}>
                            Back
                            </button>
                    </div>}
                {this.state.addFoodInvisable === false
                    ?
                    <div className="foodList">
                        {allFoods}
                    </div> : null}
                {this.state.addFoodInvisable === true ? (
                    <div>

                        <form onSubmit={this.onSubmit}>
                            <div className="inputBoxDiv">
                                <input
                                    type='date'
                                    placeholder='date'
                                    name='date'
                                    onChange={this.onChange}
                                    vlaue={this.state.newFood.date}
                                >
                                </input>
                            </div>
                            <div className="inputBoxDiv">
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
                            </div>
                            <div className="inputBoxDiv">
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
                            </div>
                            <div className="inputBoxDiv">
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
                            </div>
                            <div className="inputBoxDiv">
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
                            </div>
                            <div className="inputBoxDiv">
                                <input type="submit" vlaue="Create a Food"></input>
                            </div>
                        </form>
                    </div>) : null}

            </div>
        )
    }
}