import React from 'react'
import { StylesProvider, createGenerateClassName } from '@material-ui/core'
import { BrowserRouter } from 'react-router-dom'
import MarketingApp from './components/MarketingApp'
import Header from './components/Header'

const App = () => {
    const generateClassName = createGenerateClassName({
        productionPrefix: 'co',
    })
    return (
        <BrowserRouter>
            <StylesProvider generateClassName={generateClassName}>
                <div>
                    <Header />

                    <MarketingApp />
                </div>
            </StylesProvider>
        </BrowserRouter>

    )
}

export default App