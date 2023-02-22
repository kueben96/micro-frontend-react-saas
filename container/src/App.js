import React, { lazy, Suspense, useState, useEffect } from 'react'
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles'
import { Router, Route, Switch, Redirect } from 'react-router-dom'
import Progress from './components/Progress'
import Header from './components/Header'
import { createBrowserHistory } from 'history'

const App = () => {
    // only load the JS files when they are needed
    const MarketingLazy = lazy(() => import('./components/MarketingApp'))
    const AuthLazy = lazy(() => import('./components/AuthApp'))
    const DashboardLazy = lazy(() => import('./components/DashboardApp'))

    const generateClassName = createGenerateClassName({
        productionPrefix: 'co',
    })

    const history = createBrowserHistory();


    const [isSignedIn, setIsSignedIn] = useState(false)
    return (


        <Router history={history}>
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
        </Router>
    )
}

export default App