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
        redirect: false,
        updateFormInvisable: false
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

    toggleUpdateForm = () => {
        const toggle = !this.state.updateFormInvisable
        this.setState({ updateFormInvisable: toggle })
    }

    deleteGeneral = () => {
        axios.delete(`/api/general/${this.props.match.params.generalId}`)
            .then(() => {
                this.setState({ redirect: true })
            })
    }

    render() {
        return (
            <div className="generalContainer">

                {this.state.redirect === true ? <Redirect to='/general' /> : null}

                <h1>{this.state.general.title} - {this.state.general.date}</h1>
                <div className="addEntryButtonDiv">
                    <button className="addEntryButton" onClick={this.toggleUpdateForm}>Edit Entry</button>
                    <button className="addEntryButton" onClick={this.deleteGeneral}>Delete Entry</button>
                </div>
                {this.state.updateFormInvisable === false ?
                    (<div className="singleEntryDiv">
                        <div className="entryText">{this.state.general.entry}</div>
                    </div>) : null}
                {this.state.updateFormInvisable === true ?
                    <div>
                        <form onSubmit={this.onSubmit}>
                            <div className='inputBoxDiv'>
                                <input onChange={this.onChange}
                                    type="date"
                                    name="date"
                                    placeholder='date'
                                    value={this.state.general.date} />
                            </div>
                            <div className='inputBoxDiv'>
                                <input onChange={this.onChange}
                                    type="text"
                                    name="title"
                                    placeholder='title'
                                    value={this.state.general.title} />
                            </div>
                            <div className='inputBoxDiv'>
                                <textarea
                                    columns="50"
                                    rows="10"
                                    onChange={this.onChange}
                                    type="text"
                                    name="entry"
                                    placeholder='entry'
                                    value={this.state.general.entry} />
                            </div>
                            <div className='inputBoxDiv'>
                                <input type="submit"
                                    value="Update Entry" />
                            </div>

                        </form>
                    </div> : null}

            </div>
        )
    }
}