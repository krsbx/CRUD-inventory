import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../../AxiosInstance';
import { useParams } from 'react-router-dom';
import { Button, TextField, InputLabel, FormControl, Input } from '@material-ui/core';
import firebase from '../../Firebase/FirebaseSDK';

export default function EditBarang() {
  const [barang, setBarang] = useState({});
  const [merk, setMerk] = useState('');
  const [stock, setStock] = useState('');
  const [bast, setBAST] = useState('');
  const [error, setError] = useState({});
  const { kode_barang } = useParams();

  const GetBarangDetails = async () => {
    await axiosInstance.get(`/api/barang/${kode_barang}`).then((result) => {
        //Retrieved response body of the request
        const data = result.data;

        //Set barang values to toBarang
        setBarang( data );

        setMerk(data.merk);
        setStock(data.stock);
        setBAST(data.BAST_perolehan);
    });
  }

  const handleValidation = () => {
    let formIsValid = true;
    let err = {};

    //merk
    if(!merk){
        formIsValid = false;
        err["merk"] = "Cannot be empty";
    }

    //stock
    if(!stock){
        formIsValid = false;
        err["stock"] = "Cannot be empty";
    }

    if(typeof stock !== "undefined"){
      if(!stock.match(/^[0-9]+$/)){
         formIsValid = false;
         err["stock"] = "Integer Only";
     }
    }

    setError(err);
    return formIsValid;
  }

  const UpdateBarang = async (event) => {
    event.preventDefault();

    if(handleValidation()) {
      let data = {
        'merk': merk,
        'stock': stock,
      }

      if(bast){
        const PerolehanRef = firebase.storage().ref(`Documents/Perolehan/`).child(`${bast["name"]}`);
        await PerolehanRef.put(bast);
  
        await PerolehanRef.getDownloadURL().then(url => data['BAST_perolehan'] = url);
      }

      await axiosInstance.patch(`/api/barang/${kode_barang}`, data);
      
      window.location.href='/barang';
    }
  }

  useEffect(() => {
    GetBarangDetails();
  }, [])

  return (
    <div>
        <form onSubmit={UpdateBarang}>
            {/* Kode Barang Field */}
            <p>
                <br /> <TextField type='text' size="30" value={barang["kode_barang"]} 
                variant="outlined" inputProps={{ readOnly: true, }} />
            </p>
            {/* Nama Barang Field */}
            <p>
                <br /> <TextField type='text' size="30" value={barang["nama_barang"]} 
                variant="outlined" inputProps={{ readOnly: true, }}/>
            </p>
            {/* Merk Barang Field */}
            <p>
                <br /> <TextField type='text' size="30" onChange={(e) => setMerk(e.target.value)}
                value={merk} label='Merk' variant="outlined" inputProps={{ maxLength: 120 }} />
                <br /> <span style={{color: "red"}}>{error["merk"]}</span>
            </p>
            {/* Stock Barang Field */}
            <p>
                <br /> <TextField type='number' size="30" onChange={(e) => setStock(e.target.value)}
                value={stock} label='Stock' variant="outlined" />
                <br /> <span style={{color: "red"}}>{error["stock"]}</span>
            </p>
            {/* BAST Perolehan Field */}
            <p>
                <br /><FormControl className="UploadInput">
                    <InputLabel>BAST Perolehan</InputLabel>
                    <br /><Button variant="outlined" component="BAST_perolehan" label="BAST Perolehan">
                      <Input type='file' hidden onChange={e => setBAST(e.target.files[0])}/></Button>
                </FormControl>
                <br /> <span style={{color: "red"}}>{error["BAST_perolehan"]}</span>
            </p>
            <br /><Button variant="contained" color="primary" type="submit">Perbarui Barang!</Button>
        </form>
    </div>
  );
}
