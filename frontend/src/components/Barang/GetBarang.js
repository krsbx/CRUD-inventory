import React, { Component } from 'react';
import axiosInstance from '../AxiosInstance';
import { Button, TextField } from '@material-ui/core';

export default class GetBarang extends Component {
    constructor(props){
        super(props);
    }

    BarangList = () => {
        axiosInstance.get(`/api/barang/`).then((result) => {
            const data = result.data.results;
            data.forEach(a => {
                console.log(a);
            });
        });
    }

    render () {
        return (<Button variant="contained" color="primary" onClick={() => this.BarangList()}>Get Barang!</Button>);
    }
}