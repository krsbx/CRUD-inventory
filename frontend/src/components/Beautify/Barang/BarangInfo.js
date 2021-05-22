import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { axiosInstance } from '../../AxiosInstance';
import BarangSpend from './/BarangSpend';
import { 
  Table, 
  TableRow, 
  TableCell, 
  TableContainer, 
  Paper } from '@material-ui/core';

export default function BarangInfo() {
  const [barang, setBarang] = useState([]);
  const { kode_barang } = useParams();

  const GetBarangDetails = async () => {
    await axiosInstance.get(`/api/barang/${kode_barang}`).then((result) => {
        //Retrieved response body of the request
        const data = result.data;

        //Map the response to toBarang
        //  The result of map is an array of html element, with value from response body
        const info = Object.keys(data).map(function (key, index) {
            return (
                data[key]
            );
        });

        //Create a header array for tables
        const head = ["ID Barang", "Kode Barang", "Nama Barang", "Merk Barang", "Stok", "BAST Perolehan"]

        const toBarang = head.map(function (x, i) {
            return (
                <TableRow>
                    <TableCell align='left'>
                        {x}
                    </TableCell>
                    <TableCell align='right'>
                    { x == "BAST Perolehan" ? <a href={info[i]} id='File_BAST'>File BAST</a> : info[i]}
                    </TableCell>
                </TableRow>
            )
        })

        //Set barang values to toBarang
        setBarang( toBarang );
    });
  }

  useEffect(() => {
    GetBarangDetails();
  }, [])

  const BarangContainer = () => {
    return(
      <TableContainer component={Paper}
      style={{ width: '450px' }}>
          <Table>
              { barang }
          </Table>
      </TableContainer>
    )
  }

  return (
    <div id="BarangInfo">
      <div>
        { BarangContainer() }
      </div>
      <br />
      <div>
        <BarangSpend />
      </div>
    </div>
  )
}
