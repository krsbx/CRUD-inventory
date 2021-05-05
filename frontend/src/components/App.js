import React, { Component } from 'react';
import { render } from 'react-dom';
import Homepage from './Homepage';

export default class App extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
        <div>
            <Homepage />
        </div>);
    }
}

const appDiv = document.getElementById("app");

render(<App />, appDiv);

/*
import module Homepage
merender module Homepage 
hasil render akan ditampilkan pada pada id html, app 
*/