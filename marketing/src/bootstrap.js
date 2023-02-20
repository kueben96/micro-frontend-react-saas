import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { createMemoryHistory } from "history";

// mount functin to start up the app

const mount = (el, { onNavigate }) => {
    const history = createMemoryHistory();

    if (onNavigate) {
        history.listen(onNavigate);
    }

    ReactDOM.render(
        <App history={history}></App>,
        // render this h1 to el
        el
    )
}
// if in dev or isolation -> call mount immediately 

if (process.env.NODE_ENV == 'development') {
    const devRoot = document.querySelector('#_marketing-dev-root');

    if (devRoot) {
        mount(devRoot, {});
    }
}

// else: export the mount function if running through container

export { mount };