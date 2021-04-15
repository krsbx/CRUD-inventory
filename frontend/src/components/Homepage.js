import React, { Component } from 'react';
import About from './About';
import NavBar from './NavBar';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';

export default class Homepage extends Component {
    constructor(props){
        super(props);
    }

    render () {
        return  (
        <Router>
            <NavBar />
            <Switch>
                <div className="container">
                    <Route exact path='/'>
                        This is Homepage
                    </Route>
                    <Route path='/about/'>
                        <About />
                    </Route>
                </div>
            </Switch>
        </Router>
        );
    }
}