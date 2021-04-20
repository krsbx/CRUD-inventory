import React, { Component } from 'react';
import About from './About';
import NavBar from './NavBar';
import Login from './Login';
import Register from './Register';
import Logout from './Logout';
import Inventory from './Inventory';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';

export default class Homepage extends Component {
    constructor(props){
        super(props);
    }

    render () {
        let isAuthorized = localStorage.getItem('isAuthorized');

        const drawRegister = () => {
            if(isAuthorized == "true"){
                return <Inventory />;
            }
            return <Register />;
        }

        return  (
        <Router>
            <NavBar />
            <Switch>
                <div className="container">
                    <Route exact path='/'>
                        {drawRegister()}
                    </Route>
                    <Route path='/about/'>
                        <About />
                    </Route>
                    <Route path='/login'>
                        <Login />
                    </Route>
                    <Route path='/register'>
                        <Register />
                    </Route>
                    <Route path='/logout'>
                        <Logout />
                    </Route>
                </div>
            </Switch>
        </Router>
        );
    }
}