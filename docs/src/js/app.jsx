import React from 'react'
import PropTypes from 'prop-types'
import { Route, Link } from 'react-router-dom'

import Header from '../components/Header'
import Home from '../components/Home'
import About from '../components/About'

function App ({name, actions}) {
  return <div className='app'>
    <Header name={name} actions={actions} />
    <ul>
      <li><Link to='/'>Home</Link></li>
      <li><Link to='/about'>About</Link></li>
    </ul>

    <hr />
    <Route exact path='/' component={Home} />
    <Route path='/about' component={About} />
  </div>
}

App.propTypes = {
  name: PropTypes.string.isRequired,
  actions: PropTypes.object.isRequired
}

export default App
