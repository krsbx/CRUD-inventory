import React, { Component } from 'react';
import { axiosInstance, baseURL, PrevNext, previousCheck } from '../../AxiosInstance'
import { useParams } from 'react-router-dom'
import { withRouter } from 'react-router'
import { Button, TextField } from '@material-ui/core';

class GetDetails extends Component {

    constructor(props){
        super(props);
        
        this.state = {
            pinjam: [],
            gedung: [],
            ruang: [],
            barang: [],
            returnBtn: [],
        }

        this.gedungPath = '';
        this.ruangPath = '';
        this.kodePath = '';
        this.jumlah = '';
        this.kembali = '';
        this.kembaliBool = false;
        this.nama_pegawai = '';

        this.nomor_peminjaman = this.props.match.params.nomor_peminjaman;
    }

    /*
        DetailsList function will create a GET Rest API
        All informations retrieved will be printed in browser console
    */

    async DetailsList (urls='') {
        await axiosInstance.get(`/api/detail/${urls}`).then((result) => {
            //Change to result.data.results
            //  for a lot of data
            const data = result.data;
            
            this.gedungPath = data.gedung;
            this.ruangPath = data.ruang;
            this.kodePath = data.kode_barang;
            this.jumlah = data.jumlah;
            this.kembali = (data.kembali == false ? "Belum Dikembalikan" : "Dikembalikan");
            this.kembaliBool = Boolean(data.kembali);
        });

        await axiosInstance.get(`/api/peminjaman/${this.nomor_peminjaman}`).then((res) => {
            const data = res.data;
            
            const toPinjam = Object.keys(data).map(function (key, index) {
                if(key != "BAST_disposisi"){
                    return (
                        <div className="DetailInfo"><span>{ key == "tgl_kembali" ? (data[key] != null ? data[key] : "Undefined" ) : data[key] }</span></div>
                    );
                }
            });

            toPinjam.push(<div className="DetailInfo">{this.jumlah}</div>);
            toPinjam.push(<div className="DetailInfo">{this.kembali}</div>);

            const toSpan = ["ID Peminjaman", "Nomor Peminjaman", "NIP/NRK", "Nama Pegawai", "Tanggal Peminjaman", "Tanggal Pengembalian", "Jumlah", "Dikembalikan"].map((hdr) => {
                return (
                    <div className="DetailHeader"><span>{hdr}</span></div>
                );
            }, this);

            this.nama_pegawai = data.nama_pegawai;

            this.setState( { pinjam : [toSpan, toPinjam] } );
        });
        
        await axiosInstance.get(`/api/gedung/${this.gedungPath}`).then((res) => {
            const data = res.data;

            const toGedung = Object.keys(data).map(function (key, index) {
                return (
                    <div className="DetailInfo"><span>{data[key]}</span></div>
                );
            });

            const toSpan = ["ID Gedung", "Gedung", "MG Gedung"].map((hdr) => {
                return (
                    <div className="DetailHeader"><span>{hdr}</span></div>
                );
            }, this);

            this.setState( { gedung : [toSpan, toGedung] } );
        });
        
        await axiosInstance.get(`/api/ruang/${this.ruangPath}`).then((res) => {
            const data = res.data;

            const toRuang = Object.keys(data).map(function (key, index) {
                return (
                    <div className="DetailInfo"><span>{data[key]}</span></div>
                );
            });

            const toSpan = ["ID Ruang", "Ruang", "PJ Ruang", "Gedung"].map((hdr) => {
                return (
                    <div className="DetailHeader"><span>{hdr}</span></div>
                );
            }, this);

            this.setState( { ruang : [toSpan, toRuang] } );
        });
        
        await axiosInstance.get(`/api/barang/${this.kodePath}`).then((res) => {
            const data = res.data;

            const toBarang = Object.keys(data).map(function (key, index) {
                if(key != "BAST_perolehan"){
                    return (
                        <div className="DetailInfo"><span>{data[key]}</span></div>
                    );
                }
            });

            const toSpan = ["ID Barang", "Kode Barang", "Nama Barang", "Merk Barang", "Stok"].map((hdr) => {
                return (
                    <div className="DetailHeader"><span>{hdr}</span></div>
                );
            }, this);

            this.setState( { barang : [ toSpan, toBarang] } );
        });
        
        this.setState( { returnBtn: <Button variant="contained" color="primary" onClick={() => this.ReturnItem()}
        disabled={ (Boolean(this.kembaliBool) === false ? (localStorage.getItem('nip_nrk') == this.nama_pegawai ? false : true) : true) }>Kembalikan!</Button> } )
    }

    componentDidMount () {
        this.DetailsList(this.nomor_peminjaman);
    }

    async ReturnItem () {
        let stock = 0;
        let jumlah = 0;

        //Get Jumlah Barang
        await axiosInstance.get(`/api/barang/${this.kodePath}`).then((result) => {
            const data = result.data;

            stock = data['stock'];
        });

        //Get Jumlah Peminjaman
        await axiosInstance.get(`/api/detail/${this.nomor_peminjaman}`).then((result) => {
            const data = result.data;

            jumlah = data['jumlah'];
        });

        //Update Jumlah Barang
        await axiosInstance.patch(`/api/barang/${this.kodePath}`, {
            'stock' : jumlah+stock,
        });

        //Update Peminjaman Detail
        await axiosInstance.patch(`/api/detail/${this.nomor_peminjaman}`, {
            'kembali' : !this.kembaliBool,
        }).then((result) => {
            console.log(result.data);
        });

        this.kembaliBool = true;

        this.setState( { returnBtn: <Button variant="contained" color="primary" onClick={() => this.ReturnItem()} disabled={(this.kembaliBool == false ? false : true)}>Kembalikan!</Button> } )
    }

    /*
        render function is used to render all necessary component for the page
    */

    render () {
        return (
            <>
            {this.state.returnBtn}
            <div className="GetDetails">
                <div className="BigGroups">
                <div className="DetailsGroup">
                    {this.state.pinjam.map((pin) => {
                        return(
                            <div className="DetailTables">{pin}</div>
                        );
                    }, this)}
                </div>
                <div className="DetailsGroup">
                    {this.state.barang.map((brg) => {
                        return(
                            <div className="DetailTables">{brg}</div>
                        )
                    })}
                </div>
            </div>
                <div className="BigGroups">
                <div className="DetailsGroup">
                    {this.state.ruang.map((rng) => {
                        return(
                            <div className="DetailTables">{rng}</div>
                        )
                    })}
                </div>
                <div className="DetailsGroup">
                    {this.state.gedung.map((ged) => {
                        return(
                            <div className="DetailTables">{ged}</div>
                        );
                    }, this)}
                </div>
            </div>
            </div>
        </>);
    }
}

export default withRouter(GetDetails);