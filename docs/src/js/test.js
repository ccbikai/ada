import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, bindActionCreators } from 'redux'
import { Provider, connect } from 'react-redux'
import ReactApp from './app.jsx'
import reducer from './reducers'
import * as Actions from './actions'

import './common'

// react test
// ReactApp.propTypes = {
//   name: PropTypes.string.isRequired,
//   actions: PropTypes.object.isRequired
// }
const store = createStore(reducer)

const mapStateToProps = state => ({
  name: state.name
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(Actions, dispatch)
})

const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(ReactApp)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('react')
)

// hbs test
// const tmpl = require('main.hbs')

// const htmlStr = tmpl({
//   name: '张三',
//   age: 22,
//   sexNum: 1
// })

// document.getElementById('hbs-test').innerHTML = htmlStr

// lazy test
import('common/lazy.js').then(({LAZY}) => {
    console.log(LAZY)
})
