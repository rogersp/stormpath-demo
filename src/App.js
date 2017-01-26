import React from 'react';
import { Route, Redirect, IndexRoute, browserHistory } from 'react-router';
import ReactStormpath, { Router, AuthenticatedRoute, HomeRoute, LoginRoute } from 'react-stormpath'
import Layout from './component/Layout';
import Login from './component/Login';
import Home from './component/Home';


// TODO: put in switcher between hosted config and local config

ReactStormpath.init({
    endpoints: {
        //baseUri: 'https://appname.apps.stormpath.io'
        //baseUri: 'http://localhost:3050'
    }
});

export default class App extends React.Component {    
    render() {            
        return (
            <Router history={ browserHistory }>
                <LoginRoute path="/login" component={Layout}>
                    <IndexRoute component={Login} />
                </LoginRoute>
                <AuthenticatedRoute path="/secure" component={Layout}>                    
                    <IndexRoute component={Home}/>
                    <HomeRoute component={Home} />                     
                </AuthenticatedRoute>                
                <Redirect from="*" to="/secure" />
            </Router>
        )
    }
}