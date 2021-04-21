import React, { Component } from 'react'
import { Button, TextField } from '@material-ui/core';
import PostPeminjaman from './Peminjaman/PostPeminjaman';
import GetPeminjaman from './Peminjaman/GetPeminjaman';

export default class Peminjaman extends Component {
    constructor(props){
        super(props);

        this.state = {
            visible : false,
        }
    }

    render(){
        const toRender = this.state.visible ? (<PostPeminjaman />) : (<GetPeminjaman />);
        return (
            <div className='Peminjaman'>
                <Button onClick={() => { this.setState({visible: !this.state.visible}) }}>Change!</Button>
                <br />{toRender}
            </div>
        );
    }
}