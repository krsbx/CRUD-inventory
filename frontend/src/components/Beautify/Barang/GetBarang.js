import React, { useEffect, useState } from 'react';
import { axiosInstance, PrevNext, previousCheck } from '../../AxiosInstance';
import CallToActionOutlinedIcon from '@material-ui/icons/CallToActionOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { Link } from 'react-router-dom';
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

export default function GetBarang (props) {
    const [barang, setBarang] = useState([]);
    const [searchParams, setSearchParams] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    /*
        BarangList function will create a GET Rest API
        All informations retrieved will be shown in a table
    */

    const BarangList = (urls='') => {
        axiosInstance.get(`/api/barang/${urls}`).then((result) => { // melakukan get-request pada barang API.
            const data = result.data; // peroleh hasil dari get-request.

            setBarang(data) // mengubah variable barang pada state menjadi data.
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

    useEffect(() => {
        BarangList();
    }, [])

    const searchResult = () => {
        return barang.filter(params => {
            if(searchParams === ''){
                return params;
            }else if(params.nama_barang.toLowerCase().includes(searchParams.toLowerCase())){
                return params;
            }
        }).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((brg) => { // menyimpan semua objek yang ada pada data kedalam bentuk html.
            return (
            <TableRow>
                <TableCell>
                    {brg.nama_barang}
                </TableCell>
                <TableCell align='right'>
                    {brg.merk}
                </TableCell>
                <TableCell align='right'>
                    {brg.stock}
                </TableCell>
                <TableCell align='right'>
                    <Link to={`/barang/${brg.kode_barang}`} id='moreInfo'>
                        <CallToActionOutlinedIcon style={{ fontSize: '10px' }} /> Details
                    </Link>
                    <Link to={`/barang/edit/${brg.kode_barang}`} id='moreInfo'>
                         <EditOutlinedIcon style={{ fontSize: '10px' }} /> Edit 
                    </Link>
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
            value={searchParams} label='Cari Barang' variant="outlined" />
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Nama Barang</TableCell>
                            <TableCell align='right'>Merk Barang</TableCell>
                            <TableCell align='right'>Stock Barang</TableCell>
                            <TableCell align='right'>Aksi</TableCell>
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
                count={barang.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </>
    );
}