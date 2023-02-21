import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles'
import React from 'react'
import { Switch, Route, Router } from 'react-router-dom'
import SignIn from './components/Signin'
import SignUp from './components/Signup'


const App = ({ history, onSignIn }) => {

    const generateClassName = createGenerateClassName({
        productionPrefix: 'au',
    })
    return (
        <div>
            {/* the router object does not have the history by default so we have to provide it */}
            <Router history={history}>
                <StylesProvider generateClassName={generateClassName}>

                    <Switch>
                        <Route path="/auth/signin">
                            <SignIn onSignIn={onSignIn}></SignIn>
                        </Route>
                        <Route path="/auth/signup">
                            <SignUp onSignIn={onSignIn}></SignUp>
                        </Route>
                    </Switch>

                </StylesProvider>
            </Router>
        </div>
    )
}

export default App