import React, { Component } from 'react'
import axios from "axios"
import { Redirect } from 'react-router-dom'


export default class SingleDream extends Component {
    state = {
        dream: {
            date: '',
            category: '',
            description: ''
        },
        redirect: false
    }
    componentDidMount() {
        axios.get(`/api/dream/${this.props.match.params.dreamId}`)
            .then((res) => {
                this.setState({ dream: res.data })
            })
    }

    onChange = (evt) => {
        const value = evt.target.value
        const name = evt.target.name
        const copyOfState = { ...this.state }
        copyOfState.dream[name] = value
        this.setState(copyOfState)
    }

    onSubmit = (evt) => {
        evt.preventDefault()
        axios.put(`/api/dream/${this.props.match.params.dreamId}`, this.state.dream)
            .then(() => {
                this.setState({ redirect: true })
            })
    }
    deleteDream = () => {
        axios.delete(`/api/dream/${this.props.match.params.dreamId}`)
            .then(() => {
                this.setState({ redirect: true })
            })
    }

    render() {
        return (
            <div>
                {this.state.redirect === true ? <Redirect to='/dream' /> : null}
                <h1>Single Dream Page </h1>
                <div>{this.state.dream.date}</div>
                <div>{this.state.dream.category}</div>
                <div>{this.state.dream.description}</div>
                <form onSubmit={this.onSubmit}>
                    <input onChange={this.onChange}
                        type="date"
                        name="date"
                        placeholder='date'
                        value={this.state.dream.date} />
                    <input onChange={this.onChange}
                        type="text"
                        name="category"
                        placeholder='category'
                        value={this.state.dream.category} />
                    <input onChange={this.onChange}
                        type="text"
                        name="description"
                        placeholder='description'
                        value={this.state.dream.description} />

                    <input type="submit"
                        value="Update Dream" />
                </form>
                <button onClick={this.deleteDream}>Delete Dream</button>
            </div>
        )
    }
}
