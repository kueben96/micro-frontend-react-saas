import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

// mount functin to start up the app

const mount = (el) => {
    ReactDOM.render(
        <App></App>,
        // render this h1 to el
        el
    )
}
// if in dev or isolation -> call mount immediately 

if (process.env.NODE_ENV == 'development') {
    const devRoot = document.querySelector('#_marketing-dev-root');

    if (devRoot) {
        mount(devRoot);
    }
}

// else: export the mount function if running through container

export { mount };