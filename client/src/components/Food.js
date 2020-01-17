import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default class Food extends Component {
    state = {
        foods: [],
        newFood: {
            name: '',
            description: ''
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
                    name: '',
                    description: ''
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
                        type='text'
                        placeholder='name'
                        name='name'
                        onChange={this.onChange}
                        vlaue={this.state.newFood.name}
                    >
                    </input>
                    <input
                        type='text'
                        placeholder='description'
                        name='description'
                        onChange={this.onChange}
                        vlaue={this.state.newFood.description}
                    >
                    </input>
                    <input type="submit" vlaue="Create a Food"></input>
                </form>
                {this.state.foods.map((food) => {
                    return (<Link to={`/food/${food._id}`}>
                        <div>{food.name}</div>
                    </Link>)
                })}
            </div>
        )
    }
}