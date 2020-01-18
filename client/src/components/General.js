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
        },
        addGeneralInvisable: false
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
                this.toggleAddGeneralForm()
                const copyOfState = { ...this.state }
                copyOfState.newGeneral = {
                    date: '',
                    title: '',
                    entry: ''
                }
                this.setState(copyOfState)
            })
    }
    toggleAddGeneralForm = () => {
        const toggle = !this.state.addGeneralInvisable;
        this.setState({ addGeneralInvisable: toggle })
    }

    render() {
        const allGeneral = this.state.generals.map((general) => {
            return (<Link to={`/general/${general._id}`}>
                <div>{general.date}, {general.title}</div>
            </Link>)
        })
        return (
            <div>
                <h1>General Thoughts Journal</h1>
                {this.state.addGeneralInvisable === false ? allGeneral : null}
                {this.state.addGeneralInvisable === true ?
                    (<div>
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
                    </div>) : null}
                <button onClick={this.toggleAddGeneralForm}>Add Entry</button>
            </div>
        )
    }
}
