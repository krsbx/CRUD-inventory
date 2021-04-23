import React, { Component } from 'react';
import { Button, TextField } from '@material-ui/core';
import PostDetails from './Details/PostDetails';
import GetDetails from './Details/GetDetails';

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
        const toRender = this.state.visible ? (<PostDetails />) : (<GetDetails />);
        return (
            <div className='Gedung'>
                <Button onClick={() => { this.setState({visible: !this.state.visible}) }}>Change!</Button>
                <br />{toRender}
            </div>
        );
    }
}