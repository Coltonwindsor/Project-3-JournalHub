import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import HomePage from './components/HomePage'
import General from './components/General'
// import SingleGeneral from './components/SingleGeneral'
import Dream from './components/Dream'
// import SingleDream from './components/SingleDream'
import Food from './components/Food'
// import SingleFood from './components/SingleFood'
// import Exercise from './components/Exercise'
// import SingleExercise from './components/SingleExercise'

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/general" component={General} />
            {/* <Route exact path="/general/:generalId" component={SingleGeneral} /> */}
            <Route exact path="/food" component={Food} />
            {/* <Route exact path="/food/:foodId" component={SingleFood} /> */}
            <Route exact path="/dream" component={Dream} />
            {/* <Route exact path="/dream/:dreamId" component={SingleDream} /> */}
            {/* <Route exact path="/exercise" component={Exercise} />
            <Route exact path="/exercise/:exerciseId" component={SingleExercise} /> */}
            <Route path="/" component={HomePage} />

          </Switch>
        </div>
      </Router>
    )
  }
}

export default App