import React, { useState, useEffect } from 'react';
import { axiosInstance } from '../../AxiosInstance'
import { useParams } from 'react-router-dom'
import { Button } from '@material-ui/core';

// class GetDetails extends Component {
export default function GetDetails (props) {

    const [pinjam, setPinjam] = useState([]);
    const [gedung, setGedung] = useState([]);
    const [ruang, setRuang] = useState([]);
    const [barang, setBarang] = useState([]);
    const [returnBtn, setReturn] = useState([]);

    let gedungPath, ruangPath, kodePath, jumlah, kembali, kembaliBool, nama_pegawai;
    const { nomor_peminjaman } = useParams();

    /*
        DetailsList function will create a GET Rest API
        All informations retrieved will be printed in browser console
    */

    async function DetailsList (urls='') {
        //Create a get request to Details API
        await axiosInstance.get(`/api/detail/${urls}`).then((result) => {
            //Retrieved response body of the request
            const data = result.data;
            
            //Set retrieved data to corresponding variables
            //   Will be used for the next request
            gedungPath = data.gedung;
            ruangPath = data.ruang;
            kodePath = data.kode_barang;
            jumlah = data.jumlah;
            kembaliBool = Boolean(data.kembali);

            //Check if the object has been returned or not
            kembali = (data.kembali === false ? "Belum Dikembalikan" : "Dikembalikan");
        });

        //Create a get request to peminjaman API
        await axiosInstance.get(`/api/peminjaman/${nomor_peminjaman}`).then((result) => {
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
            toPinjam.push(<div className="DetailInfo">{jumlah}</div>);
            //Add aditional informations of the status of the objects
            toPinjam.push(<div className="DetailInfo">{kembali}</div>);

            //Create a header array for tables
            const toSpan = ["ID Peminjaman", "Nomor Peminjaman", "NIP/NRK", "Nama Pegawai", "Tanggal Peminjaman", "Tanggal Pengembalian", "Jumlah", "Dikembalikan"].map((hdr) => {
                return (
                    <div className="DetailHeader"><span>{hdr}</span></div>
                );
            }, this);

            //Get the name of the person who borrow the objects
            nama_pegawai = data.nama_pegawai;

            //Set pinjam values to toSpan and toPinjam
            //  toSpan => Header of the tables
            //  toPinjam => Values of the tables
            setPinjam( [toSpan, toPinjam] );
        });
        
        await axiosInstance.get(`/api/gedung/${gedungPath}`).then((result) => {
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
            setGedung( [toSpan, toGedung] );
        });
        
        await axiosInstance.get(`/api/ruang/${ruangPath}`).then((result) => {
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
            setRuang( [toSpan, toRuang] );
        });
        
        await axiosInstance.get(`/api/barang/${kodePath}`).then((result) => {
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
            setBarang( [toSpan, toBarang] );
        });
        
        //Set return button to corresponding status
        //  Disable button interactions if the object has been returned
        setReturn( [<Button variant="contained" color="primary" onClick={() => ReturnItem()}
        disabled={ (Boolean(kembaliBool) === false ? (localStorage.getItem('nip_nrk') == nama_pegawai ? false : true) : true) }>Kembalikan!</Button> ] );
    }

    /*
        On page load, Call DetailsList  functions with current parameter
    */
    
    useEffect(() => {
        DetailsList(nomor_peminjaman)
    }, [])

    /*
        ReturnItem function to return the borrowed thing to server  
    */

    async function ReturnItem () {
        //Declare dummy variable to store any information from database
        let stock = 0;
        let jumlah = 0;

        //Get Jumlah Barang
        //  Get stock in database and store it to stock variable
        await axiosInstance.get(`/api/barang/${kodePath}`).then((result) => {
            const data = result.data;

            //Set stock to stock from data objects
            stock = data['stock'];
        });

        //Get Jumlah Peminjaman
        //  Get total objects the user borrow
        await axiosInstance.get(`/api/detail/${nomor_peminjaman}`).then((result) => {
            const data = result.data;

            //Get Jumlah
            //  Get total number user borrow from database
            jumlah = data['jumlah'];
        });

        //Update Jumlah Barang
        //  Patch the database so the Jumlah in Barang Table return same as before
        await axiosInstance.patch(`/api/barang/${kodePath}`, {
            'stock' : jumlah+stock,
        });

        //Update Peminjaman Tanggal
        //  Patch the database so the tgl_kembali in Peminjaman Table set as current adte
        await axiosInstance.patch(`/api/peminjaman/${nomor_peminjaman}`, {
            'tgl_kembali' : new Date().toISOString().slice(0, 10),
        });

        //Update Peminjaman Detail
        //  Patch the DetailPeminjaman table to make sure that the object has been returned
        await axiosInstance.patch(`/api/detail/${nomor_peminjaman}`, {
            'kembali' : !kembaliBool,
        }).then((result) => {
            //Print the result after patching
            console.log(result.data);
        });

        //Set kembaliBool variable bool
        //  To notified that the object has been returned
        kembaliBool = true;

        //Reset return button with a new state
        setReturn( [<Button variant="contained" color="primary" onClick={() => ReturnItem()} disabled={(kembaliBool == false ? false : true)}>Kembalikan!</Button>] );
    }

    /*
        render function is used to render all necessary component for the page
    */

    return (
    <>
        {returnBtn}
        <div className="GetDetails">
            <div className="BigGroups">
                <div className="DetailsGroup">
                    {pinjam.map((pin) => {
                        return(
                            <div className="DetailTables">{pin}</div>
                        );
                    }, this)}
                </div>
                <div className="DetailsGroup">
                    {barang.map((brg) => {
                        return(
                            <div className="DetailTables">{brg}</div>
                        )
                    })}
                </div>
            </div>
            <div className="BigGroups">
                <div className="DetailsGroup">
                    {ruang.map((rng) => {
                        return(
                            <div className="DetailTables">{rng}</div>
                        )
                    })}
                </div>
                <div className="DetailsGroup">
                    {gedung.map((ged) => {
                        return(
                            <div className="DetailTables">{ged}</div>
                        );
                    }, this)}
                </div>
            </div>
        </div>
    </>);
}