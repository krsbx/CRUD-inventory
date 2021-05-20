import React, { useState, useEffect } from 'react'
import { axiosInstance, PrevNext, previousCheck } from '../../AxiosInstance'
import { Link } from 'react-router-dom'
import { 
    TextField, 
    Table, 
    TableHead, 
    TableRow, 
    TableCell, 
    TableBody, 
    TableContainer,
    TablePagination, 
    Paper } from '@material-ui/core';

export default function GetPeminjaman (props) {
    const [peminjaman, setPeminjaman] = useState([]);
    const [searchParams, setSearchParams] = useState('');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    /*
        PeminjamanList function will create a GET Rest API
        All informations retrieved will printed in browser console
    */

    const PeminjamanList = (urls='') => {
        axiosInstance.get(`/api/peminjaman/${urls}`).then((result) => { // melakukan get-request pada peminjaman API.
            const data = result.data; // peroleh hasil dari get-request.

            setPeminjaman(data); // mengubah variable peminjaman pada state menjadi data.
        });
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const rowsPage = () => {
        const arr = [5, 10];
        return arr;
    }

    useEffect (() => {
        PeminjamanList();
    }, [])

    const searchResult = () => {
        return peminjaman.filter((params) => {
            if(searchParams === ''){
                return params;
            }else if(params.nomor_peminjaman.toLowerCase().includes(searchParams)){
                return params;
            }
        }).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((pem) => { // menyimpan semua objek yang ada pada data kedalam bentuk html.
            return (
                <TableRow>
                    <TableCell>
                        <Link to={`/detail/${pem.nomor_peminjaman}`} >
                            {pem.nomor_peminjaman}
                        </Link>
                    </TableCell>
                    <TableCell align='right'>
                        {pem.nip_nrk}
                    </TableCell>
                    <TableCell align='right'>
                        {pem.nama_pegawai}
                    </TableCell>
                    <TableCell align='right'>
                        {pem.tgl_pinjam}
                    </TableCell>
                    <TableCell align='right'>
                        {pem.tgl_kembali ? pem.tgl_kembali : "Undefined"}
                    </TableCell>
                </TableRow>
            );
        }, this);
    }

    /*
        render function is used to render all necessary component for the page
    */

    return (
        <>
            <TextField type='text' size="30" onChange={(e) => setSearchParams(e.target.value)}
            value={searchParams} label='Cari Peminjaman' variant="outlined" />
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Nomor Peminjaman</TableCell>
                            <TableCell align='right'>NIP/NRK</TableCell>
                            <TableCell align='right'>Nama Pegawai</TableCell>
                            <TableCell align='right'>Tanggal Pinjam</TableCell>
                            <TableCell align='right'>Tanggal Kembali</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        { searchResult() }
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={rowsPage()}
                component="div"
                count={peminjaman.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </>
    );
}