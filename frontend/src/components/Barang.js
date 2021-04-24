import React, { Component } from 'react';
import { Button, TextField } from '@material-ui/core';
import PostBarang from './Barang/PostBarang';
import GetBarang from './Barang/GetBarang';

/*
    This Class Contain Barang Page
    The Page contain 2 components
        1. PostBarang Component || GetBarang Component
        2. Button to change view
    
    PostBarang will show a page to post barang by using REST API
    GetBarang will show a page to get barang list by using REST API
*/

export default class Barang extends Component {
    constructor(props){
        super(props);
        this.state = {
            visible: false,
        }
    }

    /*
        render function is used to render all necessary component for the page
    */

    render(){
        const toRender = this.state.visible ? (<PostBarang />) : (<GetBarang />);
        return (
            <div className='Barang'>
                <Button onClick={() => { this.setState({visible: !this.state.visible}) }}>Change!</Button>
                <br />{toRender}
            </div>
        );
    }
}