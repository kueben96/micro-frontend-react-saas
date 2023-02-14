import React, { useRef, useEffect } from 'react'
import { mount } from 'marketing/MarketingApp'

const MarketingApp = () => {

    // create reference to an html element
    const ref = useRef(null);

    useEffect(() => {
        mount(ref.current)
    });

    return (
        <div ref={ref}></div>
    )
}

export default MarketingApp