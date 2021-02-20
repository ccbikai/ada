import React from 'react'
import PropTypes from 'prop-types'
import { Route, Link } from 'react-router-dom'
import Loadable from 'react-loadable'
import { hot } from 'react-hot-loader'

import Header from 'Header'
import Home from 'Home'
import Loading from 'Loading'

const About = Loadable({
  loader: () => import(/* webpackChunkName: "react-import" */'About'),
  loading: Loading
})
const Static = Loadable({
  loader: () => import(/* webpackChunkName: "react-import" */'Static'),
  loading: Loading
})

function App ({ name, actions }) {
  return <div className='app'>
    <Header name={name} actions={actions} />
    <ul>
      <li><Link to='/'>Home</Link></li>
      <li><Link to='/about'>About</Link></li>
    </ul>

    <hr />
    <Route exact path='/' component={Home} />
    <Route path='/about' component={About} />
    <hr />
    <Static />
  </div>
}

App.propTypes = {
  name: PropTypes.string.isRequired,
  actions: PropTypes.object.isRequired
}

export default hot(module)(App)
