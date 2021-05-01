import React, { Component } from 'react';
import { Button, TextField } from '@material-ui/core';
import PostRuang from '../Beautify/Ruang/PostRuang';
import GetRuang from '../Beautify/Ruang/GetRuang';

/*
    This Class Contain Ruang Page
    The Page contain 2 components
        1. PostRuang Component || GetRuang Component
        2. Button to change view
    
    PostRuang will show a page to post ruang by using REST API
    GetRuang will show a page to get ruang list by using REST API
*/

export default class Ruang extends Component {
    constructor(props){
        super(props);
        this.state = {
            visible : false,
        }
    }

    /*
        render function is used to render all necessary component for the page
    */

    render(){
        const toRender = this.state.visible ? (<PostRuang />) : (<GetRuang />);
        return (
            <div className='Ruang'>
                <Button onClick={() => { this.setState({visible: !this.state.visible}) }}>Change View!</Button>
                <br />{toRender}
            </div>
        );
    }
}