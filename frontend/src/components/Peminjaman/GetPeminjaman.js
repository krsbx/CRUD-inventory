import React, { Component } from 'react';
import axiosInstance from '../AxiosInstance';
import { Button, TextField } from '@material-ui/core';

export default class GetPeminjmana extends Component {
    constructor(props) {
        super(props);
    }

    PeminjamanList = () => {
        axiosInstance.get(`/api/peminjaman/`).then((result) => {
            const data = result.data.results;
            data.forEach(a => {
                console.log(a);
            });
        });
    }

    render () {
        return (<Button variant="contained" color="primary" onClick={() => this.PeminjamanList()}>Get Peminjaman!</Button>);
    }
}