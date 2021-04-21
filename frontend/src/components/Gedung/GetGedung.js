import React, { Component } from 'react';
import axiosInstance from '../AxiosInstance';
import { Button, TextField } from '@material-ui/core';

export default class GetOptions extends Component {
    constructor(props){
        super(props);
    }

    GedungList = () => {
        axiosInstance.get(`/api/gedung/`).then((result) => {
            const data = result.data.results;
            data.forEach(a => {
                console.log(a);
            });
        });
    }

    render () {
        return (<Button variant="contained" color="primary" onClick={() => this.GedungList()}>Get Gedung!</Button>);
    }
}