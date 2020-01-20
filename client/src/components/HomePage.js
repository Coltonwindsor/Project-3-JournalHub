import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class HomePage extends Component {
    render() {
        return (
            <div className="homePageContainer">
                <div className="journalLinksContainer">

                    <Link to='/general' className="journalLink generalLink">General Thoughts</Link>
                    <Link to='/food' className="journalLink foodLink"><div>Food Journal</div></Link>
                    <Link to='/dream' className="journalLink dreamLink"><div>Dream Journal</div></Link>
                    <Link to='/exercise' className="journalLink exerciseLink"><div>Exercise Journal</div></Link>
                </div>
            </div>
        )
    }
}
