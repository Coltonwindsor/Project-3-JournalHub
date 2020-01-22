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
            <div className="foodContainer">
                {this.state.redirect === true ? <Redirect to='/food' /> : null}
                <h1>{this.state.food.date}</h1>
                <div className="addEntryButtonDiv">
                    <button className="addEntryButton" onClick={this.toggleUpdateForm}>Edit Entry</button>
                    <button className="addEntryButton" onClick={this.deleteFood}>Delete Food</button>
                </div>
                {this.state.updateFormInvisable === false ?
                    (<div>
                        <div className="singleFoodEntryContainer">
                            <div className="entryText">{this.state.food.date}</div>

                            <div className="entryText">Breakfast: {this.state.food.breakfast} - {this.state.food.breakfastCal} Calories</div>

                            <div className="entryText">Lunch: {this.state.food.lunch} - {this.state.food.lunchCal} Calories</div>

                            <div className="entryText">Dinner: {this.state.food.dinner} - {this.state.food.dinnerCal} Calories</div>

                            <div className="entryText">Snacks: {this.state.food.snacks} - {this.state.food.snackCal} Calories</div>

                            <div className="entryText">Total Calories: {this.state.food.breakfastCal + this.state.food.lunchCal + this.state.food.dinnerCal + this.state.food.snackCal} </div>
                        </div>
                    </div>)
                    : null}
                {this.state.updateFormInvisable === true ?
                    <div>
                        <form onSubmit={this.onSubmit}>
                            <div className='inputBoxDiv'>
                                <input
                                    type='date'
                                    placeholder='date'
                                    name='date'
                                    onChange={this.onChange}
                                    value={this.state.food.date}
                                />
                            </div>
                            <div className='inputBoxDiv'>
                                <input className="foodUpdateInput"
                                    type='text'
                                    placeholder='breakfast'
                                    name='breakfast'
                                    onChange={this.onChange}
                                    value={this.state.food.breakfast}
                                />
                                <input className="foodUpdateInput"
                                    type='number'
                                    placeholder="breakfast calories"
                                    name='breakfastCal'
                                    onChange={this.onChange}
                                    value={this.state.food.breakfastCal}
                                />
                            </div>
                            <div className='inputBoxDiv'>
                                <input className="foodUpdateInput"
                                    type='text'
                                    placeholder='lunch'
                                    name='lunch'
                                    onChange={this.onChange}
                                    value={this.state.food.lunch}
                                />
                                <input className="foodUpdateInput"
                                    type='number'
                                    placeholder='lunch calories'
                                    name='lunchCal'
                                    onChange={this.onChange}
                                    value={this.state.food.lunchCal}
                                />
                            </div>
                            <div className='inputBoxDiv'>
                                <input className="foodUpdateInput"
                                    type='text'
                                    placeholder='dinner'
                                    name='dinner'
                                    onChange={this.onChange}
                                    value={this.state.food.dinner}
                                />
                                <input className="foodUpdateInput"
                                    type='number'
                                    placeholder='dinner calories'
                                    name='dinnerCal'
                                    onChange={this.onChange}
                                    value={this.state.food.dinnerCal}
                                />
                            </div >
                            <div className='inputBoxDiv'>
                                <input className="foodUpdateInput"
                                    type='text'
                                    placeholder='snacks'
                                    name='snacks'
                                    onChange={this.onChange}
                                    value={this.state.food.snacks}
                                />
                                <input className="foodUpdateInput"
                                    type='number'
                                    placeholde='snack calories'
                                    name='snackCal'
                                    onChange={this.onChange}
                                    value={this.state.food.snackCal}
                                />
                            </div>
                            <div className='inputBoxDiv'>
                                <input type="submit"
                                    value="Update Food" />
                            </div>
                        </form>
                    </div> : null}

            </div>
        )
    }
}
