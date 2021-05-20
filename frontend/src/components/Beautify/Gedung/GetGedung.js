import React, { useState, useEffect } from 'react';
import { axiosInstance, baseURL, PrevNext, previousCheck } from '../../AxiosInstance'
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

export default function GetOptions (props) {
    const [gedung, setGedung] = useState([]);
    const [searchParams, setSearchParams] = useState('');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    /*
        GedungList function will create a GET Rest API
        All informations retrieved will be printed in browser console
    */

    const GedungList = (urls='') => { 
        axiosInstance.get(`/api/gedung/${urls}`).then((result) => { // melakukan get-request pada gedung API.
            const data = result.data; // peroleh hasil dari get-request.

            setGedung(data); // mengubah variable gedung pada state menjadi data.
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
        GedungList();
    }, [])

    const searchResult = () => {
        return gedung.filter(params => {
            if(searchParams === ''){
                return params;
            }else if(params.gedung.toLowerCase().includes(searchParams)){
                return params;
            }
        }).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((ged) => { // menyimpan semua objek yang ada pada data kedalam bentuk html.
            return (
            <TableRow>
                <TableCell>
                    {ged.gedungID}
                </TableCell>
                <TableCell align='right'>
                    {ged.gedung}
                </TableCell>
                <TableCell align='right'>
                    {ged.mg_gedung}
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
        value={searchParams} label='Cari Gedung' variant="outlined" />
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID Gedung</TableCell>
                        <TableCell align='right'>Gedung</TableCell>
                        <TableCell align='right'>MG Gedung</TableCell>
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
            count={gedung.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
        />
    </>
    );
}