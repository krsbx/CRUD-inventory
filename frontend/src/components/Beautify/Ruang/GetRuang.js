import React, { useEffect, useState } from 'react';
import { axiosInstance, PrevNext, previousCheck } from '../../AxiosInstance'
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

export default function GetRuang (props) {
    const [ruang, setRuang] = useState([]);
    const [searchParams, setSearchParams] = useState('');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    /*
        RuangList function will create a GET Rest API
        All informations retrieved will be printed in browser console
    */

    const RuangList = (urls='') => {
        axiosInstance.get(`/api/ruang/${urls}`).then((result) => { // melakukan get-request pada peminjaman API.
            const data = result.data; // peroleh hasil dari get-request.

            setRuang(data)  // mengubah variable ruang pada state menjadi data.
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
        RuangList();
    }, [])

    const searchResult = () => {
        return ruang.filter((params) => {
            if(searchParams === ''){
                return params;
            }else if(params.ruang.toLowerCase().includes(searchParams)){
                return params;
            }
        }).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((rng) => { // menyimpan semua objek yang ada pada data kedalam bentuk html.
            return (
                <TableRow>
                    <TableCell>
                        {rng.ruangID}
                    </TableCell>
                    <TableCell align='right'>
                        {rng.ruang}
                    </TableCell>
                    <TableCell align='right'>
                        {rng.pj_ruang}
                    </TableCell>
                    <TableCell align='right'>
                        {rng.gedung}
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
        value={searchParams} label='Cari Ruang' variant="outlined" />
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID Ruang</TableCell>
                        <TableCell align='right'>Ruang</TableCell>
                        <TableCell align='right'>PJ Ruang</TableCell>
                        <TableCell align='right'>Gedung</TableCell>
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
            count={ruang.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
        />
    </>
    );
}