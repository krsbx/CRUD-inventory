import React, { Component } from 'react';
import axiosInstance from './axios';
import { Button, TextField } from '@material-ui/core';

export default class Gedung extends Component {
    constructor(props){
        super(props);
    }

    GedungList = () => {
        axiosInstance.get(`/api/gedungList/`).then((result) => {
            const data = result.data;
            data.forEach(a => {
                console.log(a);
            });
        });
    }

    render(){
        return (
            <div>
                <Button variant="contained" color="primary" onClick={() => this.GedungList()}>Gedung!</Button>
            </div>
        );
    }
};