import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default class General extends Component {
    state = {
        generals: [],
        newGeneral: {
            date: '',
            title: '',
            entry: ''
        }
    }
    componentDidMount() {
        axios.get('/api/general')
            .then((res) => {
                this.setState({ generals: res.data })
            })
    }
    reloadGeneralList() {
        axios.get('/api/general')
            .then((res) => {
                this.setState({ generals: res.data })
            })
    }
    onChange = (evt) => {
        const value = evt.target.value
        const name = evt.target.name
        const copyOfState = { ...this.state }
        copyOfState.newGeneral[name] = value
        this.setState(copyOfState)
    }
    onSubmit = (evt) => {
        evt.preventDefault()
        axios.post('/api/general', this.state.newGeneral)
            .then(() => {
                this.reloadGeneralList()
                const copyOfState = { ...this.state }
                copyOfState.newGeneral = {
                    name: '',
                    description: ''
                }
                this.setState(copyOfState)
            })
    }

    render() {
        return (
            <div>
                <h1>General Thoughts Journal</h1>
                <form onSubmit={this.onSubmit}>
                    <input
                        type='date'
                        placeholder='date'
                        name='date'
                        onChange={this.onChange}
                        vlaue={this.state.newGeneral.name}
                    >
                    </input>
                    <input
                        type='text'
                        placeholder='title'
                        name='title'
                        onChange={this.onChange}
                        vlaue={this.state.newGeneral.name}
                    >
                    </input>
                    <input
                        type='text'
                        placeholder='entry'
                        name='entry'
                        onChange={this.onChange}
                        vlaue={this.state.newGeneral.description}
                    >
                    </input>
                    <input type="submit" vlaue="Create a General"></input>
                </form>
                {this.state.generals.map((general) => {
                    return (<Link to={`/general/${general._id}`}>
                        <div>{general.date}, {general.title}</div>
                    </Link>)
                })}
            </div>
        )
    }
}
