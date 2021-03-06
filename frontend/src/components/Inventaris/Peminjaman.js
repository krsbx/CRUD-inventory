import React, { Component } from 'react'
import { Button, TextField } from '@material-ui/core';
import PostDetails from '../Beautify/Details/PostDetails';
import GetPeminjaman from '../Beautify/Peminjaman/GetPeminjaman';

/*
    This Class Contain Peminjaman Page
    The Page contain 2 components
        1. PostPeminjaman Component || GetPeminjaman Component
        2. Button to change view
    
    PostPeminjaman will show a page to post peminjaman by using REST API
    GetPeminjaman will show a page to get peminjaman list by using REST API
*/

export default class Peminjaman extends Component {
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
        const toRender = this.state.visible ? (<PostDetails />) : (<GetPeminjaman />);
        return (
            <div className='Peminjaman'>
                <Button onClick={() => { this.setState({visible: !this.state.visible}) }}>Change View!</Button>
                <br />{toRender}
            </div>
        );
    }
}