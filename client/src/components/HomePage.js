import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class HomePage extends Component {
    render() {
        return (
            <div>
                <h1>JournalHub</h1>
                <div><Link to='/general'>General Thoughts</Link></div>
                <div><Link to='/food'>Food Journal</Link></div>
                <div><Link to='/dream'>Dream Journal</Link></div>
            </div>
        )
    }
}
