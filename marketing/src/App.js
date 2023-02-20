import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles'
import React from 'react'
import { Switch, Route, Router } from 'react-router-dom'
import Landing from './components/Landing';
import Pricing from './components/Pricing';

const App = ({ history }) => {

    const generateClassName = createGenerateClassName({
        productionPrefix: 'ma',
    })
    return (
        <div>
            {/* the router object does not have the history by default so we have to provide it */}
            <Router history={history}>
                <StylesProvider generateClassName={generateClassName}>

                    <Switch>
                        <Route exact path="/pricing" component={Pricing}></Route>
                        <Route path="/" component={Landing}></Route>
                    </Switch>

                </StylesProvider>
            </Router>
        </div>
    )
}

export default App