import React, {Components} from 'react'
import Header from '../components/Header'

export default function App ({name, actions}) {
    return (
        <Header name={name} actions={actions}></Header>
    )
}
