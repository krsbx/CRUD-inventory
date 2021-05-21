import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../../AxiosInstance';
import { useParams } from 'react-router-dom';
import { Button, TextField } from '@material-ui/core';

export default function EditRuang() {
  const [error, setError] = useState({});
  const [pj_ruang, setPJ_Ruang] = useState('');
  const [gedung, setGedung] = useState('');
  const { ruang } = useParams();

  const GetGedungDetails = async () => {
    await axiosInstance.get(`/api/ruang/${ruang}`).then((result) => {
        //Retrieved response body of the request
        const data = result.data;

        setGedung(data.gedung);
        setPJ_Ruang(data.pj_ruang);
    });
  }

  const handleValidation = () => {
    let formIsValid = true;
    let err = {};

    //pj_ruang
    if(!pj_ruang){
        formIsValid = false;
        err["merk"] = "Cannot be empty";
    }

    setError(err);
    return formIsValid;
  }

  const UpdateGedung = async (event) => {
    event.preventDefault();

    if(handleValidation()) {
      let data = {
        'pj_ruang': pj_ruang,
      }

      await axiosInstance.patch(`/api/ruang/${ruang}`, data);

      window.location.href='/ruang';
    }
  }

  useEffect(() => {
    GetGedungDetails();
  }, [])

  return (
    <div>
        <form onSubmit={UpdateGedung}>
            {/* Nama Ruang Field */}
            <p>
                <br /> <TextField type='text' size="30" value={ruang} 
                label='Ruang' variant="outlined" inputProps={{ readOnly: true, }}/>
            </p>
            {/* Gedung Field */}
            <p>
                <br /> <TextField type='text' size="30" value={gedung} 
                label='Gedung' variant="outlined" inputProps={{ readOnly: true, }} />
            </p>
            {/* PJ Ruang Field */}
            <p>
                <br /> <TextField type='text' size="30" onChange={(e) => setPJ_Ruang(e.target.value)}
                value={pj_ruang} label='PJ Ruang' variant="outlined" inputProps={{ maxLength: 120 }} />
                <br /> <span style={{color: "red"}}>{error["pj_ruang"]}</span>
            </p>
            <br /><Button variant="contained" color="primary" type="submit">Perbarui Ruang!</Button>
        </form>
    </div>
  );
}
