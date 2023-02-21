import React, { useRef, useEffect } from 'react'
import { mount } from 'auth/AuthApp'
import { useHistory } from 'react-router-dom';

const AuthApp = () => {

    // create reference to an html element
    const ref = useRef(null);
    // copy of the browser
    const history = useHistory();

    useEffect(() => {
        const { onParentNavigate } = mount(ref.current, {
            // desctructre location object and rename to nextPathname
            onNavigate: ({ pathname: nextPathname }) => {
                // console.log(history.location)
                // console.log(location);
                const { pathname } = history.location;

                if (pathname !== nextPathname) {
                    history.push(nextPathname)
                }
            }
        })
        history.listen(onParentNavigate);
        // add empty dependency array to only call this function when the marketing object is first rendered to the screen
    }, []);

    return (
        <div ref={ref}></div>
    )
}

export default AuthApp