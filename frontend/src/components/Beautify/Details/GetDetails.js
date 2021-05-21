import React, { useState, useEffect } from 'react';
import { axiosInstance } from '../../AxiosInstance'
import { useParams } from 'react-router-dom'
import {
    Button, 
    Table, 
    TableHead, 
    TableRow, 
    TableCell, 
    TableBody, 
    TableContainer, 
    TablePagination, 
    Paper } from '@material-ui/core';

// class GetDetails extends Component {
export default function GetDetails (props) {

    const [pinjam, setPinjam] = useState([]);
    const [gedung, setGedung] = useState([]);
    const [ruang, setRuang] = useState([]);
    const [barang, setBarang] = useState([]);
    const [returnBtn, setReturn] = useState([]);

    let gedungPath, ruangPath, kodePath, jumlah, status, kembaliBool, nama_pegawai, kondisi;
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
            kembaliBool = Boolean(data.status);
            kondisi = data.kondisi;

            //Check if the object has been returned or not
            status = (data.status === false ? "Belum Dikembalikan" : "Dikembalikan");
        });

        //Create a get request to peminjaman API
        await axiosInstance.get(`/api/peminjaman/${nomor_peminjaman}`).then((result) => {
            //Retrieved response body of the request
            const data = result.data;
            
            //Map the response to toPinjam
            //  The result of map is an array of html element, with value from response body
            const info = Object.keys(data).map(function (key, index) {
                return (
                    key == "tgl_kembali" ? (data[key] != null ? data[key] : "Undefined" ) : data[key]
                );
            });
            
            //Add aditional informations of the total borrowed objects
            info.push(jumlah);
            //Add aditional informations of the current status of the objects
            info.push(status);
            //Add additional informations of the conditions of the objects
            info.push(kondisi);

            //Create a header array for tables
            const head = ["ID Peminjaman", "Nomor Peminjaman", "NIP/NRK", "Nama Pegawai", "Tanggal Peminjaman", "Tanggal Pengembalian", "BAST Disposisi", "Jumlah", "Dikembalikan", "Kondisi"];

            //Get the name of the person who borrow the objects
            nama_pegawai = data.nama_pegawai;

            const toPinjam = head.map(function (x, i) {
                return (
                    <TableRow>
                        <TableCell align='left'>
                            {x}
                        </TableCell>
                        <TableCell align='right'>
                            { x == "BAST Disposisi" ? <a href={info[i]}>File BAST</a> : info[i]}
                        </TableCell>
                    </TableRow>
                )
            })

            //Set pinjam values to toPinjam
            setPinjam( toPinjam );
        });
        
        await axiosInstance.get(`/api/gedung/${gedungPath}`).then((result) => {
            //Retrieved response body of the request
            const data = result.data;

            //Map the response to toGedung
            //  The result of map is an array of html element, with value from response body
            const info = Object.keys(data).map(function (key, index) {
                return (
                    data[key]
                );
            });

            //Create a header array for tables
            const head = ["ID Gedung", "Gedung", "MG Gedung"]

            const toGedung = head.map(function (x, i) {
                return (
                    <TableRow>
                        <TableCell align='left'>
                            {x}
                        </TableCell>
                        <TableCell align='right'>
                            {info[i]}
                        </TableCell>
                    </TableRow>
                )
            })

            //Set pinjam values to toGedung
            setGedung( toGedung );
        });
        
        await axiosInstance.get(`/api/ruang/${ruangPath}`).then((result) => {
            //Retrieved response body of the request
            const data = result.data;

            //Map the response to toRuang
            //  The result of map is an array of html element, with value from response body
            const info = Object.keys(data).map(function (key, index) {
                return (
                    data[key]
                );
            });

            //Create a header array for tables
            const head = ["ID Ruang", "Ruang", "PJ Ruang", "Gedung"];

            const toRuang = head.map(function (x, i) {
                return (
                    <TableRow>
                        <TableCell align='left'>
                            {x}
                        </TableCell>
                        <TableCell align='right'>
                            {info[i]}
                        </TableCell>
                    </TableRow>
                )
            })

            //Set ruang values to toRuang
            setRuang( toRuang );
        });
        
        await axiosInstance.get(`/api/barang/${kodePath}`).then((result) => {
            //Retrieved response body of the request
            const data = result.data;

            //Map the response to toBarang
            //  The result of map is an array of html element, with value from response body
            const info = Object.keys(data).map(function (key, index) {
                if(key != "BAST_perolehan"){
                    return (
                        data[key]
                    );
                }
            });

            //Create a header array for tables
            const head = ["ID Barang", "Kode Barang", "Nama Barang", "Merk Barang", "Stok"]

            const toBarang = head.map(function (x, i) {
                return (
                    <TableRow>
                        <TableCell align='left'>
                            {x}
                        </TableCell>
                        <TableCell align='right'>
                            {info[i]}
                        </TableCell>
                    </TableRow>
                )
            })

            //Set barang values to toBarang
            setBarang( toBarang );
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

    const PeminjamanContainer = () => {
        return(
            <TableContainer component={Paper}>
                <Table>
                    { pinjam }
                </Table>
            </TableContainer>
        )
    }

    const BarangContainer = () => {
        return(
            <TableContainer component={Paper}>
                <Table>
                    { barang }
                </Table>
            </TableContainer>
        )
    }

    const RuangContainer = () => {
        return(
            <TableContainer component={Paper} id='ruang'>
                <Table>
                    { ruang }
                </Table>
            </TableContainer>
        )
    }

    const GedungContainer = () => {
        return(
            <TableContainer component={Paper} id='gedung'>
                <Table>
                    { gedung }
                </Table>
            </TableContainer>
        )
    }

    /*
        render function is used to render all necessary component for the page
    */

    return (
    <>
        {returnBtn}
        <div className="GetDetails">
            <div className="BigGroups">
                { PeminjamanContainer() }
            </div>
            <div className="BigGroups">
                { BarangContainer() }
            </div>
            <div className="BigGroups">
                { RuangContainer() }
                { GedungContainer() }
            </div>
        </div>
    </>);
}