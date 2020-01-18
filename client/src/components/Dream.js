import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default class Dream extends Component {
    state = {
        dreams: [],
        newDream: {
            date: '',
            category: '',
            description: ''
        },
        addDreamInvisable: false
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
                this.toggleAddDreamForm()
                const copyOfState = { ...this.state }
                copyOfState.newDream = {
                    date: '',
                    category: '',
                    description: ''
                }
                this.setState(copyOfState)
            })
    }
    toggleAddDreamForm = () => {
        const toggle = !this.state.addDreamInvisable;
        this.setState({ addDreamInvisable: toggle })
    }

    render() {
        const allDreams = this.state.dreams.map((dream) => {
            return (<Link to={`/dream/${dream._id}`}>
                <div>{dream.date}, {dream.category}</div>
            </Link>)
        })

        return (
            <div>
                <h1>Dream Journal</h1>
                {this.state.addDreamInvisable === false ? allDreams : null}
                <button onClick={this.toggleAddDreamForm}>Add Entry</button>
                {this.state.addDreamInvisable === true ? (
                    <div>
                        <form onSubmit={this.onSubmit}>
                            <input
                                type='date'
                                placeholder='date'
                                name='date'
                                onChange={this.onChange}
                                vlaue={this.state.newDream.date}
                            >
                            </input>
                            <input
                                type='category'
                                placeholder='category'
                                name='category'
                                onChange={this.onChange}
                                vlaue={this.state.newDream.category}
                            >
                            </input>
                            <input
                                type='text'
                                placeholder='description'
                                name='description'
                                onChange={this.onChange}
                                vlaue={this.state.newDream.description}
                            >
                            </input>
                            <input type="submit" vlaue="Create"></input>
                        </form>
                    </div>) : null}
            </div>
        )
    }
}
