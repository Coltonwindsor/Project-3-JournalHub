import React, { Component } from 'react'
import axios from "axios"
import { Redirect } from 'react-router-dom'


export default class SingleGeneral extends Component {
    state = {
        general: {
            name: '',
            description: ''
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
                {this.state.redirect === true ? <Redirect to='/' /> : null}
                <h1>Single General Thought Page </h1>
                <div>{this.state.general.name}</div>
                <div>{this.state.general.description}</div>
                <form onSubmit={this.onSubmit}>
                    <input onChange={this.onChange}
                        type="text"
                        name="name"
                        placeholder='name'
                        value={this.state.general.name} />
                    <input onChange={this.onChange}
                        type="text"
                        name="description"
                        placeholder='description'
                        value={this.state.general.description} />

                    <input type="submit"
                        value="Update General" />
                </form>
                <button onClick={this.deleteGeneral}>Delete Entry</button>
            </div>
        )
    }
}