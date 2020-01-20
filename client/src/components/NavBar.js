import React, { Component } from 'react'
import { Link } from 'react-router-dom'


export default class NavBar extends Component {
    render() {
        return (
            <div className="header-fix">
                <div className="header">
                    <img src="https://i.imgur.com/gehjgi9.png" alt='logo' />
                </div>
                <div className="navContainer">
                    <Link to='/' className="nav"><div>Home</div></Link>
                    <Link to='/general' className="nav"><div>General Thoughts</div></Link>
                    <Link to='/food' className="nav"><div>Food Journal</div></Link>
                    <Link to='/dream' className="nav"><div>Dream Journal</div></Link>
                    <Link to='/exercise' className="nav"><div>Exercise Journal</div></Link>
                    {/* <div className='search'>Search</div> */}
                </div>
            </div>
        )
    }
}
