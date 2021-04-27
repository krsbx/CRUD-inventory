import React, { Component } from 'react';
import GetDetails from '../Beautify/Details/GetDetails';

/*
    This Class Contain Details Page
    The Page contain 2 components
        1. PostGedung Component || GetGedung Component
        2. Button to change view
    
    PostGedung will show a page to post gedung by using REST API
    GetGedung will show a page to get gedung list by using REST API
*/

export default class Details extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
        }
    }

    /*
        render function is used to render all necessary component for the page
    */

    render(){
        return (
            <div className='Details'>
                <GetDetails />
            </div>
        );
    }
}