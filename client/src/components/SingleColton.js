import React, { Component } from 'react'

export default class SingleColton extends Component {
    state = {

    }

    componentDidMount() {
        axios.get('/api/helloworld')
            .then((res) => {
                this.setState({ message: res.data })
            })
    }

    render() {
        return (
            <div>

            </div>
        )
    }
}
