import React from 'react'
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles'
import { BrowserRouter } from 'react-router-dom'
import MarketingApp from './components/MarketingApp'
import Header from './components/Header'

const App = () => {
    const generateClassName = createGenerateClassName({
        productionPrefix: 'co',
    })
    console.log(generateClassName)
    return (
        // Container routing implemented with Browser History
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