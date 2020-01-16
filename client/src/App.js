import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Coltons from './components/Coltons'
import SingleColton from './components/SingleColton'

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={Coltons} />
            <Route path="/:coltonId" component={SingleColton} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App