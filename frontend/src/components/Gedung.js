import React, { Component } from 'react';
import { Button, TextField } from '@material-ui/core';
import PostGedung from './Gedung/PostGedung';
import GetGedung from './Gedung/GetGedung';

export default class Gedung extends Component {
    constructor(props){
        super(props);
        this.state = {
            visible: false,
        }
    }
    
    render(){
        const toRender = this.state.visible ? (<PostGedung />) : (<GetGedung />);
        return (
            <div className='Gedung'>
                <Button onClick={() => { this.setState({visible: !this.state.visible}) }}>Change!</Button>
                <br />{toRender}
            </div>
        );
    }
};