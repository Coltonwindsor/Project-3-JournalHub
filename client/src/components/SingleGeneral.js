import React, { Component } from 'react'
import axios from "axios"
import { Redirect } from 'react-router-dom'


export default class SingleGeneral extends Component {
    state = {
        general: {
            date: '',
            title: '',
            entry: ''
        },
        redirect: false
    }
    componentDidMount() {
        axios.get(`/api/general/${this.props.match.params.generalId}`)
            .then((res) => {
                this.setState({ general: res.data })
            })
    }

    onChange = (evt) => {
        const value = evt.target.value
        const name = evt.target.name
        const copyOfState = { ...this.state }
        copyOfState.general[name] = value
        this.setState(copyOfState)
    }

    onSubmit = (evt) => {
        evt.preventDefault()
        axios.put(`/api/general/${this.props.match.params.generalId}`, this.state.general)
            .then(() => {
                this.setState({ redirect: true })
            })
    }
    deleteGeneral = () => {
        axios.delete(`/api/general/${this.props.match.params.generalId}`)
            .then(() => {
                this.setState({ redirect: true })
            })
    }

    render() {
        return (
            <div>
                {this.state.redirect === true ? <Redirect to='/general' /> : null}
                <h1>Single General Thought Page </h1>
                <div>{this.state.general.date}</div>
                <div>{this.state.general.title}</div>
                <div>{this.state.general.entry}</div>
                <form onSubmit={this.onSubmit}>
                    <input onChange={this.onChange}
                        type="date"
                        name="date"
                        placeholder='date'
                        value={this.state.general.date} />
                    <input onChange={this.onChange}
                        type="text"
                        name="title"
                        placeholder='title'
                        value={this.state.general.title} />
                    <input onChange={this.onChange}
                        type="text"
                        name="entry"
                        placeholder='entry'
                        value={this.state.general.entry} />

                    <input type="submit"
                        value="Update Entry" />
                </form>
                <button onClick={this.deleteGeneral}>Delete Entry</button>
            </div>
        )
    }
}