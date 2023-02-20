import React, { useRef, useEffect } from 'react'
import { mount } from 'marketing/MarketingApp'
import { useHistory } from 'react-router-dom';

const MarketingApp = () => {

    // create reference to an html element
    const ref = useRef(null);
    // copy of the browser
    const history = useHistory();

    useEffect(() => {
        mount(ref.current, {
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
    });

    return (
        <div ref={ref}></div>
    )
}

export default MarketingApp