import React, {Component} from 'react'
import PropTypes from 'prop-types'

class Header extends Component {
  constructor (props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick () {
    this.props.actions.changeName()
  }

  render () {
    return (
      <h2 onClick={this.handleClick}>Hello, {this.props.name}!</h2>
    )
  }
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
  actions: PropTypes.object.isRequired
}

export default Header
