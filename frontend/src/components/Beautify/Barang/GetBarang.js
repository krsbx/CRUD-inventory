import React, { Component } from 'react';
import { axiosInstance, baseURL, PrevNext, previousCheck } from '../../AxiosInstance'
import { Button, TextField } from '@material-ui/core';

export default class GetBarang extends Component {
    constructor(props){
        super(props);

        this.state = {
            barang : [],
            next : [],
            prev : [],
        }
    }

    /*
        BarangList function will create a GET Rest API
        All informations retrieved will be shown in a table
    */

    BarangList = () => {
        axiosInstance.get(`/api/barang/`).then((result) => {
            const data = result.data.results;

            let barangList = data.map((brg) => {
                return (
                <div className="GroupsOfRows">
                    <div className="CustomRow">
                        {brg.barangId}
                    </div>
                    <div className="CustomRow">
                        {brg.kode_barang}
                    </div>
                    <div className="CustomRow">
                        {brg.nama_barang}
                    </div>
                    <div className="CustomRow">
                        {brg.merk}
                    </div>
                    <div className="CustomRow">
                        {brg.stock}
                    </div>
                </div>
                );
            }, this);

            const parser = [ result.data.next ? new URL(result.data.next) : null, result.data.prev ? new URL(result.data.prev) : null ];

            const path = {
                'next' : parser[0] ? parser[0].searchParams.get('page') : null,
                'prev' : previousCheck(parser[1], `barang`),
            };

            if(path.next){
                const toNext = PrevNext(`?page=${path.next}`, this.BarangList, true);
                this.setState( { next : toNext } );
            }

            if(path.prev){
                const toPrev = PrevNext(`?page=${path.prev}`, this.BarangList, false);
                this.setState( { prev : toPrev } );
            }

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
                    <div className="CustomHeader last">Stock Barang</div>
                    { this.state.barang }
                </div>
                { this.state.prev }
                { this.state.next }
            </>
        );
    }
}