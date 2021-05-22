import React, { useEffect, useState, useRef } from 'react';
import { axiosInstance } from '../../AxiosInstance';
import { useParams } from 'react-router-dom';
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
import ReactToPrint from 'react-to-print';

export default function BarangSpend() {
  //Store Barang Informations from Database
  const [barang, setBarang] = useState({});

  //Store Details Peminjaman Informations
  const [details, setDetails] = useState([]);

  //Store Peminjaman Informations
  const [peminjaman, setPeminjaman] = useState([]);

  const { kode_barang } = useParams('');

  const componentRef = useRef();

  const GetInfos = async () => {
    await axiosInstance.get(`/api/barang/${kode_barang}`).then((result) => {
      //Retrieved response body of the request
      const data = result.data;

      setBarang(data);

      return data;
    });

    const filtered = await axiosInstance.get(`/api/detail/`).then((result) => {
      const data = result.data;

      const filtering = Object.keys(data).map(function (k, id) {
        if(data[k]['kode_barang'] == kode_barang && !data[k]['status']){
          return data[k];
        }

        return null;
      }).filter((det) => {
        return det != undefined;
      });

      return filtering;
    });

    const pinjamSet = await axiosInstance.get(`/api/peminjaman/`).then((result) => {
      const data = result.data;

      return data;
    });

    const pinjam = await GetPeminjaman(filtered, pinjamSet);

    setPeminjaman(pinjam);

    await SetInformations(filtered, pinjam);
  };

  const GetPeminjaman = (filtered, pinjam) => {
    return new Promise((resolve, reject) => {
      if (filtered) {
        const params = filtered.map((fil) => {
          return fil['nomor_peminjaman'];
        });

        const newFilter = Object.keys(pinjam).map(function (key, id) {
          if(params.includes(pinjam[key]['nomor_peminjaman'])){
            return pinjam[key];
          }
          
          return null;
        }).filter((pjm) => {
          return pjm != undefined;
        });

        resolve(newFilter);
      }else{
        reject("No filtered objects");
      }
    });
  }

  const SetInformations = (filtered, pinjam) => {
    let detailContainer = [];
    let peminjamanContainer = [];

    return new Promise((resolve, reject) => {
      if(filtered){
        filtered.map(det => {
          const filPim = pinjam.filter(pjm => {
            if(pjm['nomor_peminjaman'] == det['nomor_peminjaman']){
              return pjm;
            }
          });

          let detCon = {
            'NIP/NRK' : filPim[0]['nip_nrk'],
            'Nama' : filPim[0]['nama_pegawai'],
            'Jumlah': det['jumlah'],
            'Gedung' : det['gedung'],
            'Ruang' : det['ruang'],
          }

          let pemCon = {
            'Gedung' : det['gedung'],
            'Ruang' : det['ruang'],
          }

          let samePerson = false;

          for(var i = 0; i < detailContainer.length; i++){
            const contain = detailContainer[i];

            if((contain['NIP/NRK'] == detCon['NIP/NRK']) && 
              (contain['Gedung'] == detCon['Gedung'] && 
              contain['Ruang'] == detCon['Ruang'])){
              samePerson = true;

              let obj = contain;
              obj['Jumlah'] = obj['Jumlah'] + detCon['Jumlah'];
              detailContainer[i] = obj;

              break;
            }
          }

          if(!samePerson){
            detailContainer.push(detCon);
          }


          let notHave = true;

          for(var i = 0; i < peminjamanContainer.length; i++){
            const gedung = peminjamanContainer[i]['Gedung'];
            const ruang = peminjamanContainer[i]['Ruang'];

            if(pemCon['Gedung'] == gedung && pemCon['Ruang'] == ruang){
              notHave = false;

              break;
            }
          }
          
          if(notHave){
            peminjamanContainer.push(pemCon);
          }
        });

        const mapper = 
        peminjamanContainer.map(pjm => {
          const mapped = detailContainer.map(det => {
            if(pjm['Gedung'] == det['Gedung'] && pjm['Ruang'] == det['Ruang']){
              return Object.keys(det).map(function (x, i) {
                  if(x != 'Gedung' && x != 'Ruang'){
                    return (
                      <>
                        <TableRow>
                          <TableCell>
                            {x}
                          </TableCell>
                          <TableCell>
                            {det[x]}
                          </TableCell>
                        </TableRow>
                        {i == 2 ? <br /> : null}
                      </>
                    );
                  }
                });
              }
            })
          return (
            <TableRow>
              <TableCell align='left'>
                {pjm['Gedung']}
              </TableCell>
              <TableCell align='center'>
                {pjm['Ruang']}
              </TableCell>
              <TableCell align='right'>
                {mapped}
              </TableCell>
            </TableRow>
          )
        });

        setDetails(mapper);

        resolve(mapper);
      }else{
        reject('No Informations!');
      }
    }
  );
}

  useEffect(() => {
    GetInfos();
  }, []);

  return (
    <>
    <ReactToPrint
      trigger={() => <Button variant="outlined" color="primary">Print this out!!</Button>}
      content={() => componentRef.current}
    />
    <br />
    <TableContainer component={Paper} ref={componentRef}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align='center'>
              Tanggal Akses : {new Date().toISOString().slice(0, 10)}
              <br />Gedung
            </TableCell>
            <TableCell align='center'>
              <br />Ruang
            </TableCell>
            <TableCell align='center'>
              Waktu Akses : {new Date().toLocaleTimeString()}
              <br />Pegawai
            </TableCell>
          </TableRow>
        </TableHead>
        {details}
      </Table>
    </TableContainer>
  </>
  )
}
