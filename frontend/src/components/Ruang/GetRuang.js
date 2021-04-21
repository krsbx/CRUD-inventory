import React, { Component } from 'react';
import axiosInstance from '../AxiosInstance';
import { Button, TextField } from '@material-ui/core';

export default class GetRuang extends Component {
    constructor(props){
        super(props);

        this.state = {
            fields: {},
            errors: {},
        }
    }

    RuangList = () => {
        axiosInstance.get(`/api/ruang/`).then((result) => {
            const data = result.data.results;
            data.forEach(a => {
                console.log(a);
            });
        });
    }

    render () {
        return (<Button variant="contained" color="primary" onClick={() => this.RuangList()}>Get Ruang!</Button>);
    }
}