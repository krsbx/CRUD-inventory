import React, { Component } from 'react';
import axiosInstance from '../AxiosInstance';
import { Button, TextField } from '@material-ui/core';

export default class GetPeminjmana extends Component {
    constructor(props) {
        super(props);

        this.state = {
            peminjaman : [],
        }
    }

    /*
        PeminjamanList function will create a GET Rest API
        All informations retrieved will printed in browser console
    */

    PeminjamanList = () => {
        axiosInstance.get(`/api/peminjaman/`).then((result) => {
            const data = result.data.results;
            let toChange = true;
            let peminjamanList = data.map((p) => {
                toChange = ! toChange;
                return (
                    <div className="GroupsOfRows">
                        <div className={toChange ? "CustomRow" : "CustomRow Changes"}>{p.id_Peminjaman}</div>
                        <div className={toChange ? "CustomRow" : "CustomRow Changes"}>{p.nomor_peminjaman}</div>
                        <div className={toChange ? "CustomRow" : "CustomRow Changes"}>{p.nip_nrk}</div>
                        <div className={toChange ? "CustomRow" : "CustomRow Changes"}>{p.nama_pegawai}</div>
                        <div className={toChange ? "CustomRow" : "CustomRow Changes"}>{p.tgl_pinjam}</div>
                        <div className={toChange ? "CustomRow" : "CustomRow Changes"}>{p.tgl_kembali ? p.tgl_kembali : "Undefined"}</div>
                    </div>
                );
            }, this);

            this.setState( { peminjaman : peminjamanList} );
        });
    }

    componentDidMount () {
        this.PeminjamanList();
    }

    /*
        render function is used to render all necessary component for the page
    */

    render () {
        return (
            <>
                <div className="CustomTables">
                    <div className="CustomHeader">ID Peminjaman</div>
                    <div className="CustomHeader">Nomor Peminjaman</div>
                    <div className="CustomHeader">NIP/NRK</div>
                    <div className="CustomHeader">Nama Pegawai</div>
                    <div className="CustomHeader">Tanggal Pinjam</div>
                    <div className="CustomHeader">Tanggal Kembali</div>
                    { this.state.peminjaman }
                </div>
                <Button variant="contained" color="primary" onClick={() => this.PeminjamanList()}>Get Peminjaman!</Button>
            </>
        );
    }
}