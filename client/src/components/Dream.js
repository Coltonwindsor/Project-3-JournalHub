import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default class Dream extends Component {
    state = {
        dreams: [],
        newDream: {
            name: '',
            description: ''
        }
    }
    componentDidMount() {
        axios.get('/api/dream')
            .then((res) => {
                this.setState({ dreams: res.data })
            })
    }
    reloadDreamList() {
        axios.get('/api/dream')
            .then((res) => {
                this.setState({ dreams: res.data })
            })
    }
    onChange = (evt) => {
        const value = evt.target.value
        const name = evt.target.name
        const copyOfState = { ...this.state }
        copyOfState.newDream[name] = value
        this.setState(copyOfState)
    }
    onSubmit = (evt) => {
        evt.preventDefault()
        axios.post('/api/dream', this.state.newDream)
            .then(() => {
                this.reloadDreamList()
                const copyOfState = { ...this.state }
                copyOfState.newDream = {
                    name: '',
                    description: ''
                }
                this.setState(copyOfState)
            })
    }

    render() {
        return (
            <div>
                <h1>Dream Journal</h1>
                <form onSubmit={this.onSubmit}>
                    <input
                        type='text'
                        placeholder='name'
                        name='name'
                        onChange={this.onChange}
                        vlaue={this.state.newDream.name}
                    >
                    </input>
                    <input
                        type='text'
                        placeholder='name'
                        name='description'
                        onChange={this.onChange}
                        vlaue={this.state.newDream.description}
                    >
                    </input>
                    <input type="submit" vlaue="Create a Dream"></input>
                </form>
                {this.state.dreams.map((dream) => {
                    return (<Link to={`/${dream._id}`}>
                        <div>{dream.name}</div>
                    </Link>)
                })}
            </div>
        )
    }
}
