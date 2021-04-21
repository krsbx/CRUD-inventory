import React, { Component } from 'react';
import { Button, TextField } from '@material-ui/core';
import PostRuang from './Ruang/PostRuang';
import GetRuang from './Ruang/GetRuang';

export default class Ruang extends Component {
    constructor(props){
        super(props);
        this.state = {
            visible : false,
        }
    }

    render(){
        const toRender = this.state.visible ? (<PostRuang />) : (<GetRuang />);
        return (
            <div className='Ruang'>
                <Button onClick={() => { this.setState({visible: !this.state.visible}) }}>Change!</Button>
                <br />{toRender}
            </div>
        );
    }
}