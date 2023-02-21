import React, { lazy, Suspense } from 'react'
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Header from './components/Header'

const App = () => {
    // only load the JS files when they are needed
    const MarketingLazy = lazy(() => import('./components/MarketingApp'))
    const AuthLazy = lazy(() => import('./components/AuthApp'))

    const generateClassName = createGenerateClassName({
        productionPrefix: 'co',
    })
    return (
        // Container routing implemented with Browser History
        <BrowserRouter>
            <StylesProvider generateClassName={generateClassName}>
                <div>
                    <Header />
                    <Suspense fallback={<div>Loading ...</div>}>
                        <Switch>
                            <Route path="/auth" component={AuthLazy}></Route>
                            <Route path="/" component={MarketingLazy}></Route>
                        </Switch>
                    </Suspense>
                </div>
            </StylesProvider>
        </BrowserRouter>

    )
}

export default App