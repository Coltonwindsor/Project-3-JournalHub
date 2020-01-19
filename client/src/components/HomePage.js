import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class HomePage extends Component {
    render() {
        return (
            <div className="homePageContainer">
                <div className="header">
                    <h1>JournalHub</h1>
                </div>
                <div className="journalLinksContainer">
                    <Link to='/general' className="journalLink generalLink"><div>General Thoughts</div></Link>
                    <Link to='/food' className="journalLink foodLink"><div>Food Journal</div></Link>
                    <Link to='/dream' className="journalLink dreamLink"><div>Dream Journal</div></Link>
                </div>
            </div>
        )
    }
}
