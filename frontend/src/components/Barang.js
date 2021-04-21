import React, { Component } from 'react';
import { Button, TextField } from '@material-ui/core';
import GetBarang from './Barang/GetBarang';
import PostBarang from './Barang/PostBarang';

export default class Barang extends Component {
    constructor(props){
        super(props);
        this.state = {
            visible: false,
        }
    }

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