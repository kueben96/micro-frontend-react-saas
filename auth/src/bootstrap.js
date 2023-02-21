import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { createMemoryHistory, createBrowserHistory } from "history";

// mount functin to start up the app

const mount = (el, { onNavigate, defaultHistory, initialPath }) => {
    // if default history given, use it for isolation mode, else use memory history
    const history = defaultHistory || createMemoryHistory({
        initialEntries: [initialPath],
    });

    if (onNavigate) {
        history.listen(onNavigate);
    }

    ReactDOM.render(
        <App history={history}></App>,
        // render this h1 to el
        el
    )
    // for container to child communication, return object of functions when calling mount
    return {
        onParentNavigate({ pathname: nextPathname }) {
            // history.push(location.pathname)
            const { pathname } = history.location;
            console.log(nextPathname)
            if (pathname !== nextPathname)
                history.push(nextPathname)
        }
    }
}
// if in dev or isolation -> call mount immediately 

if (process.env.NODE_ENV == 'development') {
    const devRoot = document.querySelector('#_auth-dev-root');

    if (devRoot) {
        mount(devRoot, { defaultHistory: createBrowserHistory() });
    }
}

// else: export the mount function if running through container

export { mount };