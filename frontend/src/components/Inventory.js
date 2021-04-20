import React, { Component } from 'react';
import axiosInstance from './axios';
import { Button, TextField } from '@material-ui/core';

export default class Inventory extends Component {
    constructor(props){
        super(props);
    }

    GetGedung = () => {
        axiosInstance.get(`/api/gedung/`).then((result) => {
            const data = result.data.results;
            data.forEach(a => {
                console.log(a);
            });
        });
    }

    GetPeminjaman = () => {
        axiosInstance.get(`/api/peminjaman/`).then((result) => {
            const data = result.data.results;
            data.forEach(a => {
                console.log(a);
            });
        });
    }

    GetBarang = () => {
        axiosInstance.get(`/api/barang/`).then((result) => {
            const data = result.data.results;
            data.forEach(a => {
                console.log(a);
            });
        });
    }

    GetRuang = () => {
        axiosInstance.get(`/api/ruang/`).then((result) => {
            const data = result.data.results;
            data.forEach(a => {
                console.log(a);
            });
        });
    }

    render() {
        return (
        <div className="Inventory">
            <p>
                <br /><Button variant="contained" color="primary" onClick={() => this.GetBarang()}>List Barang</Button>
            </p>
            <p>
                <br /><Button variant="contained" color="primary" onClick={() => this.GetPeminjaman()}>List Peminjaman</Button>
            </p>
            <p>
                <br /><Button variant="contained" color="primary" onClick={() => this.GetGedung()}>List Gedung</Button>
            </p>
            <p>
                <br /><Button variant="contained" color="primary" onClick={() => this.GetRuang()}>List Ruang</Button>
            </p>
        </div>
        )
    }
}