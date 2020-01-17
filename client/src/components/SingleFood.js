import React, { Component } from 'react'
import axios from "axios"
import { Redirect } from 'react-router-dom'


export default class SingleFood extends Component {
    state = {
        food: {
            name: '',
            description: ''
        },
        redirect: false
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
    deleteFood = () => {
        axios.delete(`/api/food/${this.props.match.params.foodId}`)
            .then(() => {
                this.setState({ redirect: true })
            })
    }

    render() {
        return (
            <div>
                {this.state.redirect === true ? <Redirect to='/' /> : null}
                <h1>Single Food Page </h1>
                <div>{this.state.food.name}</div>
                <div>{this.state.food.description}</div>
                <form onSubmit={this.onSubmit}>
                    <input onChange={this.onChange}
                        type="text"
                        name="name"
                        placeholder='name'
                        value={this.state.food.name} />
                    <input onChange={this.onChange}
                        type="text"
                        name="description"
                        placeholder='description'
                        value={this.state.food.description} />

                    <input type="submit"
                        value="Update Food" />
                </form>
                <button onClick={this.deleteFood}>Delete Food</button>
            </div>
        )
    }
}
