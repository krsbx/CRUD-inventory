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
        //Create a get request to Details API
        await axiosInstance.get(`/api/detail/${urls}`).then((result) => {
            //Retrieved response body of the request
            const data = result.data;
            
            //Set retrieved data to corresponding variables
            //   Will be used for the next request
            this.gedungPath = data.gedung;
            this.ruangPath = data.ruang;
            this.kodePath = data.kode_barang;
            this.jumlah = data.jumlah;
            this.kembaliBool = Boolean(data.kembali);

            //Check if the object has been returned or not
            this.kembali = (data.kembali === false ? "Belum Dikembalikan" : "Dikembalikan");
        });

        //Create a get request to peminjaman API
        await axiosInstance.get(`/api/peminjaman/${this.nomor_peminjaman}`).then((result) => {
            //Retrieved response body of the request
            const data = result.data;
            
            //Map the response to toPinjam
            //  The result of map is an array of html element, with value from response body
            const toPinjam = Object.keys(data).map(function (key, index) {
                if(key != "BAST_disposisi"){
                    return (
                        <div className="DetailInfo"><span>{ key == "tgl_kembali" ? (data[key] != null ? data[key] : "Undefined" ) : data[key] }</span></div>
                    );
                }
            });
            
            //Add aditional informations of the total borrowed objects
            toPinjam.push(<div className="DetailInfo">{this.jumlah}</div>);
            //Add aditional informations of the status of the objects
            toPinjam.push(<div className="DetailInfo">{this.kembali}</div>);

            //Create a header array for tables
            const toSpan = ["ID Peminjaman", "Nomor Peminjaman", "NIP/NRK", "Nama Pegawai", "Tanggal Peminjaman", "Tanggal Pengembalian", "Jumlah", "Dikembalikan"].map((hdr) => {
                return (
                    <div className="DetailHeader"><span>{hdr}</span></div>
                );
            }, this);

            //Get the name of the person who borrow the objects
            this.nama_pegawai = data.nama_pegawai;

            //Set pinjam values to toSpan and toPinjam
            //  toSpan => Header of the tables
            //  toPinjam => Values of the tables
            this.setState( { pinjam : [toSpan, toPinjam] } );
        });
        
        await axiosInstance.get(`/api/gedung/${this.gedungPath}`).then((result) => {
            //Retrieved response body of the request
            const data = result.data;

            //Map the response to toGedung
            //  The result of map is an array of html element, with value from response body
            const toGedung = Object.keys(data).map(function (key, index) {
                return (
                    <div className="DetailInfo"><span>{data[key]}</span></div>
                );
            });

            //Create a header array for tables
            const toSpan = ["ID Gedung", "Gedung", "MG Gedung"].map((hdr) => {
                return (
                    <div className="DetailHeader"><span>{hdr}</span></div>
                );
            }, this);

            //Set pinjam values to toSpan and toGedung
            //  toSpan => Header of the tables
            //  toGedung => Values of the tables
            this.setState( { gedung : [toSpan, toGedung] } );
        });
        
        await axiosInstance.get(`/api/ruang/${this.ruangPath}`).then((result) => {
            //Retrieved response body of the request
            const data = result.data;

            //Map the response to toRuang
            //  The result of map is an array of html element, with value from response body
            const toRuang = Object.keys(data).map(function (key, index) {
                return (
                    <div className="DetailInfo"><span>{data[key]}</span></div>
                );
            });

            //Create a header array for tables
            const toSpan = ["ID Ruang", "Ruang", "PJ Ruang", "Gedung"].map((hdr) => {
                return (
                    <div className="DetailHeader"><span>{hdr}</span></div>
                );
            }, this);

            //Set pinjam values to toSpan and toRuang
            //  toSpan => Header of the tables
            //  toRuang => Values of the tables
            this.setState( { ruang : [toSpan, toRuang] } );
        });
        
        await axiosInstance.get(`/api/barang/${this.kodePath}`).then((result) => {
            //Retrieved response body of the request
            const data = result.data;

            //Map the response to toBarang
            //  The result of map is an array of html element, with value from response body
            const toBarang = Object.keys(data).map(function (key, index) {
                if(key != "BAST_perolehan"){
                    return (
                        <div className="DetailInfo"><span>{data[key]}</span></div>
                    );
                }
            });

            //Create a header array for tables
            const toSpan = ["ID Barang", "Kode Barang", "Nama Barang", "Merk Barang", "Stok"].map((hdr) => {
                return (
                    <div className="DetailHeader"><span>{hdr}</span></div>
                );
            }, this);

            //Set pinjam values to toSpan and toBarang
            //  toSpan => Header of the tables
            //  toBarang => Values of the tables
            this.setState( { barang : [ toSpan, toBarang] } );
        });
        
        //Set return button to corresponding status
        //  Disable button interactions if the object has been returned
        this.setState( { returnBtn: <Button variant="contained" color="primary" onClick={() => this.ReturnItem()}
        disabled={ (Boolean(this.kembaliBool) === false ? (localStorage.getItem('nip_nrk') == this.nama_pegawai ? false : true) : true) }>Kembalikan!</Button> } )
    }

    /*
        On page load, DetailsList with current parameter
    */

    componentDidMount () {
        this.DetailsList(this.nomor_peminjaman);
    }

    /*
        ReturnItem function to return the borrowed thing to server  
    */

    async ReturnItem () {
        //Declare dummy variable to store any information from database
        let stock = 0;
        let jumlah = 0;

        //Get Jumlah Barang
        //  Get stock in database and store it to stock variable
        await axiosInstance.get(`/api/barang/${this.kodePath}`).then((result) => {
            const data = result.data;

            //Set stock to stock from data objects
            stock = data['stock'];
        });

        //Get Jumlah Peminjaman
        //  Get total objects the user borrow
        await axiosInstance.get(`/api/detail/${this.nomor_peminjaman}`).then((result) => {
            const data = result.data;

            //Get Jumlah
            //  Get total number user borrow from database
            jumlah = data['jumlah'];
        });

        //Update Jumlah Barang
        //  Patch the database so the Jumlah in Barang Table return same as before
        await axiosInstance.patch(`/api/barang/${this.kodePath}`, {
            'stock' : jumlah+stock,
        });

        //Update Peminjaman Detail
        //  Patch the DetailPeminjaman table to make sure that the object has been returned
        await axiosInstance.patch(`/api/detail/${this.nomor_peminjaman}`, {
            'kembali' : !this.kembaliBool,
        }).then((result) => {
            //Print the result after patching
            console.log(result.data);
        });

        //Set kembaliBool variable bool
        //  To notified that the object has been returned
        this.kembaliBool = true;

        //Reset return button with a new state
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