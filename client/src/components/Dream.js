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
            <div className="dreamContainer">
                <h1>Dream Journal</h1>
                {this.state.addDreamInvisable === false ? allDreams : null}
                {this.state.addDreamInvisable === true ? (
                    <div>
                        <form onSubmit={this.onSubmit}>
                            <div>
                                <input
                                    type='date'
                                    placeholder='date'
                                    name='date'
                                    onChange={this.onChange}
                                    vlaue={this.state.newDream.date}
                                >
                                </input>
                            </div>
                            <div>
                                <input
                                    type='category'
                                    placeholder='category'
                                    name='category'
                                    onChange={this.onChange}
                                    vlaue={this.state.newDream.category}
                                >
                                </input>
                            </div>
                            <div>
                                <textarea rows="10" columns="50"
                                    type='text'
                                    placeholder='description'
                                    name='description'
                                    onChange={this.onChange}
                                    vlaue={this.state.newDream.description}
                                >
                                </textarea>
                            </div>
                            <div>
                                <input type="submit" vlaue="Create"></input>
                            </div>
                        </form>
                    </div>) : null}
                {this.state.addDreamInvisable === false ?
                    <button onClick={this.toggleAddDreamForm}>Add Entry</button> :
                    <button onClick={this.toggleAddDreamForm}>Back</button>}
            </div>
        )
    }
}
