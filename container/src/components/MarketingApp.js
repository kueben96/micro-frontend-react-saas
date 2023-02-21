import React, { useRef, useEffect } from 'react'
import { mount } from 'marketing/MarketingApp'
import { useHistory } from 'react-router-dom';

const MarketingApp = () => {

    // create reference to an html element
    const ref = useRef(null);
    // copy of the browser
    const history = useHistory();

    useEffect(() => {
        const { onParentNavigate } = mount(ref.current, {
            initialPath: history.location.pathname,
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

export default MarketingApp