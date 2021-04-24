import React, { Component } from 'react';
import axiosInstance from '../AxiosInstance';
import { Button, TextField } from '@material-ui/core';

export default class GetBarang extends Component {
    constructor(props){
        super(props);

        this.state = {
            barang : [],
        }
    }

    /*
        BarangList function will create a GET Rest API
        All informations retrieved will be shown in a table
    */

    BarangList = () => {
        axiosInstance.get(`/api/barang/`).then((result) => {
            const data = result.data.results;

            let barangList = data.map((b) => {
                return (
                <div className="GroupsOfRows">
                    <div className="CustomRow">
                        {b.barangId}
                    </div>
                    <div className="CustomRow">
                        {b.kode_barang}
                    </div>
                    <div className="CustomRow">
                        {b.nama_barang}
                    </div>
                    <div className="CustomRow">
                        {b.merk}
                    </div>
                    <div className="CustomRow">
                        {b.stock}
                    </div>
                </div>
                );
            }, this);
            this.setState( { barang : barangList} );
        });
    }

    componentDidMount() {
        this.BarangList();
    }

    /*
        render function is used to render all necessary component for the page
    */

    render () {
        return (
            <>
                <div className="CustomTables">
                    <div className="CustomHeader">ID Barang</div>
                    <div className="CustomHeader">Kode Barang</div>
                    <div className="CustomHeader">Nama Barang</div>
                    <div className="CustomHeader">Merk Barang</div>
                    <div className="CustomHeader">Stock Barang</div>
                    { this.state.barang }
                </div>
                <Button variant="contained" color="primary" onClick={() => this.BarangList()}>Get Barang!</Button>
            </>
        );
    }
}