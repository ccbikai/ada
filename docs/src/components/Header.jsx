import React, {Component} from 'react'

export default class Header extends Component {
    constructor(props) {
        super(props)

        this.handleClick = this.handleClick.bind(this)
    }

    handleClick() {
        this.props.actions.changeName()
    }

    render() {
        return <div>
            <h2 onClick={this.handleClick}>Hello, {this.props.name}!</h2>
        </div>
    }
}
