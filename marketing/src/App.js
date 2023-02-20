import { StylesProvider, createGenerateClassName } from '@material-ui/core'
import React from 'react'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import Landing from './components/Landing';
import Pricing from './components/Pricing';

const App = () => {

    const generateClassName = createGenerateClassName({
        productionPrefix: 'ma',
    })
    return (
        <div>
            <BrowserRouter>
                <StylesProvider generateClassName={generateClassName}>

                    <Switch>
                        <Route exact path="/pricing" component={Pricing}></Route>
                        <Route path="/" component={Landing}></Route>
                    </Switch>

                </StylesProvider>
            </BrowserRouter>
        </div>
    )
}

export default App