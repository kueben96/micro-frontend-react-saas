import React, { lazy, Suspense, useState } from 'react'
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Progress from './components/Progress'
import Header from './components/Header'

const App = () => {
    // only load the JS files when they are needed
    const MarketingLazy = lazy(() => import('./components/MarketingApp'))
    const AuthLazy = lazy(() => import('./components/AuthApp'))
    const DashboardLazy = lazy(() => import('./components/DashboardApp'))

    const generateClassName = createGenerateClassName({
        productionPrefix: 'co',
    })

    const [isSignedIn, setIsSignedIn] = useState(false)
    return (
        // Container routing implemented with Browser History
        <BrowserRouter>
            <StylesProvider generateClassName={generateClassName}>
                <div>
                    <Header isSignedIn={isSignedIn} onSignOut={() => setIsSignedIn(false)} />
                    <Suspense fallback={<Progress />}>
                        <Switch>
                            <Route path="/auth">
                                <AuthLazy onSignIn={() => setIsSignedIn(true)}></AuthLazy>
                            </Route>
                            <Route path="/dashboard" component={DashboardLazy}></Route>
                            <Route path="/" component={MarketingLazy}></Route>
                        </Switch>
                    </Suspense>
                </div>
            </StylesProvider>
        </BrowserRouter>
    )
}

export default App